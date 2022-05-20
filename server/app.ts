import express from "express";
import cors from "cors";

import decryptController from "./controller/decryptController";
import encryptController from "./controller/encryptController";
import downloadController from "./controller/downloadController";
import imgUpload from "./middlewares/uploadImg";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/encrypt", imgUpload, encryptController);
app.post("/api/v1/decrypt", imgUpload, decryptController);
app.get("/api/v1/download/:downloadType", downloadController);

const PORT = 3001;

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
