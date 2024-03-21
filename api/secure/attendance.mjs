import express from "express";
import db from "../../db/db-manager.mjs";
import { BadRequest } from "../../errors/app-errors.mjs";

const attendanceRouter = express.Router();

attendanceRouter.post("/", async (req, res, next) => {
    try {
        const result = await db
            .insert(req.body)
            .into("attendances")
            .returning(["student_id","class_name","class_year"]);
        res.json(result);
    } catch (err) {
        next(new BadRequest(err.message));
    }
});

attendanceRouter.get("/", async (_req, res) => {
    const result = await db
        .select(["student_id","class_name","class_year"])
        .from("attendances");
    
    res.json(result);
});

attendanceRouter.get("/:class_year/:class_name", async (req, res) => {
    const result = await db
        .select(["student_id","class_name","class_year"])
        .where({"class_name": req.params.class_name,"class_year": parseInt(req.params.class_year) || -1})
        .from("attendances");
    
    res.json(result);
});

attendanceRouter.delete("/:class_year/:class_name/:student_id", async (req, res) => {
    const result = await db.delete()
        .where({"class_name": req.params.class_name,"class_year": parseInt(req.params.class_year) || -1, "student_id":parseInt(req.params.student_id) || -1})
        .from("attendances");
    res.json(result);
});

export default attendanceRouter;
