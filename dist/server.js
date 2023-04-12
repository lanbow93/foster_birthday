"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./controllers/auth"));
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(morgan("tiny"));
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_1.default);
app.get('/', (request, response) => {
    response.send("Server is running");
});
const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});
