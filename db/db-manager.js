const { Client } = require("pg");

const INSERT_GATE          = `INSERT INTO gate VALUES(sq_gate_id.NEXTVAL,$1,§2)`;
const SELECT_ALL_GATES     = `SELECT mac,topic FROM gate`;
const SELECT_GATE          = `SELECT id,mac,topic FROM gate WHERE mac=$1`;
const SELECT_GATE_BY_TOPIC = `SELECT id,mac,topic FROM gate WHERE topic=$1`;
const INSERT_NUMBERPLATE   = `INSERT INTO NUMBERPLATE VALUES(sq_numberplate_id.NEXTVAL,$1,$2,to_date($3 default null on conversion error, 'YYYY-MM-dd'),to_date($4 default null on conversion error, 'YYYY-MM-dd'))`;
const SELECT_NUMBERPLATE   = `SELECT numberplate,startdate,enddate FROM numberplate WHERE gate_id=$1`;
const DELETE_NUMBERPLATE   = `DELETE FROM numberplate WHERE gate_id=$1 AND numberplate=$2`;

let client = null;

async function connectToDB() {
    if (client === null) {
        console.log(`ExpressApp try to connect to "${process.env.PGDATABASE}"`);

        client = new Client();

        await client.connect();

        console.log(`ExpressApp connected to "${process.env.PGDATABASE}"`);
    }
}

async function addGate(mac,topic) {
    await client.query('BEGIN');
    const result = await client?.query(INSERT_GATE,[mac,topic],{autoCommit:true});
    await client.query('COMMIT');
    return result.rowCount;
}

async function getGate(mac) {
    await client.query('BEGIN');
    const result = await client?.query(SELECT_GATE,[mac]);
    await client.query('COMMIT');
    return result.rows;
}

async function getGateByTopic(topic) {
    await client.query('BEGIN');
    const result = await client?.query(SELECT_GATE_BY_TOPIC,[topic]);
    await client.query('COMMIT');
    return result.rows;
}

async function getGates() {
    await client.query('BEGIN');
    const result = await client?.query(SELECT_ALL_GATES);
    await client.query('COMMIT');
    return result.rows;
}

async function getNumberplates(gateId) {
    await client.query('BEGIN');
    const result = await client?.query(SELECT_NUMBERPLATE,[gateId]);
    await client.query('COMMIT');
    return result.rows;
}

async function addNumberplate(gateId,numberplate,startdate=null,enddate=null) {
    await client.query('BEGIN');
    const result = await client?.query(INSERT_NUMBERPLATE,[gateId,numberplate,startdate,enddate],{autoCommit:true});
    await client.query('COMMIT');
    return result.rowCount;
}

async function deleteNumberplate(gateId,numberplate) {
    await client.query('BEGIN');
    const result = await client?.query(DELETE_NUMBERPLATE,[gateId,numberplate],{autoCommit:true});
    await client.query('COMMIT');
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
    deleteNumberplate
}