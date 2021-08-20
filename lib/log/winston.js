
const { createLogger, format, transports } = require('winston');
const { timestamp } = format;

//const {LoggingWinston} = require('@google-cloud/logging-winston');
//const logGoogle = new LoggingWinston();

//-------------------------
//-------------------------

// loggerWinston
const loggerWinston = createLogger({
	format: format.combine(
		timestamp(),
		format.json()
		),
	transports: [new transports.Console()]
  //transports: [new transports.Console(),logGoogle]
});

// Log
module.exports.log = log;
function log( log ){
	//loggerWinston.info( JSON.stringify(log) );
	loggerWinston.info( log );
}

// Log Error
module.exports.error = error;
function error( error ){
	//loggerWinston.error( JSON.stringify(error) );
	loggerWinston.error( error );
}
