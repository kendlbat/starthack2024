import express from "express";
import multer from "multer";
import db from "../../db/db-manager.mjs";
import { BadRequest } from "../../errors/app-errors.mjs";

const documentRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

documentRouter.post("/", upload.any(), async (req, res, next) => {
    const file = req.files[0];

    if (!file) return next(new BadRequest());

    const { originalname, mimetype } = file;

    if (!originalname || !mimetype ) return next(new BadRequest());

    const data = file.buffer;
    const result = await db
        .insert({ doc_name: originalname, doc_type: mimetype, doc_blob: data })
        .into("documents")
        .returning("document_id");
    
    res.json(result);
});

documentRouter.get("/:id", async (req, res, next) => {
    const { doc_type, doc_blob} = (await db.select(["doc_type","doc_blob"]).where({document_id: parseInt(req.params.id) || -1}).from("documents"))[0];
    
    if (!doc_type || !doc_blob) return next(new BadRequest());

    res.setHeader("content-type", doc_type);
    res.send(doc_blob);
});

export default documentRouter;
