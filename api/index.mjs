import { Router } from "express";
const apiRouter = Router();
import secureRouter from "./secure/index.mjs";

import { ExpressAuth, getSession } from "@auth/express";
import KeycloakProvider from "../auth/provider.mjs";

/**
 * @type {import("@auth/core").AuthConfig}
 */
const authConfig = {
    providers: [KeycloakProvider],
    basePath: "/api/auth",
};

async function authSession(req, res, next) {
    res.locals.session = await getSession(req, authConfig);
    next();
}

async function protect(req, res, next) {
    if (!res.locals.session) {
        res.status(401).send("Unauthorized");
        return;
    }
    next();
}

// Ghosty library
apiRouter.post("/auth/signout/signout", authSession, async (req, res) => {
    res.redirect(307, "/api/auth/signout");
});

// Login: GET http://localhost:3000/api/auth/signin/keycloak
// Logout: POST http://localhost:3000/api/auth/signout
apiRouter.use("/auth/*", ExpressAuth(authConfig));

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
