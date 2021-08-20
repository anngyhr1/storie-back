const winston = require("./../lib/log/winston.js");
//const {getAllInfo} = require("./../lib/storage/helper.js");

//-----------------------------------------
//-----------------------------------------

// middleware used to log the response

const logResponse = async (req, res, next) => {
  try {

    // Clear Data Image
  /*   if ( req.body.hasOwnProperty('type') ) {
      if(req.body.type === 'Buffer'){
        req.body.data = 'Image Info :)'
        }
    } */


    //------
    // LOG
    //------

    const code = res.locals.responseCode || 200;

    //const info = getAllInfo();

    winston.log({
      //info,
      code,
      response: res.locals.responseSend,
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


    //---------
    // Respose 
    //---------
      res.status(code).send(res.locals.responseSend);

  } catch (e) {
    console.error(e);
  }
};
//-----------------------------------------
//-----------------------------------------

module.exports.logResponse = logResponse;
