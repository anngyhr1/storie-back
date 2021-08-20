const { customError } = require("../error/error.js");
const { Firebase } = require("../firebase/firebaseConfig.js");
//const config = require("./../../config/config.js");

// generador de UUID shortid
const uuid = require("shortid");
//uuid.characters(config.get("uuid.characters"));

//--------------------------
//--------------------------

const SelectAllFS = async (coll, f, o, v) => {
  try {
    // Conection DB
    const { db } = Firebase.createConection();

    // Get Doc's
    return await db
      .collection(coll)
      .get();

  } catch (e) {
    throw customError("Error Firebase", "SelectDocWhereFS", 500, e);
  }
};

//-------
// FIND
//-------
// Select Doc's
const SelectDocWhereFS = async (coll, f, o, v) => {
  try {
    // Conection DB
    const { db } = Firebase.createConection();

    // Get Doc's
    return await db
      .collection(coll)
      .where(f, o, v)
      .get();
  } catch (e) {
    throw customError("Error Firebase", "SelectDocWhereFS", 500, e);
  }
};

//------
// ADD
//------

// Add Item FS
const addItemFS = async (coll, docu, data) => {
  try {
    // Conection DB
    const { db } = Firebase.createConection();

    // Add Doc -> store
    const store = await db
      .collection(coll)
      .doc(docu)
      .set(data);
  } catch (e) {
    throw customError("Error Firebase", "addItemFS", 500, e);
  }
};

//---------
// DELETE
//---------

// Delete Doc FS
const deleteDocFS = async (coll, docu) => {
  try {
    // Conection DB
    const { db } = Firebase.createConection();

    // Delete Doc
    await db
      .collection(coll)
      .doc(docu)
      .delete();
  } catch (e) {
    throw customError("Error Firebase", "deleteDocFS", 500, e);
  }
};

// Delete Batch Doc FS
const deleteBatchFS = data => {
  try {
    // Conection DB
    const { db } = Firebase.createConection();

    const batch = db.batch();

    // For each Item-doc, Add a delete operation to the batch
    data.forEach(doc => {
      batch.delete(doc.ref);
    });

    //----------------------------------
    //  Commit Batch Delete Doc Item's
    //----------------------------------

    // Once we get the results, begin a batch
    batch.commit();
  } catch (e) {
    throw customError("Error Firebase", "deleteBatchFS", 500, e);
  }
};

// Delete Imagen storage Firebase
const deleteImageFS = async filename => {
  try {
    // Conection DB
    const { storageFirebase } = Firebase.createConection();

    // Delete Image
    return storageFirebase.storage
      .bucket(storageFirebase.name)
      .file(filename)
      .delete();
      
  } catch (e) {
    throw customError("Error Firebase", "deleteImageFS", 500, e);
  }
};

//--------
// UPDATE
//--------

// Update Item
const updateItemFS = async (coll, docu, data) => {
  try {
    // Conection DB
    const { db } = Firebase.createConection();

    // Update Doc
    await db
      .collection(coll)
      .doc(docu)
      .update(data);
  } catch (e) {
    throw customError("Error Firebase", "updateItemFS", 500, e);
  }
};

// upload Image FS
const uploadImageFS = async file => {
  try {
    let nameFile = uuid.generate();

    // Conection DB
    const { storageFirebase } = Firebase.createConection();

    // name File
    const mimeType = file.originalname.split(".").pop();
    const bucketFile = storageFirebase.file(
      `images_qrShop/${nameFile}.${mimeType}`
    );

    // upload the image to firestorage
    await bucketFile.save(file.buffer, {
      metadata: { contentType: `image/${mimeType}` },
      public: true
    });

    return `https://storage.googleapis.com/${
      storageFirebase.name
    }/images_qrShop/${nameFile}.${mimeType}`;
  } catch (e) {
    //console.log(e);
    throw customError("Error Firebase", "uploadImageFS", 500, e);
  }
};

//-------------------------------------------------
//-------------------------------------------------
module.exports.SelectAllFS = SelectAllFS;
module.exports.SelectDocWhereFS = SelectDocWhereFS;
module.exports.uploadImageFS = uploadImageFS;
module.exports.updateItemFS = updateItemFS;
module.exports.deleteImageFS = deleteImageFS;
module.exports.deleteBatchFS = deleteBatchFS;
module.exports.deleteDocFS = deleteDocFS;
module.exports.addItemFS = addItemFS;
