const { validateTokenGoogle, jwtVerify } = require("./../lib/Auth/jwt.js");

const {
  idTokenSchema,
} = require('./../lib/joi/schemas.js');


const { checkSchema } = require('./../lib/joi/helpers.js');

//const { adminStore } = require("./../lib/session/session.js");

//const { saveInfo } = require("./../lib/storage/helper.js");

const { customError } = require("./../lib/error/error.js");

//-----------------------------------------
//-----------------------------------------

//---------------
// session valid
//---------------

const sessionLogin = async (req, res, next) => {
  try {

    // check Inputs
    checkSchema(req.get("idToken"), idTokenSchema, "/sessionLogin");

   // tomamos el token de google
    let token = req.get("idToken");
    //console.log("req "+req.get("idToken"));
    //console.log("req.get('Content-Type') "+req.get('Content-Type'));

    //console.log("id Token ::::: "+ token);
    //------------
    // UID
    //------------

    let respon = {};
    // validamos si el token de google es valido
    respon = await validateTokenGoogle(token);

    console.log("respon validateTokenGoogle ::: "+ respon.status);
    //------------
    // validation
    //------------

    if (respon.status === 1) {

      let responG = {};
      responG.uid = respon.data.uid;

      res.locals.data = responG;

      res.locals.token = token;

      next();

    } else {
      throw customError(
        "Error validation Token",
        "googleSession",
        440,
        null,
        new Error().stack
      );
    }
  } catch (e) {
    next(e);
  }
};

// const sessionLoginSecret = async (req, res, next) => {
//   try {

//     // check Inputs
//     checkSchema( req.get("idToken"), idAdminSchema, "/sessionLoginSecret" );

//     //--------------------
//     // idAdmin validation
//     //--------------------

//     const idAdmin = req.get("idToken");

//     let respon = await adminStore(idAdmin);
	
//     //--------------------
//     // idAdmin Data
//     //--------------------
	
//     let idAdminData = {};
    
//     idAdminData.idShop = respon.data.idShop;
//     idAdminData.idAdmin = respon.data.idAdmin;

//     if (respon.status === 1) {
//       res.locals.idAdminData = idAdminData;
//       next();
//     } else if (respon.status === 2) {
//       // res.locals.responseSend = { message: 'IdAdmin No Exist' };
//       // res.locals.responseCode = 498;
//       throw customError(
//         "IdAdmin No Exist",
//         "sessionAdmin",
//         498,
//         null,
//         new Error().stack
//       );
//       // res.status(200).send({ message: 'IdAdmin No Exist' , data: '498' });
//     } else {
//       throw customError(
//         "Error validation idAdmin",
//         "googleSession",
//         440,
//         null,
//         new Error().stack
//       );
//     }
//   } catch (e) {
//     next(e);
//   }
// };

const sessionApp = async (req, res, next) => {
  try {

    // check Inputs
    checkSchema(req.get("idToken"), idTokenSchema, "/sessionLogin");

    const token = req.get("idtoken");

    let respon = {};

    // login con el pass de admin
    respon = jwtVerify(token);

    //console.log('respon', respon)

    if (respon.status === 1) {
      res.locals.data = respon.data;
      // used to created the JsonWebToken
      res.locals.token = token;
      next();
    } else {
      throw customError(
        "Error validation Token",
        "sessionApp",
        440,
        null,
        new Error().stack
      );
    }
  } catch (e) {
    next(e);
  }
};

//-----------------------------------------
//-----------------------------------------

module.exports.sessionLogin = sessionLogin;
module.exports.sessionApp = sessionApp;
//module.exports.sessionLoginSecret = sessionLoginSecret;
