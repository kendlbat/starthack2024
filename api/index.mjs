import { Router } from "express";
const apiRouter = Router();
import secureRouter from "./secure/index.mjs";

import { ExpressAuth, getSession } from "@auth/express";
import KeycloakProvider, { authConfig, authSession } from "../auth/provider.mjs";



async function protect(req, res, next) {
    if (!res.locals.session) {
        res.status(401).send("Unauthorized");
        return;
    }
    next();
}

// Ghosty library


// Login: GET http://localhost:3000/api/auth/signin/keycloak
// Logout: POST http://localhost:3000/api/auth/signout

apiRouter.use("/secure", authSession, protect, secureRouter);

apiRouter.get("/hello", (req, res) => {
    res.send("Hello, world!");
});

apiRouter.use((req, res) => {
    if (res.headersSent) {
        return;
    }
    res.status(404).send("Not found");
});

export default apiRouter;
