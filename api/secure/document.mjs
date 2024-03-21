import express from "express";
import multer from "multer";
import db from "../../db/db-manager.mjs";
import { BadRequest, NotFound } from "../../errors/app-errors.mjs";

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
        .insert({ doc_name: originalname, doc_type: mimetype, doc_blob: data, ...req.body})
        .into("documents")
        .returning("document_id");
    
    res.json(result);
});

documentRouter.get("/", async (_req, res) => {
    const result = await db.select(["document_id","student_id","class_name","class_year","doc_date","doc_type","doc_name"]).from("documents");
    res.json(result);
});

documentRouter.get("/:id", async (req, res, next) => {
    const result = (await db.select(["document_id","student_id","class_name","class_year","doc_date","doc_type","doc_name"]).where({document_id: parseInt(req.params.id) || -1}).from("documents"))[0];

    if (!result) return next(new NotFound());

    res.json(result);
});

documentRouter.delete("/:id", async (req, res) => {
    const result = await db.delete().where({document_id: parseInt(req.params.id) || -1}).from("documents");
    res.json(result);
});

documentRouter.get("/file/:id", async (req, res, next) => {
    const { doc_type, doc_blob } = (await db.select(["doc_type","doc_blob"]).where({document_id: parseInt(req.params.id) || -1}).from("documents"))[0];
    
    if (!doc_type || !doc_blob) return next(new BadRequest());

    res.setHeader("content-type", doc_type);
    res.send(doc_blob);
});

export default documentRouter;
