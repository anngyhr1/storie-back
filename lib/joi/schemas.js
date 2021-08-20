
const Joi = require("joi");

const config = require("./../config/config.js");


const idTokenSchema = Joi.string()
                         .required()
                         .max( config.get("joi.idToken") );

const uidValueSchema = Joi.string().required().max( config.get("joi.uid") );

// const UIDSchema = Joi.object({
//     uid: Joi.string().required().max( config.get("joi.uid") ),
//     iat: Joi.number().optional(),
//     exp: Joi.number().optional(),
//     idShop: Joi.number().optional()
// }).required();

//-----------
// STORIE
//-----------

const idStorieValueSchema = Joi.string()
                              .required()
                              .max( config.get("joi.12") );

const addStorieSchema = Joi.object({
    titulo: Joi.string().alphanum().max( config.get("joi.50") ).required(),
    cuerpo: Joi.string().alphanum().min( config.get("joi.1000") ).required(),
    categorias: Joi.array().items(Joi.string().required(), Joi.string().required()),
}).required();

const updateStorieSchema = Joi.object({
    idStorie: Joi.string().required().max( config.get("joi.12") ),
    titulo: Joi.string().alphanum().max( config.get("joi.50") ).required(),
    cuerpo: Joi.string().alphanum().min( config.get("joi.1000") ).required(),
    categorias: Joi.array().items(Joi.string().required(), Joi.string().required()),
}).required();

const deleteStorieSchema = Joi.object({
    idStorie: Joi.string().required().max( config.get("joi.12") )
}).required();

//-----------
// PERFIL
//-----------

const addPerfilSchema = Joi.object({
    userName: Joi.string().required().max( config.get("joi.100") ),
}).required();

//-----------
// ID Admin
//-----------

// const loginIdAdminSchema = Joi.object({
//     idShop: Joi.string().required().max( config.get("joi.12") ),
//     uid: Joi.string().optional(),
//     iat: Joi.number().optional(),
//     exp: Joi.number().optional()
// }).required();

//-----------------------------------------
//-----------------------------------------

module.exports = {
    idTokenSchema,
    uidValueSchema,
    idStorieValueSchema,
    updateStorieSchema,
    deleteStorieSchema,
    addStorieSchema,
    addPerfilSchema,
}