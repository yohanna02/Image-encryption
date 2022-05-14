import express from "express";
import decryptController from "./controller/decryptController";
import encryptController from "./controller/encryptController";
import imgUpload from "./middlewares/uploadImg";

const app = express();

app.use(express.json());

app.post("/encrypt", imgUpload, encryptController);
app.post("/decrypt", imgUpload, decryptController);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
