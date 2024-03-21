import { Client } from 'pg'

const INSERT_GATE          = `INSERT INTO gate VALUES(sq_gate_id.NEXTVAL,:mac,:topic)`;
const SELECT_ALL_GATES     = `SELECT mac,topic FROM gate`;
const SELECT_GATE          = `SELECT id,mac,topic FROM gate WHERE mac=:mac`;
const SELECT_GATE_BY_TOPIC = `SELECT id,mac,topic FROM gate WHERE topic=:topic`;
const INSERT_NUMBERPLATE   = `INSERT INTO NUMBERPLATE VALUES(sq_numberplate_id.NEXTVAL,:gateId,:numberplate,to_date(:startdate default null on conversion error, 'YYYY-MM-dd'),to_date(:enddate default null on conversion error, 'YYYY-MM-dd'))`;
const SELECT_NUMBERPLATE   = `SELECT numberplate,startdate,enddate FROM numberplate WHERE gate_id=:gateId`;
const DELETE_NUMBERPLATE   = `DELETE FROM numberplate WHERE gate_id=:gateId AND numberplate=:numberplate`;

let client = null;

async function connectToDB() {
    if (client === null) {
        console.log(`ExpressApp try to connect to "${getProperty("db-host")}"`);

        client = new Client();

        await client.connect();

        console.log(`ExpressApp connected to "${getProperty("db-host")}"`);
    }
}

async function addGate(mac,topic) {
    const result = await client?.query(INSERT_GATE,[mac,topic],{autoCommit:true});
    return result.rowCount;
}

async function getGate(mac) {
    const result = await client?.query(SELECT_GATE,[mac]);
    return result.rows;
}

async function getGateByTopic(topic) {
    const result = await client?.query(SELECT_GATE_BY_TOPIC,[topic]);
    return result.rows;
}

async function getGates() {
    const result = await client?.query(SELECT_ALL_GATES);
    return result.rows;
}

async function getNumberplates(gateId) {
    const result = await client?.query(SELECT_NUMBERPLATE,[gateId]);
    return result.rows;
}

async function addNumberplate(gateId,numberplate,startdate=null,enddate=null) {
    const result = await client?.query(INSERT_NUMBERPLATE,[gateId,numberplate,startdate,enddate],{autoCommit:true});
    return result.rowCount;
}

async function deleteNumberplate(gateId,numberplate) {
    const result = await client?.query(DELETE_NUMBERPLATE,[gateId,numberplate],{autoCommit:true});
    return result.rowCount;
}

function getReadyState(_req, res) {
    if (client?.isHealthy()) res.status(200).send('ok');
        else res.status(500).send('no database connection');
}


module.exports = {
    connectToDB,
    getReadyState,
    addGate,
    getGate,
    getGateByTopic,
    getGates,
    getNumberplates,
    addNumberplate,
    deleteNumberplate,
};
