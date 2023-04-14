"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path_1.default.join(__dirname, "../Images"));
        ;
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
});
router.use(express_1.default.static(path_1.default.join(__dirname, "../Images")));
router.get("/", (request, response) => {
    response.send("Photos served from the 'Images' folder");
});
router.post("/", upload.single("photo"), (request, response) => {
    console.log(request.body);
    console.log(request.file);
    response.send("Photo uploaded successfully!");
});
exports.default = router;
