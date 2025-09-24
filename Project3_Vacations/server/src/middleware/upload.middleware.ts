import multer from "multer";
import path from "path";
import fs from "fs";

// destination folder
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// create uploads dir if not exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// storage strategy: keep original extension, prefix timestamp to avoid collisions
const storage = multer.diskStorage({
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
function fileFilter(_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files are allowed"));
}

export const uploadSingle = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
