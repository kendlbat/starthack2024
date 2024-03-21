import express from "express";
import path from "node:path";

import { errorHandler }    from "./errors/error-handler.js";
import { connectToDB, getReadyState } from "./db/db-manager.js";
import apiRouter from "./api/index.mjs";

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

process.env.PGDATABASE = "schaepplidb";
process.env.PGUSER = "schaeppli";
process.env.PGPASSWORD = "tiajeiY6saeX9faaleexe0eeQuitahl4UShie5Aiqua4ahgei1eitiNgiejai7TohlaWa1baime";
process.env.PGPORT = 5432;

async function main() {
    console.log('starting server ...');

    const app = express();

    app.use(express.json());
    app.use(express.text());

    app.use((req,res,next) => {
        console.log(req.url);
        next();
    });
    app.use('/api/readyz', getReadyState);

    // Static file host
    app.use(express.static(path.join(".", "client", "dist")));
    app.use(express.json());

    app.use("/api", apiRouter);


    app.use(errorHandler);

    await connectToDB();

    app.listen(PORT, HOSTNAME, () => {
        console.log(`Server running on http://${HOSTNAME}:${PORT}`);
        app.emit('server-up-and-running');
    });
}

main().catch(err => {
    console.log(`ExpressApp start failed. Errordetails here:`);
    console.error(err);
    process.exit(0);
});
