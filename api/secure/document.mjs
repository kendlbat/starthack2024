import express from "express";
import multer from "multer";
import db from "../../db/db-manager.mjs";

const documentRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

documentRouter.post("/", upload.any(), async (req, res) => {
    const { file } = req;
    const { name, type } = file;
    const data = file.buffer;
    const result = await db
        .insert({ name, type, data })
        .into("documents")
        .returning("id");

    res.json(result);
});

documentRouter.get("/:id", async (req, res) => {});

export default documentRouter;
