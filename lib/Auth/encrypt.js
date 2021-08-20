// const NodeRSA = require('node-rsa');
const forge = require("node-forge");
const { customError } = require("./../error/error.js");


let privateKey = `-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----`;

let publicKey = `-----BEGIN PUBLIC KEY-----
-----END PUBLIC KEY-----`;

// ----

//------------
// ENCRYPTION
//------------

const getPublicKey = () => {
  return publicKey;
};

const getPrivateKey = () => {
  return privateKey;
};

const createKeyPairs = () => {
  const keys = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  //console.log('Key-pair created.');

  // PEM-format keys and cert
  privateKey = forge.pki.privateKeyToPem(keys.privateKey);
  publicKey = forge.pki.publicKeyToPem(keys.publicKey);

  //console.log( 'privateKey' , privateKey , 'publicKey' , publicKey )

};

// this function is used to desencrypt
const decryptData = text => {
  try {
    // const key = new NodeRSA(privateKey);
    // return key.decrypt(text, 'utf8');

    // convert a PEM-formatted public key to a Forge public key
    const key = forge.pki.privateKeyFromPem(privateKey);
    return key.decrypt(forge.util.decode64(text));
  } catch (e) {
    throw customError("Error ao descriptografar", "decryptData", 500, e);
  }
};

// this function is used to encrypt
const encryptData = text => {
  try {
    // const key = new NodeRSA(publicKey);
    // return key.encrypt(text, 'base64');

    // convert a PEM-formatted public key to a Forge public key
    const key = forge.pki.publicKeyFromPem(publicKey);
    return forge.util.encode64(key.encrypt(text));
  } catch (e) {
    throw customError("Error ao criptografar", "encryptData", 500, e);
  }
};

module.exports.decryptData = decryptData;
module.exports.encryptData = encryptData;
module.exports.getPublicKey = getPublicKey;
module.exports.getPrivateKey = getPrivateKey;
module.exports.createKeyPairs = createKeyPairs;

// module.exports.getFormatImage = getFormatImage;
