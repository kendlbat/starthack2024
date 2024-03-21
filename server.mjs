import express from "express";
import path from "node:path";

import { errorHandler } from "./errors/error-handler.mjs";
import apiRouter from "./api/index.mjs";

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

async function main() {
    console.log("starting server ...");

    const app = express();

    app.use(express.json());
    app.use(express.text());

    app.use((req, res, next) => {
        console.log(req.url);
        next();
    });

    // Static file host
    app.use(express.static(path.join(".", "client", "dist")));
    app.use(express.json());

    app.use("/api", apiRouter);

    app.use(errorHandler);

    app.listen(PORT, HOSTNAME, () => {
        console.log(`Server running on http://${HOSTNAME}:${PORT}`);
        app.emit("server-up-and-running");
    });
}

main().catch((err) => {
    console.log(`ExpressApp start failed. Errordetails here:`);
    console.error(err);
    process.exit(0);
});
