import fetchcertificate from "../middleware/fetchcertificate";
import fetchissuer from "../middleware/fetchissuer";
import Certifications from "../models/Certifications";
import IssuerModel from "../models/issuer";
import express from "express";
import { Request, Response, NextFunction } from "express";
import Course from "../models/CourseStudents";
import { body, validationResult } from "express-validator";
import fetchuser from "../middleware/fetchuser";
import UserModel from "../models/user";

const router = express.Router();

router.get("/noofcourses", fetchissuer, async (req: Request, res: Response) => {
  try {
    const issuerId = req.issuer?.id;
    const issuer = await IssuerModel.findById(issuerId).select("-password");
    const issueremail = issuer?.email;
    let course = await Certifications.find({ issueremail: issueremail });
    if (!course) {
      return res.status(404).send("Not Found");
    }

    let students = await Certifications.find({ issueremail: issueremail });
    if (!students) {
      return res.status(404).send("Not Found");
    }

    res.send({ courses: course.length, students: students.length });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchcertificate", fetchcertificate, async (req, res) => {
  try {
    const id = req.header("certificateid");
    const courseId = id;
    const cdetails = await Course.find({ _id: courseId });

    res.json(cdetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchthecertificate", fetchcertificate, async (req, res) => {
  try {
    const Id = req.header("certificateId");
    const courseId = Id;
    const cdetails = await Course.findById(courseId);

    res.json(cdetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchallusercertificates", fetchuser, async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await UserModel.findById(userId).select("-password");
    const course = await Course.find({ StudentEmail: user?.email });

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchallissuercertificates", fetchissuer, async (req, res) => {
  try {
    const issuerId = req.issuer?.id;
    const issuer = await IssuerModel.findById(issuerId).select("-password");
    const certificate = await Certifications.find({
      issueremail: issuer?.email,
    });
    res.json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/addcertificate",
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
      const issuer = await IssuerModel.findById(issuerId).select("-password");
      const issueremail = issuer?.email;

      const { coursename, issuername, certificatetype } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const certificate = new Certifications({
        coursename,
        issuername,
        issueremail,
        certificatetype,
      });

      const savedcertificate = await certificate.save();
      res.json(savedcertificate);
      // res.json(savedcourse)
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
