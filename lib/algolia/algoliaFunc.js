const { Algolia } = require("./algoliaConfig.js");

const { customError } = require("./../error/error.js");

//--------------------------
//--------------------------

const selectStorieID = async (index, ID) => {
  try {
    // Conection Algolia
    const indexs = Algolia.createConection();

    //const item = await indexs[index].getObject( String(ID) );
    //return item.status === 404 ? {} : item;

    // Get Doc's
    let filterGet = '_tags:' + ID;
    
    const { nbHits : numHists , hits : item } = await indexs[index].search( { filters: filterGet } );

    return (numHists === 0) ? {} : item;
          
  } catch (e) {
    throw customError("Error Algolia", "selectStorieID", 500, e);
  }
};

//-------
// FIND
//-------

const selectItemsAL = async (index, uid , query = "") => {
  try {
    // Conection Algolia, retorna el index de historias
    const indexs = Algolia.createConection();
    console.log("indexs:: "+index+ " -> " +indexs[index]);
    // Get Doc's
    let filterGet = '_tags:' + uid;
    
    const { nbHits : numHists , hits : data } = await indexs[index].search( query , { filters: filterGet } );

    return (numHists === 0) ? [] : data;

    //return indexs[index].search( query , { filters: filterGet } );
          
  } catch (e) {
    throw customError("Error Algolia", "selectItemsAL", 500, e);
  }
};


const selectPagnAL = async (index, query = "", page = 0, hitsPerPage = 10, filterDate=false) => {
  try {
    console.log("page : "+ page);
    console.log("hitsPerPage : "+ hitsPerPage);
    console.log("index : "+ index);
    console.log("filterDate : "+filterDate);
    // Conection Algolia
    const indexs = Algolia.createConection();
    console.log(`indexs index ${indexs.index}`);
    //console.log(`indexs mostLiked ${indexs[mostLiked]}`);
    // Get Doc's
    let props = {hitsPerPage, page};
    if(query.length>0) props.facets = ['*'];
    if(filterDate) {
      const d = new Date();
      props.filters = `createdOn > ${Math.floor(d.setDate(d.getDate() - 7) / 1000)}`
    }

    return await indexs[index].search(query,
      props
          //    {
          //  // query,
          //  // page,
          //   hitsPerPage: 10,
          //   page: page
          //    }
          );
  } catch (e) {
    throw customError("Error Algolia", "selectPagnAL", 500, e);
  }
};

//-------
// ADD
//-------
const addRecordAL = async (index, record) => {
  try {
    // Conection Algolia
    const indexs = Algolia.createConection();
    // Get Doc's
    //return indexs[index].addObject(record);]
    return indexs[index].saveObject(record);
  } catch (e) {
    throw customError("Error Algolia", "addRecordAL", 500, e);
  }
};

//-------
// UPDATE
//-------
const updateRecordAL = async (index, record) => {
  try {
    // Conection Algolia
    const indexs = Algolia.createConection();
    console.log("index "+ index);
    console.log("indexs[index] "+indexs[index]);
    // Get Doc's
    return indexs[index].partialUpdateObject(record);
  } catch (e) {
    throw customError("Error Algolia", "updateRecordAL", 500, e);
  }
};

//-------
// DETELE 
//-------

const removeRecordAL = async (index, objectID) => {
  try {
    // Conection Algolia
    const indexs = Algolia.createConection();

    // Get Doc
    //return await indexs[index].deleteObject(objectID);
    let filterDelete = '_tags:' + objectID;
    console.log("indexs[index] "+ indexs[index]);
    console.log("filterDelete "+ filterDelete);

    return indexs[index].deleteBy({ filters: filterDelete })

  } catch (e) {
    throw customError("Error Algolia", "removeRecordAL", 500, e);
  }
};

const removeRecordsAL = async (index, objectID) => {
  try {
    // Conection Algolia
    const indexs = Algolia.createConection();

    // Delete Doc's
    let filterDelete = '_tags:' + objectID;
    
    return indexs[index].deleteBy({ filters: filterDelete })

  } catch (e) {
    throw customError("Error Algolia", "removeRecordAL", 500, e);
  }
};

//-------------------------------------------------
//-------------------------------------------------

module.exports.selectItemsAL = selectItemsAL;
module.exports.selectPagnAL = selectPagnAL;
module.exports.addRecordAL = addRecordAL;
module.exports.removeRecordAL = removeRecordAL;
module.exports.removeRecordsAL = removeRecordsAL;
module.exports.updateRecordAL = updateRecordAL;
module.exports.selectStorieID = selectStorieID;

