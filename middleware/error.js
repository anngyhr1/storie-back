const winston = require("./../lib/log/winston.js");
const { getAllInfo } = require("./../lib/storage/helper.js");

//-----------------------------------------
//-----------------------------------------

// middleware used to logging the errors and send the error response
const errorHandler = async (err, req, res, next) => {
  try {

    // Clear Data Image
    /* if ( req.body.hasOwnProperty('type') ) {
      if(req.body.type === 'Buffer'){
        req.body.data = 'Image Info :)'
        }
    } */


    //------
    // LOG
    //------

    const code = err.statusCode || 500;

    const message = err.statusCode ? err.message : "Error no Servidor tenta novamente";

    const info = getAllInfo();
     
    winston.error({
      info,
      code,
      message,
      error: err,
      stack: err.stack,
      headers: req.headers,
      body: req.body,
      baseUrl: req.baseUrl,
      hostname: req.hostname,
      method: req.method,
      originalUrl: req.originalUrl,
      params: req.params,
      path: req.path,
      query: req.query,
      route: req.route
      //,file: req.files
    });


    //----------
    // Respose 
    //----------
      res.status(code).send(message);
    
  } catch (e) {
    console.error(e);
  }
};

module.exports.errorHandler = errorHandler;
