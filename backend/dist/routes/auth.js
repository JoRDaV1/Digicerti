"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const fetchuser_1 = __importDefault(require("../middleware/fetchuser"));
const fetchissuer_1 = __importDefault(require("../middleware/fetchissuer"));
const user_1 = __importDefault(require("../models/user"));
const issuer_1 = __importDefault(require("../models/issuer"));
const Certifications_1 = __importDefault(require("../models/Certifications"));
const CourseStudents_1 = __importDefault(require("../models/CourseStudents"));
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_TOKEN;
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post("/createuser", [
    (0, express_validator_1.body)("fname", "Enter a valid First name").isLength({ min: 3 }),
    (0, express_validator_1.body)("lname", "Enter a valid Last name").isLength({ min: 3 }),
    (0, express_validator_1.body)("email", "Enter a valid email").isEmail(),
    (0, express_validator_1.body)("mobile", "Enter a valid Mobile").isLength({ min: 9 }),
    (0, express_validator_1.body)("password", "Password must be at least 5 characters").isLength({
        min: 5,
    }),
], async (req, res) => {
    let success;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await user_1.default.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                success,
                error: "Sorry a user with this email already exists",
            });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const secPass = await bcrypt_1.default.hash(req.body.password, salt);
        user = await user_1.default.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: secPass,
        });
        const data = { user: { id: user.id } };
        const authtoken = jsonwebtoken_1.default.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 2: Create an issuer using: POST "/api/auth/createissuer". No login required
router.post("/createissuer", [
    (0, express_validator_1.body)("name", "Enter a valid company name").isLength({ min: 3 }),
    (0, express_validator_1.body)("email", "Enter a valid email").isEmail(),
    (0, express_validator_1.body)("mobile", "Enter a valid Mobile").isLength({ min: 9 }),
    (0, express_validator_1.body)("password", "Password must be at least 5 characters").isLength({
        min: 5,
    }),
], async (req, res) => {
    let success;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let issuer = await issuer_1.default.findOne({ email: req.body.email });
        if (issuer) {
            return res
                .status(400)
                .json({ error: "Sorry an issuer with this email already exists" });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const secPass = await bcrypt_1.default.hash(req.body.password, salt);
        issuer = await issuer_1.default.create({
            name: req.body.name,
            mobile: req.body.mobile,
            password: secPass,
            email: req.body.email,
        });
        const data = { issuer: { id: issuer.id } };
        const authtoken = jsonwebtoken_1.default.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 3: Authenticate a User using: POST "/api/auth/login". No login required
router.post("/loginuser", [
    (0, express_validator_1.body)("email", "Enter a valid email").isEmail(),
    (0, express_validator_1.body)("password", "Password cannot be blank").exists(),
    (0, express_validator_1.body)("person", "Please select either you are a person or an issuer").exists(),
], async (req, res) => {
    let success = false;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, person } = req.body;
    if (person === "user") {
        try {
            let user = await user_1.default.findOne({ email });
            if (!user) {
                success = false;
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt_1.default.compare(password, user.password);
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({
                    success,
                    error: "Please try to login with correct credentials",
                });
            }
            const data = { user: { id: user.id } };
            const authtoken = jsonwebtoken_1.default.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
    else if (person === "issuer") {
        try {
            let issuer = await issuer_1.default.findOne({ email });
            if (!issuer) {
                success = false;
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt_1.default.compare(password, issuer.password);
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({
                    success,
                    error: "Please try to login with correct credentials",
                });
            }
            const data = { issuer: { id: issuer.id } };
            const authtoken = jsonwebtoken_1.default.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
});
// ROUTE 4: Get logged in User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser_1.default, async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await user_1.default.findById(userId).select("-password");
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/getissuer", fetchissuer_1.default, async (req, res) => {
    try {
        const issuerId = req.issuer?.id;
        const issuer = await issuer_1.default.findById(issuerId).select("-password");
        res.json(issuer);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/addcourse", fetchissuer_1.default, [
    (0, express_validator_1.body)("coursename", "Enter a valid title").isLength({ min: 3 }),
    (0, express_validator_1.body)("issuername", "Description must be atleast 5 characters").isLength({
        min: 3,
    }),
    (0, express_validator_1.body)("certificatetype", "Select a specific certificate").isLength({
        min: 0,
    }),
], async (req, res) => {
    try {
        const issuerId = req.issuer?.id;
        const issuer = await issuer_1.default.findById(issuerId).select("-password");
        const issueremail = issuer?.email;
        const { coursename, issuername, certificatetype } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const course = new CourseStudents_1.default({
            coursename,
            issueremail,
            certificatetype,
        });
        const savedcourse = await course.save();
        res.json(savedcourse);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 4: Get All the students using: GET "/api/courses/fetchallstudents". Login required
router.get("/fetchallstudents/:id", fetchissuer_1.default, async (req, res) => {
    try {
        // Find the note to be updated and update it
        let certificate = await Certifications_1.default.findById(req.params.id);
        if (!certificate) {
            return res.status(404).send("Not Found");
        }
        const cname = certificate.coursename;
        let course = await CourseStudents_1.default.find({ coursename: cname });
        res.json({ course });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/addstudents", fetchissuer_1.default, [
    (0, express_validator_1.body)("coursename", "Enter a valid title").isLength({ min: 3 }),
    (0, express_validator_1.body)("StudentName", "Enter a valid name").isLength({ min: 3 }),
    (0, express_validator_1.body)("StudentEmail", "Enter a valid email").isEmail(),
    (0, express_validator_1.body)("Grade", "Enter a valid Grade").isLength({ min: 1 }),
], async (req, res) => {
    try {
        const issuerId = req.issuer?.id;
        const issuer = await issuer_1.default.findById(issuerId).select("-password");
        const issueremail = issuer?.email;
        const issuername = issuer?.name;
        const { coursename, StudentName, StudentEmail, Grade } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const course = new CourseStudents_1.default({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/fetchcourse", fetchissuer_1.default, [(0, express_validator_1.body)("coursename", "Enter a valid id").isLength({ min: 1 })], async (req, res) => {
    try {
        const { coursename } = req.body;
        let course = await CourseStudents_1.default.find({ coursename: coursename });
        if (!course) {
            return res.status(404).send("Not Found");
        }
        res.json(course);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.default = router;
