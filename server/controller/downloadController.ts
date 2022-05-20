import { join } from "path";
import { existsSync, unlink, unlinkSync } from "fs";
import { Request, Response } from "express";

const downloadController = (req: Request, res: Response) => {
    const { downloadType } = req.params;

    if (downloadType === "e") {
        const filePath = join(__dirname, "../assets/encrypted file.zip")

        if (existsSync(filePath)) {
            res.download(filePath, (err) => {
                if (err) return;
                
                setTimeout(() => {
                    unlinkSync(filePath);
                }, 20000);
            });
            return;
        }

        res.status(404).json({status: "File not found", msg: "No Files have be encrypted"});
        return;
    }

    const filePath = join(__dirname, "../assets/decrypted file.zip")

    if (existsSync(filePath)) {
        res.download(filePath, (err) => {
            if (err) return;
            
            unlinkSync(filePath);
        });
    }

    res.status(404).json({status: "File not found", msg: "No Files have be decrypted"});
};

export default downloadController;
