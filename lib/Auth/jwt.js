const jwt = require("jsonwebtoken");
const { Firebase } = require("./../firebase/firebaseConfig.js");
const { customError } = require("./../error/error.js");
const config = require("./../config/config.js");
const { getPublicKey, getPrivateKey } = require("./encrypt.js");

//--- jwt

const jwtSign = payload => {
  try {
    return jwt.sign(payload, getPrivateKey(), {
      algorithm: config.get("jwtSign.algorithm"),
      expiresIn: config.get("jwtSign.expiresIn")
    });
  } catch (e) {
    throw customError("Error ao jwtSign", "jwtSign", 500, e);
  }
};

const jwtVerify = (token, uid) => {
  try {
    const decodedToken = jwt.verify(token, getPublicKey(), {
      algorithm: config.get("jwtSign.algorithm")
    });

    //console.log('decodedToken',decodedToken);

    return { status: 1, data: decodedToken };
  } catch (e) {
    if (e.name && ["TokenExpiredError", "JsonWebTokenError"].includes(e.name)) {
      return false;
    } else {
      throw customError("Error ao jwtVerify", "jwtVerify", 500, e);
    }
  }
};

const validateTokenGoogle = async token => {
  try {
    // auth firebase
    const { auth } = Firebase.createConection();

    const decodedToken = await auth.verifyIdToken(token, true);
    //console.log('decodedToken',decodedToken);
    return { status: 1, data: decodedToken };
  } catch (e) {
    //console.log(e)
    throw customError("Error Auth Firebase", "validateTokenGoogle", 500, e);
  }
};

module.exports.validateTokenGoogle = validateTokenGoogle;
module.exports.jwtSign = jwtSign;
module.exports.jwtVerify = jwtVerify;
