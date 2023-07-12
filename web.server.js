
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('NOCODE');
const cors = require('cors');

log4js.configure('./log4js.json');

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

let conf = {};
app.use(cors());

app.use(
    cors({
      origin: 'http://localhost:4200'
    })
  );
try {
    conf = require(process.env.HOME + '/config/nocode-api-conf')
    console.log(new Date() + ' | Nocode Platform Configuration Loaded From Config');
} catch (e) {
    console.log(new Date() + ' | Default Configuration Loaded');
    conf = require('./conf');
}

app.conf = conf;
app.logger = logger;

// app.set('base', conf.web.basepath);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = require('http').Server(app);
server.listen(conf['web']['port']);
console.log("listen port=======>",conf['web']['port']);
app.get('/', function (req, res) {
    res.json("No code API port run successfully.")
})
logger.error('Nocode Platform Server Node Listening on ' + conf['web']['port']);

const APIRoutes = require('./routes/api-routes');
new APIRoutes(app, router);
