const express = require("express");
const path = require('path')
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const functions = require("firebase-functions");
const responseTime = require("response-time");

const config = require("./lib/config/config.js");
const winston = require("./lib/log/winston.js");

const {requestStorageMiddleware} = require("./middleware/asyncLocalStorage.js");



const app = express();

app.use(bodyParser.json({ limit: config.get("json.limit") }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestStorageMiddleware);

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

// app.set('views', path.join(__dirname, 'public'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.use(cors({origin: true}));

app.use(responseTime());

const { routeStorie } = require("./routes/storie/index.js");
const { routerLogin } = require("./routes/login/index.js");
const { routerUser } = require("./routes/user/index.js");
const { routerSearch } = require("./routes/search/index.js");

// middleware
const { logResponse } = require("./middleware/response.js");
const { errorHandler } = require("./middleware/error.js");

// Add the routers
app.use(routeStorie);
app.use(routerLogin);
app.use(routerUser);
app.use(routerSearch);

app.use(logResponse);
app.use(errorHandler);

// Uncaught JavaScript exception
process.on("uncaughtException", err => {
  // LOG
  winston.error({
    error: err,
    info: { method: "uncaughtException", message: "unhandle error" },
    stack: err.stack || new Error().stack
  });
});

// Promise is rejected AND No error handler is attached to the promise
process.on("unhandledRejection", (reason, promise) => {
  // LOG
  winston.error({
    error: reason,
    info: { method: "unhandledRejection", message: "unhandle Promise" },
    promise: promise,
    stack: reason.stack || new Error().stack
  });
});


const PORT = process.env.PORT || config.get("port.ini");

app.listen(PORT, () => {
  // LOG
  winston.log({
    info: {
      method: "app.listen",
      message: `Server is listening on port ${PORT}`
    }
  });
});

//-----------------
// FireBase
//-----------------

// Set timeout and memory allocation
const runtimeOpts = {
  timeoutSeconds: config.get("firebase.timeoutSeconds"),
  memory: config.get("firebase.memory")
};

exports.app = functions
  .runWith(runtimeOpts)
  .https //.region('europe-west1')
  .onRequest(app);