import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "@/types/ReqResTypes";
import fetchuser from "../middleware/fetchuser";
import fetchissuer from "../middleware/fetchissuer";
import User from "../models/user";
import Issuer from "../models/issuer";
import Certificate from "../models/Certifications";
import Course from "../models/CourseStudents";
import Blockinfo from "../models/blockinfo";

const router = express.Router();

const JWT_SECRET = process.env.JWT_TOKEN as string;

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("fname", "Enter a valid First name").isLength({ min: 3 }),
    body("lname", "Enter a valid Last name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("mobile", "Enter a valid Mobile").isLength({ min: 9 }),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req: Request, res: Response) => {
    let success;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: secPass,
      });
      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Create an issuer using: POST "/api/auth/createissuer". No login required
router.post(
  "/createissuer",
  [
    body("name", "Enter a valid company name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("mobile", "Enter a valid Mobile").isLength({ min: 9 }),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req: Request, res: Response) => {
    let success;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let issuer = await Issuer.findOne({ email: req.body.email });
      if (issuer) {
        return res
          .status(400)
          .json({ error: "Sorry an issuer with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      issuer = await Issuer.create({
        name: req.body.name,
        mobile: req.body.mobile,
        password: secPass,
        email: req.body.email,
      });
      const data = { issuer: { id: issuer.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/loginuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
    body(
      "person",
      "Please select either you are a person or an issuer"
    ).exists(),
  ],
  async (req: Request, res: Response) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, person } = req.body;
    if (person === "user") {
      try {
        let user = await User.findOne({ email });
        if (!user) {
          success = false;
          return res
            .status(400)
            .json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          success = false;
          return res.status(400).json({
            success,
            error: "Please try to login with correct credentials",
          });
        }
        const data = { user: { id: user.id } };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    } else if (person === "issuer") {
      try {
        let issuer = await Issuer.findOne({ email });
        if (!issuer) {
          success = false;
          return res
            .status(400)
            .json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, issuer.password);
        if (!passwordCompare) {
          success = false;
          return res.status(400).json({
            success,
            error: "Please try to login with correct credentials",
          });
        }
        const data = { issuer: { id: issuer.id } };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

// ROUTE 4: Get logged in User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/getissuer", fetchissuer, async (req: Request, res: Response) => {
  try {
    const issuerId = req.issuer?.id;
    const issuer = await Issuer.findById(issuerId).select("-password");
    res.json(issuer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/addcourse",
  fetchissuer,
  [
    body("coursename", "Enter a valid title").isLength({ min: 3 }),
    body("issuername", "Description must be atleast 5 characters").isLength({
      min: 3,
    }),
    body("certificatetype", "Select a specific certificate").isLength({
      min: 0,
    }),
  ],
  async (req: Request, res: Response) => {
    try {
      const issuerId = req.issuer?.id;
      const issuer = await Issuer.findById(issuerId).select("-password");
      const issueremail = issuer?.email;

      const { coursename, issuername, certificatetype } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const course = new Course({
        coursename,
        issueremail,
        certificatetype,
      });

      const savedcourse = await course.save();

      res.json(savedcourse);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 4: Get All the students using: GET "/api/courses/fetchallstudents". Login required
router.get("/fetchallstudents/:id", fetchissuer, async (req, res) => {
  try {
    // Find the note to be updated and update it
    let certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).send("Not Found");
    }

    const cname = certificate.coursename;

    let course = await Course.find({ coursename: cname });

    res.json({ course });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/addstudents",
  fetchissuer,
  [
    body("coursename", "Enter a valid title").isLength({ min: 3 }),
    body("StudentName", "Enter a valid name").isLength({ min: 3 }),
    body("StudentEmail", "Enter a valid email").isEmail(),
    body("Grade", "Enter a valid Grade").isLength({ min: 1 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const issuerId = req.issuer?.id;
      const issuer = await Issuer.findById(issuerId).select("-password");
      const issueremail = issuer?.email;
      const issuername = issuer?.name;
      const { coursename, StudentName, StudentEmail, Grade } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const course = new Course({
        coursename,
        issueremail,
        StudentName,
        StudentEmail,
        Grade,
        issuername,
      });
      const savedcourse = await course.save();
      res.json(savedcourse);

      //  createCertificate(savedcourse);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post(
  "/fetchcourse",
  fetchissuer,
  [body("coursename", "Enter a valid id").isLength({ min: 1 })],
  async (req: Request, res: Response) => {
    try {
      const { coursename } = req.body;

      let course = await Course.find({ coursename: coursename });
      if (!course) {
        return res.status(404).send("Not Found");
      }

      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
