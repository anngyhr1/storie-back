const { AsyncLocalStorage } = require("async_hooks");
const { v4: uuidv4 } = require('uuid');

// singleton storage
module.exports.asyncLocalStorage = new AsyncLocalStorage();