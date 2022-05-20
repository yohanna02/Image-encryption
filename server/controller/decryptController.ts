import { Request, Response } from "express";
import JSZip from "jszip";

import { decrypt } from "../utils/decrypt";

const decryptController = async (req: Request, res: Response) => {
	try {
		if (!req.files)
			return res.status(422).json({ status: "Error", msg: "No Image" });

		const encryptedImagePath = (req.files as any).image[0].path;
		const keyPath = (req.files as any).key[0].path;

		const { outputPath } = await decrypt(encryptedImagePath, keyPath);

		const zip = new JSZip();

		zip.file(outputPath);

		zip.generateAsync({ type: "blob" }).then(function (content) {
			
		});
		res.json({ status: "OK", msg: "Decrytped Image successfully" });
	} catch (error) {
		console.log(error);
		res.status(422).json({ status: "Error", msg: "An error occured" });
	}
};

export default decryptController;
