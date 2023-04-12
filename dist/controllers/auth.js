"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// create router
const router = express_1.default.Router();
// Admin Signup Post
router.post("/signup", async (request, response) => {
    try {
        // Hash password
        request.body.password = await bcryptjs_1.default.hash(request.body.password, await bcryptjs_1.default.genSalt(10));
        // Generate user
        const user = await User_1.default.create(request.body);
        // Response
        response.json({ status: "User Created", username: user });
    }
    catch (error) {
        response.status(400).json(error);
    }
});
// Admin Login Post
router.post("/login", async (request, response) => {
    try {
        const { username, password } = request.body;
        //Check for user
        const user = await User_1.default.findOne({ username });
        const { SECRET } = process.env;
        if (user) {
            const passwordCheck = await bcryptjs_1.default.compare(password, user.password);
            if (passwordCheck) {
                const payload = { username };
                const token = await jsonwebtoken_1.default.sign(payload, SECRET);
                response.cookie("token", token, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "none",
                    secure: request.hostname === "locahhost" ? false : true,
                }).json({ payload, status: "logged in" });
            }
            else {
                response.status(400).json({ error: "Password does not match" });
            }
        }
        else {
            response.status(400).json({ error: "User does not exist" });
        }
    }
    catch (error) {
        response.status(400).json(error);
    }
});
// Admin Logout Post
router.post("/logout", async (request, response) => {
    response.clearCookie("token").json({ response: "You are Logged Out" });
});
// User quiz verification Post
router.post("/:id", async (request, response) => {
    try {
        const { password } = request.body;
        //Check for existing quiz
        const quiz = await Quiz.findOne({ _id: request.params.id });
        if (quiz) {
            const passwordCheck = await bcryptjs_1.default.compare(password, quiz.password);
            if (passwordCheck) {
                const payload = request.params.id;
                const token = await jsonwebtoken_1.default.sign(payload, process.env.SECRET);
                response.cookie("userToken", token, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "none",
                    secure: request.hostname === "locahhost" ? false : true,
                }).json({ payload, status: "logged in" });
            }
            else {
                response.status(400).json({ error: "Password does not match" });
            }
        }
        else {
            response.status(400).json({ error: "Quiz does not exist" });
        }
    }
    catch (error) {
        response.status(400).json(error);
    }
});
exports.default = router;
