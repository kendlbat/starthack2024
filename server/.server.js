const express             = require("express");
const { errorHandler }    = require("./errors/error-handler");
const {connectToDB, getReadyState} = require("./db/db-manager");
// const path = require('path');

const PORT = getPort();
const HOSTNAME = "0.0.0.0";

const app = express();

// remove when using docker container
process.env.USER=
process.env.PGPASSWORD=null

async function main() {
    console.log('starting server ...');

    app.use(express.json());
    app.use(express.text())

    app.use((req,res,next) => {
        console.log(req.url);
        next();
    });
    app.use('/api/readyz', getReadyState);

    //app.use(express.static('client/build'));
    // app.get('/*', function (req, res) {
    //     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    // });
    app.use(errorHandler);

    console.log(`ExpressApp try to start with cli-args: `, args);

    await connectToDB();

    app.listen(PORT, HOSTNAME, () => {
        console.log(`ExpressApp running on http://${HOSTNAME}:${PORT}`);
        app.emit('server-up-and-running');
    });
}
main().catch(err => {
    console.log(`ExpressApp start failed. Errordetails here:`);
    console.error(err);
    process.exit(0);
});

function getPort() {
    if (typeof(args.port) === "number" && args.port >= 0 && args.port <= 65535) return args.port;
    else return getProperty('port');
}

module.exports = app;
