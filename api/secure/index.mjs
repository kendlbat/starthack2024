import { Router } from "express";
import documentRouter from "./document.mjs";
import studentRouter from "./student.mjs";
import teacherRouter from "./teacher.mjs";
import schoolClassRouter from "./schoolClass.mjs";
import attendanceRouter from "./attendance.mjs";
import teachesRouter from "./teaches.mjs";
import gradingRouter from "./grading.mjs";
import competenceRouter from "./competence.mjs";
const secureRouter = Router();

secureRouter.get("/session", (req, res) => {
    res.json(res.locals.session);
});

secureRouter.get("/opendata", (req, res) => {
    const params = new URLSearchParams({
        ...req.query,
        apikey: process.env.SG_API_KEY,
    }).toString();
    console.log(params);
    fetch(
        "https://daten.stadt.sg.ch/api/explore/v2.1/catalog/datasets/lehrplan-21-kanton-st-gallen/records?" +
            params,
        {
            headers: {
                Accept: "application/json",
            },
        }
    )
        .then((r) => r.json())
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json({ error: err }));
});

secureRouter.get("/me", (req, res) => {
    // Get user details
    res.json();
});

secureRouter.use("/document", documentRouter);
secureRouter.use("/student", studentRouter);
secureRouter.use("/teacher",teacherRouter);
secureRouter.use("/classes",schoolClassRouter);
secureRouter.use("/attendance", attendanceRouter);
secureRouter.use("/teaches", teachesRouter);
secureRouter.use("/grading", gradingRouter);
secureRouter.use("/competence",competenceRouter);

export default secureRouter;
