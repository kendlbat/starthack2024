import express from "express";
import db from "../../db/db-manager.mjs";
import { BadRequest, NotFound } from "../../errors/app-errors.mjs";

const schoolClassesRouter = express.Router();

schoolClassesRouter.post("/", async (req, res, next) => {
    try {
        const result = await db
            .insert(req.body)
            .into("schoolclasses")
            .returning("class_name");
        res.json(result);
    } catch (err) {
        next(new BadRequest(err.message));
    }
});

schoolClassesRouter.get("/", async (_req, res) => {
    const result = await db
        .select(["class_name","class_year"])
        .from("schoolclasses");
    
    res.json(result);
});

schoolClassesRouter.get("/:class_year/:class_name", async (req, res, next) => {
    const result = await db
        .select(["class_name","class_year"])
        .from("schoolclasses")
        .where({"class_name": req.params.class_name,"class_year": parseInt(req.params.class_year) || -1});

    if (!result) return next(new NotFound());
    
    res.json(result[0]);
});

schoolClassesRouter.delete("/:class_year/:class_name", async (req, res) => {
    const result = await db.delete().where({"class_name": req.params.class_name,"class_year": parseInt(req.params.class_year) || -1}).from("schoolclasses");
    res.json(result);
});

export default schoolClassesRouter;
