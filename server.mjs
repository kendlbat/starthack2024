import express from "express";
import path from "node:path";
const app = express();

import apiRouter from "./api/index.mjs";

// Static file host
app.use(express.static(path.join(".", "client", "dist")));
app.use(express.json());

app.use("/api", apiRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
