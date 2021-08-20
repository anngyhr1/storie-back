const { asyncLocalStorage } = require("./storage.js");

const saveInfo = (key, value) => {
  asyncLocalStorage.getStore()[key] = value;
}

const getInfo = (key) => {
  return asyncLocalStorage.getStore()[key];
}

const getAllInfo = () => {
  return asyncLocalStorage.getStore();
}

module.exports = {
  saveInfo,
  getInfo,
  getAllInfo
};