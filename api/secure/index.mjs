import { Router } from "express";
const secureRouter = Router();

secureRouter.get("/hello", (req, res) => {
    res.send("Hello, secure world!");
});

export default secureRouter;
