"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchcertificate_1 = __importDefault(require("../middleware/fetchcertificate"));
const fetchissuer_1 = __importDefault(require("../middleware/fetchissuer"));
const Certifications_1 = __importDefault(require("../models/Certifications"));
const issuer_1 = __importDefault(require("../models/issuer"));
const express_1 = __importDefault(require("express"));
const CourseStudents_1 = __importDefault(require("../models/CourseStudents"));
const express_validator_1 = require("express-validator");
const fetchuser_1 = __importDefault(require("../middleware/fetchuser"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.get("/noofcourses", fetchissuer_1.default, async (req, res) => {
    try {
        const issuerId = req.issuer?.id;
        const issuer = await issuer_1.default.findById(issuerId).select("-password");
        const issueremail = issuer?.email;
        let course = await Certifications_1.default.find({ issueremail: issueremail });
        if (!course) {
            return res.status(404).send("Not Found");
        }
        let students = await Certifications_1.default.find({ issueremail: issueremail });
        if (!students) {
            return res.status(404).send("Not Found");
        }
        res.send({ courses: course.length, students: students.length });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/fetchcertificate", fetchcertificate_1.default, async (req, res) => {
    try {
        const id = req.header("certificateid");
        const courseId = id;
        const cdetails = await CourseStudents_1.default.find({ _id: courseId });
        res.json(cdetails);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/fetchthecertificate", fetchcertificate_1.default, async (req, res) => {
    try {
        const Id = req.header("certificateId");
        const courseId = Id;
        const cdetails = await CourseStudents_1.default.findById(courseId);
        res.json(cdetails);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/fetchallusercertificates", fetchuser_1.default, async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await user_1.default.findById(userId).select("-password");
        const course = await CourseStudents_1.default.find({ StudentEmail: user?.email });
        res.json(course);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/fetchallissuercertificates", fetchissuer_1.default, async (req, res) => {
    try {
        const issuerId = req.issuer?.id;
        const issuer = await issuer_1.default.findById(issuerId).select("-password");
        const certificate = await Certifications_1.default.find({
            issueremail: issuer?.email,
        });
        res.json(certificate);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/addcertificate", fetchissuer_1.default, [
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
        const certificate = new Certifications_1.default({
            coursename,
            issuername,
            issueremail,
            certificatetype,
        });
        const savedcertificate = await certificate.save();
        res.json(savedcertificate);
        // res.json(savedcourse)
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.default = router;
