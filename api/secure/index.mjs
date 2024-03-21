import { Router } from "express";
import documentRouter from "./document.mjs";
const secureRouter = Router();

secureRouter.get("/session", (req, res) => {
    res.json(res.locals.session);
});

secureRouter.get("/me", (req, res) => {
    // Get user details
    res.json();
});

secureRouter.use("/document", documentRouter);

export default secureRouter;
