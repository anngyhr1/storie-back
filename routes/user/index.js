const express = require("express");

// generador de UUID shortid
const uuid = require("shortid");

const config = require("./../../lib/config/config.js");

const { customError } = require("./../../lib/error/error.js");

const { addPerfilUser, 
        updatePerfilUser,
        getPerfilUser 
      } = require("./../../lib/algolia/algoliaLogic.js");

//const { checkSchema } = require('./../../lib/joi/helpers.js');

//const {
//  uidValueSchema,
//  addPerfilSchema
//} = require('./../../lib/joi/schemas.js');



const { sessionApp } = require("./../../middleware/session.js");

const router = express.Router();

// Caracteres a Usar , eliminado los Signos por que No son tomados como parte de la URL por algunas Apps
uuid.characters(config.get("uuid.characters"));

//-----------------------------------
//-----------------------------------

// Add Store
router.post("/modUserInfo", 
            sessionApp, 
            async (req, res, next) => {
  try {
    //console.log('modUserInfo ---------------', res.locals.data, res.locals.data.uid)
    
    // check body
   // checkSchema(res.locals.data.uid, uidValueSchema, "/modUserInfo");
   // checkSchema(req.body, addPerfilSchema, "/modUserInfo");

    // Input's
    let uid = res.locals.data.uid;
	
    let userName = req.body.userName; // tomamos [nombre]
    //let instagram = req.body.instagram; // tomamos [nombre]
    //let whatsApp = req.body.whatsApp; // tomamos [nombre]
    let descrip = req.body.descrip; // tomamos [nombre]

	// Exist User (?)
	let user_exist = await getPerfilUser("perfil" ,uid);

  let docPerfilUser , data = {};

	if (user_exist.length === 0) {

		// id User
		let idUser = uuid.generate();

    //whatsApp = whatsApp.slice(10);

		// Doc
		docPerfilUser = {
		  objectID: uid,
		  idUser: idUser,
		  uid: uid,
		  userName: userName,
		//  instagram: instagram,
		//  whatsApp: whatsApp,
		  descrip: descrip,
		  _tags : [idUser , /*whatsApp ,*/ uid],
		  createdOn: new Date().getTime()
		};

    data = await addPerfilUser("perfil", docPerfilUser);

	} else {
		
    let [ user ] = user_exist;

		// Doc
		docPerfilUser = {
		  objectID: user.uid,
		  userName: userName,
		 // instagram: instagram,
		 // whatsApp: whatsApp,
		  descrip: descrip,
		  _tags : [user.idUser , /*whatsApp ,*/ user.uid],
		  updateOn: new Date().getTime()
		};

  	data = await updatePerfilUser("perfil", docPerfilUser);
		
	}
	
    //----------
    //  Front
    //----------

    // Respuesta al Front
    res.locals.responseSend = { message: data };
    res.locals.responseCode = 200;

    // call the responseÂ´s log middleware
    next();

  } catch (e) {
    // call the Error middleware
    next(e);
  }
}); // sessionOwn


//----------------------------------
//----------------------------------

module.exports.routerUser = router;
