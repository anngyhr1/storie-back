const express = require("express");

const {
  sessionLogin
} = require("./../../middleware/session.js");

const { searchPagAL } = require("./../../lib/algolia/algoliaLogic.js");
const { config } = require("firebase-functions");

const router = express.Router();

//-----------------------------------
//-----------------------------------

// Login User using google
router.get("/search", async (req, res, next) => {
  try {

    // filter [{f: "uid", o: "==", v: "1"}] 
    const query = req.query.q || "";
    const page = req.query.page || 0;
    const index = req.query.index || "";
    const filterDate = req.query.filterDate || false;
    console.log("/search - page : "+ page);

    //const data = await searchPagAL("stories", query, page);
    const data = await searchPagAL(index, query, page, filterDate);

    // Respuesta al Front
    res.locals.responseSend = {
      message: "Search",
      data
    };

    res.locals.responseCode = 200;
    // call the responseÂ´s log middleware
    next();
  } catch (e) {
    // call the Error middleware
    next(e);
  }
});

//----------------------------------
//----------------------------------

module.exports.routerSearch = router;
