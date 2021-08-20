// Firebase admin
const admin = require("firebase-admin");
// credentials Firebase
const serviceAccount = require("./key/serviceAccountKey.json");
//const SDK_Firebase = require("./key/SDK.json");

const { customError } = require("./../error/error.js");

// Class Firebase
class Firebase {
  static getConection() {
    try {
      // retirn the Firebase object
      return {
        auth: this._auth
      };
    } catch (e) {
      throw customError("Error Firebase", "getConection", 500, e);
    }
  }

  // this function create Firebase object if it dont exist yet
  static createConection() {
    try {
      //if (this._db && this._storageFirebase && this._auth) {
      if (this._auth) {  
        return Firebase.getConection();
      }

      // initialize firebase
//      admin.initializeApp({
//        credential: admin.credential.cert(serviceAccount),
//       apiKey: SDK_Firebase.apiKey,
//        projectId: SDK_Firebase.projectId,
//       storageBucket: SDK_Firebase.storageBucket
//      });
      console.log("llamo a admin.initializeApp()");
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      const settings = { timestampsInSnapshots: true };
      admin.firestore().settings(settings);

      // fireStore DB
      this._db = admin.firestore();

      // auth object
      this._auth = admin.auth();

      return {
        auth: this._auth
      };
    } catch (e) {
      throw customError("Error Firebase", "createConection", 500, e);
    }
  }
}

module.exports.Firebase = Firebase;
