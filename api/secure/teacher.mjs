import express from "express";
import db from "../../db/db-manager.mjs";
import { BadRequest, NotFound } from "../../errors/app-errors.mjs";

const teacherRouter = express.Router();

teacherRouter.post("/", async (req, res, next) => {
    try {
        const result = await db
            .insert(req.body)
            .into("teachers")
            .returning("teacher_usr");
        res.json(result);
    } catch (err) {
        next(new BadRequest(err.message));
    }
});

teacherRouter.get("/", async (_req, res) => {
    const result = await db
        .select(["teacher_usr","teacher_name","teacher_email"])
        .from("teachers");
    
    res.json(result);
});

teacherRouter.get("/:teacher_usr", async (req, res, next) => {
    const result = await db
        .select(["teacher_usr","teacher_name","teacher_email"])
        .from("teachers")
        .where({"teacher_usr": req.params.teacher_usr});

    if (!result) return next(new NotFound());
    
    res.json(result[0]);
});

teacherRouter.delete("/:teacher_usr", async (req, res) => {
    const result = await db.delete().where({teacher_usr: req.params.teacher_usr}).from("teachers");
    res.json(result);
});

export default teacherRouter;
