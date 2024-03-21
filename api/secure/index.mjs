import { Router } from "express";
const secureRouter = Router();

secureRouter.get("/session", (req, res) => {
    res.json(res.locals.session);
});

export default secureRouter;
