import { Request, Response } from "express";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { encrypt } from "../utils/encrypt";

const encryptController = async (req: Request, res: Response) => {
	try {
		if (!req.file)
			return res.status(422).json({ status: "Error", msg: "No Image" });

		const { outputImagePath, outputKeyPath } = await encrypt(req.file.path);

		const zip = new JSZip();

		zip.file(outputImagePath);
		zip.file(outputKeyPath);

		zip.generateAsync({ type: "blob" }).then(function (content) {
			saveAs(content, "encryted file.zip");
		});
		res.json({ status: "OK", msg: "Encryped Image successfully" });
	} catch (error) {
		console.log(error);
		res.status(422).json({ status: "Error", msg: "An error occured" });
	}
};

export default encryptController;
