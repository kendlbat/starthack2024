import express from "express";
import db from "../../db/db-manager.mjs";
import { BadRequest } from "../../errors/app-errors.mjs";

const teachesRouter = express.Router();

teachesRouter.post("/", async (req, res, next) => {
    try {
        const result = await db
            .insert(req.body)
            .into("teaches")
            .returning(["teacher_usr","class_name","class_year"]);
        res.json(result);
    } catch (err) {
        next(new BadRequest(err.message));
    }
});

teachesRouter.get("/", async (_req, res) => {
    const result = await db
        .select(["teacher_usr","class_name","class_year"])
        .from("teaches");
    
    res.json(result);
});

teachesRouter.get("/:class_year/:teacher_usr", async (req, res) => {
    const result = await db
        .select(["teacher_usr","class_name","class_year"])
        .where({"teacher_usr": req.params.teacher_usr,"class_year": parseInt(req.params.class_year) || -1})
        .from("teaches");
    
    res.json(result);
});

teachesRouter.delete("/:class_year/:class_name/:teacher_usr", async (req, res) => {
    const result = await db.delete()
        .where({"class_name": req.params.class_name,"class_year": parseInt(req.params.class_year) || -1, "teacher_usr":req.params.teacher_usr})
        .from("teaches");
    res.json(result);
});

export default teachesRouter;
