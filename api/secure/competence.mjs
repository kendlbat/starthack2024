import express from "express";
import db from "../../db/db-manager.mjs";
import { BadRequest, NotFound } from "../../errors/app-errors.mjs";

const competenceRouter = express.Router();

competenceRouter.post("/", async (req, res, next) => {
    try {
        const result = await db
            .insert(req.body)
            .into("competences")
            .returning(["uid","fb_id","f_id","kb_id","ha_id","k_id","aufzaehlungspunkt","sprache","bezeichnung","code","aufbau","zyklus","strukturtyp"]);
        res.json(result);
    } catch (err) {
        next(new BadRequest(err.message));
    }
});

competenceRouter.get("/", async (_req, res) => {
    const result = await db
        .select(["uid","fb_id","f_id","kb_id","ha_id","k_id","aufzaehlungspunkt","sprache","bezeichnung","code","aufbau","zyklus","strukturtyp"])
        .from("competences");
    
    res.json(result);
});

competenceRouter.get("/:uid", async (req, res, next) => {
    const result = await db
        .select(["uid","fb_id","f_id","kb_id","ha_id","k_id","aufzaehlungspunkt","sprache","bezeichnung","code","aufbau","zyklus","strukturtyp"])
        .from("competences")
        .where({"uid": req.params.uid});

    if (!result) return next(new NotFound());
    
    res.json(result[0]);
});

competenceRouter.delete("/:uid", async (req, res) => {
    const result = await db.delete().where({uid: req.params.uid}).from("competences");
    res.json(result);
});

export default competenceRouter;
