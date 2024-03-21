import express from "express";
import db from "../../db/db-manager.mjs";
import { BadRequest, NotFound } from "../../errors/app-errors.mjs";

const studentRouter = express.Router();

studentRouter.post("/", async (req, res, next) => {
    try {
        const result = await db
            .insert(req.body)
            .into("students")
            .returning("student_id");
        res.json(result);
    } catch (err) {
        next(new BadRequest(err.message));
    }
});

studentRouter.get("/", async (_req, res) => {
    const result = await db
        .select(["student_id","student_name"])
        .from("students")
    
    res.json(result);
});

studentRouter.get("/:id", async (req, res, next) => {
    const result = await db
        .select(["student_id","student_name"])
        .from("students")
        .where({"student_id": parseInt(req.params.id) || -1});

    if (!result) return next(new NotFound());
    
    res.json(result[0]);
});

studentRouter.delete("/:id", async (req, res) => {
    const result = await db.delete().where({student_id: parseInt(req.params.id) || -1}).from("students");
    res.json(result);
});

export default studentRouter;
