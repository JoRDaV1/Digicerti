"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_1 = __importDefault(require("./routes/auth"));
const block_1 = __importDefault(require("./routes/block"));
const certificate_1 = __importDefault(require("./routes/certificate"));
const morgan_1 = __importDefault(require("morgan"));
mongoose_1.default
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("MongoDB Connection Succeeded.");
})
    .catch((err) => {
    console.log("Error in DB connection : " + err);
});
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api/auth", auth_1.default);
app.use("/api/auth", block_1.default);
app.use("/api/auth", certificate_1.default);
app.listen(port, () => {
    console.log(`Digicerti backend listening at http://localhost:${port}`);
});
