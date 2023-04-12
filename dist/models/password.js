"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const { Schema, model } = connection_1.default;
const passwordSchema = new Schema({
    password: { type: String, required: true }
}, { timestamps: true });
const Password = model("Password", passwordSchema);
exports.default = Password;
