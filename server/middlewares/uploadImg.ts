import path from "path";
import multer from "multer";
import { Request, Response, NextFunction, Express } from "express";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../assets"));
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const filterImage = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	const fileType = /jpeg|jpg|png/;

	const extname = fileType.test(
		path.extname(file.originalname).toLowerCase()
	);

	const mimeType = fileType.test(file.mimetype);

	if (extname && mimeType === true) {
		cb(null, true);
	} else {
		cb(new Error("Error!!! JPG, JPEG or PNG Images only!!"));
	}
};

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		filterImage(req, file, cb);
	}
}).single("image");

const imgUpload = (req: Request, res: Response, next: NextFunction) => {
	upload(req, res, err => {
		if (err) return res.status(500).json({ msg: err.message });

		next();
	});
};

export default imgUpload;
