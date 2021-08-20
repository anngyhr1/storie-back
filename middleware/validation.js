const { selectItemsAL, selectItemID } = require("./../lib/algolia/algoliaFunc.js");

const { customError } = require("./../lib/error/error.js");

const config = require("./../lib/config/config.js");

const { checkSchema } = require('./../lib/joi/helpers.js');

const {
  idStorieValueSchema,
} = require('./../lib/joi/schemas.js');

const { saveInfo } = require("./../lib/storage/helper.js");

//-----------------------------------------
//-----------------------------------------

const existStorie = async (req, res, next) => {
  try {

    // check Inputs
  checkSchema(req.body.idStorie, idStorieValueSchema, "/existStorie");

    const objectID = req.body.idStorie; // tomamos [idShop]

    //-------------------
    // Get Item Algolia
    //-------------------

    // get Item
    const storie = await selectItemID("storie", objectID);

    if ( Object.keys(storie).length > 0 ) {
      next();
    } else {

      throw customError(
        "store dont exist :(",
        "existStore",
        419,
        null,
        new Error().stack
      );

    }

  } catch (e) {
    // errorHandler(e, req, res);
    next(e);
  }
};

module.exports.existStorie = existStorie;
