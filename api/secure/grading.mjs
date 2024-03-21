import express from "express";
import db from "../../db/db-manager.mjs";
import { BadRequest } from "../../errors/app-errors.mjs";

const gradingRouter = express.Router();

gradingRouter.post("/", async (req, res, next) => {
    try {
        const result = await db
            .insert(req.body)
            .into("gradings")
            .returning(["grading_id"]);
        res.json(result);
    } catch (err) {
        next(new BadRequest(err.message));
    }
});

gradingRouter.get("/", async (_req, res) => {
    const result = await db
        .select(["grading_id","student_id","class_name","class_year","teacher_usr","document_id","competences_uid","subject_name","test_nr","task_nr","goal_result","weights","comment"])
        .from("gradings");
    
    res.json(result);
});

gradingRouter.get("/:class_year/:student_id", async (req, res) => {
    const result = await db
        .select(["grading_id","student_id","class_name","class_year","teacher_usr","document_id","competences_uid","subject_name","test_nr","task_nr","goal_result","weights","comment"])
        .where({"student_id": parseInt(req.params.student_id) || -1,"class_year": parseInt(req.params.class_year) || -1})
        .from("gradings");
    
    res.json(result);
});

gradingRouter.delete("/:grading_id", async (req, res) => {
    const result = await db.delete()
        .where({"grading_id": parseInt(req.params.grading_id) || -1})
        .from("gradings");
    res.json(result);
});

export default gradingRouter;
