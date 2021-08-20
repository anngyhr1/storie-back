const express = require("express");
const { SelectAllFS } = require("../../lib/firestore/dbFunctions");

const uuid = require("shortid");

const { addStorie, 
  deleteStorie,
  updateStorie} = require("../../lib/algolia/algoliaLogic.js");

const { sessionApp } = require("./../../middleware/session.js");
const { existStorie } = require("./../../middleware/validation.js");

const {
  uidValueSchema,
  addStorieSchema,
  updateStorieSchema,
  idStorieValueSchema,
} = require('./../../lib/joi/schemas.js');


const { checkSchema } = require('./../../lib/joi/helpers.js');

const router = express.Router();

// // router.get("/getAllStories",
// // async (req, res, next) => {
// //     try {
// //         const stories = await SelectAllFS("historias");

// //         stories_map = {};

// //         stories.forEach(doc => {
// //             console.log(doc.id, '=>', doc.data());
// //             stories_map[doc.id] = doc.data();
// //           });
    
// //         res.locals.responseSend = { message: "ok", data: stories_map };
// //         res.locals.responseCode = 200;

// //         next();
// //     } catch (e) {
// //         //console.log('Error occurred');
// //         // call the Error middleware
// //         next(e);
// //       }
// // });

router.post("/addStorie", 
            // sessionApp, 
            async (req, res, next) => {
  try {

    console.log("IN addStorie");
    // check body
   // checkSchema(res.locals.data.uid, uidValueSchema, "/addStorie");
  //  checkSchema(req.body, addStorieSchema, "/addStore");

    // Input's
 //   let uid = res.locals.data.uid; // tomamos la uid del user, esta info estava dentro del token
    let title = req.body.title; 
    let text = req.body.text;
    let author = req.body.author;
    let image = req.body.image;
    let categories = req.body.categories;

    // id Shop
    let idStorie = uuid.generate();

    // Doc
    const docStorie = {
      objectID: idStorie,
      idStorie: idStorie,
     // uid: uid,
      title: title,
      text: text,
      author: author,
      image: image,
      categories: categories,
      views: 0,
      rate: 0,
      //urlStorePublic: urlStorePublic,
      _tags : [idStorie /*, uid*/],// busquedas x uid (id usuario) y idStorie
      createdOn: Math.floor(new Date().getTime() / 1000)
    };

    //-----------------
    //  Add Store Doc
    //-----------------

    const data = await addStorie("stories", docStorie);


    //----------
    //  Front
    //----------

    delete data.idAdmin;
    delete data.uid;
    delete data.createdOn;

    // Respuesta al Front
    res.locals.responseSend = { message: data , data: docStorie };
    res.locals.responseCode = 200;

    // call the responseÂ´s log middleware
    next();

  } catch (e) {
    // call the Error middleware
    next(e);
  }
}); // sessionOwn

router.post("/modStorie", 
            sessionApp,
            existStorie,
            async (req, res, next) => {
  try {

    // check body
  checkSchema(req.body, updateStorieSchema, "/modStore");

    // Input's
    let objectID = req.body.idStorie; // tomamos [idShop]
    let titulo = req.body.titulo;
    let categoria = req.body.categoria;
    let cuerpo = req.body.cuerpo;

    const docStorie = {
      objectID,
      titulo,
      categoria,
      cuerpo,
      updateOn: new Date().getTime()
    };
    //--------------------
    //  Update Store Doc
    //--------------------

    let data = await updateStorie("stories", docStorie);

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
});

router.post("/deleteStorie", 
            sessionApp, 
            existStorie,
            async (req, res, next) => {
  try {

    // check body
    checkSchema(req.body.idShop, idStorieValueSchema, "/deleteShop");
    
    // Input
    let objectID = req.body.idStorie; // tomamos [idShop]

    //-------------------------
    //  Delete store
    //-------------------------

    let data = await deleteStorie("stories", objectID);

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
}); 

module.exports.routeStorie = router;