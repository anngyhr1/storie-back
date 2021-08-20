
const { selectItemsAL , selectItemID } = require("./../algolia/algoliaFunc.js");
const { customError } = require("./../error/error.js");

const { saveInfo } = require("./../storage/helper.js");

//-------------------------
//-------------------------

const adminStorie = async idAdmin => {
  try {

    let idAdminFront = idAdmin;

    saveInfo("idAdminFront", idAdminFront);

    const storieAdmin = await selectItemsAL("stories" , idAdminFront);

   // saveInfo("storeAdmin", storeAdmin);

    if (storeAdmin.length > 0) {

      return { status: 1, data: storieAdmin[0] };

    } else if (storeAdmin.length === 0) {

      return { status: 2 };

    } else {

      return { status: 0 };

    }

  } catch (e) {
    if (!e.method) {
      throw customError("Error validation idAdmin", "adminStore", 400, e);
    } else {
      throw e;
    }
  }
};

//-------------------------
//-------------------------

module.exports.adminStorie = adminStorie;
