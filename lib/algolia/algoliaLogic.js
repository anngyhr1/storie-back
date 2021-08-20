// generador de UUID shortid
const uuid = require("shortid");

// const { 
//         deleteImageFS, 
//         uploadImageFS  
//       } = require("./../DB/fireStore/dbFunctions.js");

const { selectItemsAL, 
        addRecordAL, 
        updateRecordAL, 
        removeRecordAL, 
        removeRecordsAL, 
        selectPagnAL } = require("./algoliaFunc.js");

const config = require("./../config/config.js");

const { saveInfo, getAllInfo } = require("../storage/helper.js");

const { customError } = require("./../error/error.js");

//-----------------------------
//-----------------------------

// const deleteItemsAll = async (collChild, objectID) => {
//   try {

//     const items = await selectItemsAL(collChild, objectID);

//     saveInfo("removeRecordsAL - Items to Delete", items);

//     //-------------------------------------
//     //  Delete Item's Imagen storageFirebase
//     //-------------------------------------

//     items.forEach((doc , index) => {
//       removeFile(doc.imgItem_url);
//       //const removeFL = await removeFile(doc.file);
//       //saveInfo(`removeFile ${doc.objectID}`, removeFL);
//     });

//     //-------------------------
//     //  Delete Items Algolia
//     //-------------------------

//     const removeRecords = await removeRecordsAL(collChild, objectID);

//     saveInfo("removeRecordsAL - Items", removeRecords);

//     return "ok"

//   } catch (e) {
//     throw customError("Error", "deleteItemsAll", 500, e);
//   }
// }


//--------
// Store
//--------

const addStorie = async (coll, doc) => {
  try {

    // Add Item to Algolia
    const addRecord = await addRecordAL(coll, doc);

  //  saveInfo("addRecordAL", addRecord);

    return "ok"

  } catch (e) {
    throw customError("Error", "addStore", 500, e);
  }
}

const updateStorie = async (coll, data) => {
  try {

    // Update Item at algolia
    const addRecord = await updateRecordAL(coll, data);

   // saveInfo("updateRecordAL", addRecord);

    return "ok"

  } catch (e) {
    throw customError("Error", "updateStore", 500, e);
  }
}

const deleteStorie = async (collParent, objectID) => {
  try {

    // Delete Doc at algolia
    const removeRecord = await removeRecordAL(collParent, objectID);

   // saveInfo("removeRecordAL - Store", removeRecord);

    // Find the Itmes where its games field is equal to objectID of parent
   // const deleteItems = await deleteItemsAll(collChild, objectID);

   // saveInfo("deleteItemsAll", deleteItems);

    return "ok"

  } catch (e) {
    throw customError("Error", "deleteStore", 500, e);
  }
}



//--------
// Seach
//--------


const searchPagAL = async (coll, query, page, filterDate) => {
  try {
    const { hits: result } = await selectPagnAL( coll, 
                                                query, 
                                                page,
                                                config.get("hitsPerPage.max"),
                                                filterDate );

    console.log("result: "+result);
    let items=[];
    

    result.forEach(item => {
      delete item.uid;
      delete item._tags;
      delete item._highlightResult;
      delete item.createdOn;
      delete item.objectID;

      items.push( item );

    });

    return items

  } catch (e) {
    throw customError("Error", "searchPagAL", 500, e);
  }
}

const getAllRecordsUserAL = async (collParent, collPerfil, uid) => {
  try {


    //-------------------
    // Get Stores User
    //-------------------

    // get all games of user
    const storieP = selectItemsAL(collParent, uid);

    //-------------------
    // Find Perfil User
    //-------------------

    // get all savegames of user
    const userP = selectItemsAL(collPerfil, uid);

    //----------
    // Promesas
    //----------

    // const promesas
    const promesas = [];

    // Push promesas
    promesas.push(storieP);
    promesas.push(userP);

    const all = await Promise.all(promesas);

    // solve promesas
    const [ userStories , userInfo ] = all;

    //----------------
    // Stores & Items
    //----------------
	
    let misstories = [];

	if ( userStories.length === 0 ) {

		misstories.push({ storie: [] });

	}else{

		userStores.forEach(store => {
		  delete storie.uid;
		  delete storie._tags;
		  delete storie._highlightResult;
		  delete storie.objectID;

		  misstories.push({ storie: storie });

		});
		
	}
	
    //----------------
    // Perfil
    //----------------

	let userPerfil = {};

	if ( userInfo.length === 0 ) {

	}else{
	
		userPerfil = userInfo.map(item => {
			delete item.uid;
			delete item._tags;
			delete item._highlightResult;
			delete item.objectID;
			delete item.createdOn;
			delete item.updateOn;

			return item;
		  });

      userPerfil = userPerfil[0]

	}

    return { misstories : misstories , userPerfil : userPerfil };
    
  } catch (e) {
    throw customError("Error", "getAllRecordsUserAL", 500, e);
  }
}

const getPerfilUser = async (collPerfil, uid) => {
  try {

    // Get Perfil User
    let userPerfil = await selectItemsAL(collPerfil, uid);

    userPerfil = userPerfil.map(perfil => {
      delete perfil._tags;
      delete perfil._highlightResult;
      delete perfil.createdOn;

      return perfil;
    });

    return userPerfil;
    
  } catch (e) {
    throw customError("Error", "getPerfilUser", 500, e);
  }
}


const addPerfilUser = async (coll, doc) => {
  try {

    // Add Item to Algolia
    const data = await addRecordAL(coll, doc);

    saveInfo("addRecordAL", data);

    return "ok"

  } catch (e) {
    throw customError("Error", "addPerfilUser", 500, e);
  }
}


const updatePerfilUser = async (coll, doc) => {
  try {

    // Update Item at algolia
    const data = await updateRecordAL(coll, doc);

    saveInfo("addRecordAL", data);

    return "ok"

  } catch (e) {
    throw customError("Error", "updatePerfilUser", 500, e);
  }
}

//------------------------------
//------------------------------

module.exports.addStorie = addStorie;
module.exports.updateStorie = updateStorie;
module.exports.deleteStorie = deleteStorie;

module.exports.searchPagAL = searchPagAL;
module.exports.getAllRecordsUserAL = getAllRecordsUserAL;
