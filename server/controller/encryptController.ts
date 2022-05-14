import { Request, Response } from "express";

import { encrypt } from "../utils/encrypt";

const encryptController = async (req: Request, res: Response) => {
	try {
		if (!req.file)
			return res.status(422).json({ status: "Error", msg: "No Image" });

        const result = await encrypt(req.file.path);
        res.json(result);
	} catch (error) {
		console.log(error);
        res.status(422).json({ status: "Error", msg: "An error occured" });
	}
};

export default encryptController;
