const convict = require("convict");

//-----------------------------------------
//-----------------------------------------

// Define a schema
const config = convict({
  firebase: {
    timeoutSeconds: 15,
    memory: "256MB"
  },
  port: {
    ini: 5000
  },
  json: {
    limit: "3mb"
  },
  index: {
    appID : "",
    apiKey: "",
    stories: "dev_hist",
    perfil: "dev_perfil",
    mostLiked: "rating_desc",
    mostViewed: "views_desc"
  },
  bot: {
    dialogFlow: "dev-replit2",
    languageCode : {
      PT: "pt-BR",
      ES: "es"
    }
  },
  keyvDB: {
    expireSession: 60
  },
  hitsPerPage: {
    max: 10
  },
  jwtSign: {
    algorithm: "RS256",
    expiresIn: "6h"
  },
  uuid: {
    characters:
      "0123456789abcdefghijklmn@opqrstuvwxyzABCDEFGHIJKLMN&OPQRSTUVWXYZ"
  },
  upload: {
    rawBodyOptions: {
      limit: "2mb" //file size limit
    },
    busboyOptions: {
      limits: {
        fields: 20 //Number text fields allowed
      }
    }
  },
  joi:
  {
    zero : 0,
    10 : 10,
    12 : 12,
    20 : 20,
    50 : 50,
    100 : 100,
    140 : 140,
    200 : 200,
    300 : 300,
    1000 : 1000,
    uid : 28,
    wtp : 20,
    idToken : 2000,
    idAdmin : 10
  }
});

//-----------------------------------------
//-----------------------------------------

module.exports = config;