const express = require("express");

const { jwtSign } = require("./../../lib/Auth/jwt.js");
const { customError } = require("./../../lib/error/error.js");
//const { SelectDocWhereFS } = require("./../../lib/DB/fireStore/dbFunctions.js");
const { sessionLogin, sessionLoginSecret } = require("./../../middleware/session.js");

const { 
      getAllRecordsUserAL,
      getAllRecordsIdAdminAL 
      } = require("./../../lib/algolia/algoliaLogic.js");

const {
  uidValueSchema,
} = require('./../../lib/joi/schemas.js');

const { checkSchema } = require('./../../lib/joi/helpers.js');

const {saveInfo} = require("./../../lib/storage/helper.js");

const router = express.Router();

//-----------------------------------
//-----------------------------------

// Login User using google
router.post(
    "/loginUser", 
    sessionLogin, 
    async (req, res, next) => {
  try {

    checkSchema(res.locals.data.uid, uidValueSchema, "/modUserInfo");
    
    // uid
    let uid = res.locals.data.uid;

    //-------------------
    // Find store User
    //-------------------

    const { misstore : misstore , userPerfil : userPerfil } = await getAllRecordsUserAL("stories", "perfil", uid);


    //----------
    //  Front
    //----------

    // make up the JWT
    const jwt = jwtSign({ uid });

    // Respuesta al Front
    res.locals.responseSend = {
      message: "Login Success",
      data: misstore,
      userPerfil : userPerfil,
      uid,
      token: jwt
    };

    res.locals.responseCode = 200;

    // call the responseÂ´s log middleware
    next();

  } catch (e) {
    // call the Error middleware
    next(e);
  }
});


// Login userAdmin
// router.post(
//     "/userAdmin", 
//     sessionLoginSecret, 
//     async (req, res, next) => {
//   try {

//     // Inputs
//     let idShop = res.locals.idAdminData.idShop;
//     let uid = res.locals.idAdminData.idAdmin;

//     //-----------------------------------
//     //  Find (Store + items) Admin Store
//     //-----------------------------------

//     const adminStore = await getAllRecordsIdAdminAL("store", "items", idShop);

//     //----------
//     //  JWT
//     //----------
	
//     // make up the JWT
//     // const jwt = jwtSign({pass: res.locals.tokenId, uid})
//     const jwt = jwtSign({ uid });


//     //----------
//     //  Front
//     //----------

//     // Respuesta al Front
//     res.locals.responseSend = {
//       message: "ok",
//       adminStore,
//       uid : idShop,
//       token: jwt
//     };
	
//     res.locals.responseCode = 200;
	
//     // call the response´s log middleware
//     next();

//   } catch (e) {
//     // call the Error middleware
//     next(e);
//   }
// });

//----------------------------------
//----------------------------------

module.exports.routerLogin = router;
