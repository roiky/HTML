"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// destination folder
const UPLOAD_DIR = path_1.default.join(process.cwd(), "uploads");
// create uploads dir if not exists
if (!fs_1.default.existsSync(UPLOAD_DIR)) {
    fs_1.default.mkdirSync(UPLOAD_DIR, { recursive: true });
}
// storage strategy: keep original extension, prefix timestamp to avoid collisions
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (_req, file, cb) => {
        const safeName = file.originalname.replace(/\s+/g, "_");
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}-${safeName}`;
        cb(null, unique);
    },
});
// file filter: accept images only (basic)
function fileFilter(_req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowed.includes(file.mimetype))
        cb(null, true);
    else
        cb(new Error("Only image files are allowed"));
}
exports.uploadSingle = (0, multer_1.default)({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
