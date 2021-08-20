const { asyncLocalStorage } = require("./../lib/storage/storage.js");
const { v4: uuidv4 } = require('uuid');
const {saveInfo} = require("./../lib/storage/helper.js");

// inicializa el localstore
const requestStorageMiddleware = async (req, res, next) => {
  // anizializa el storage para el actual request, con un object {}
  await asyncLocalStorage.run(new Object(), () => {
    // coloca un key requestId en el storage
    saveInfo('requestId', uuidv4());
    next();
  });
};

module.exports.requestStorageMiddleware = requestStorageMiddleware;
