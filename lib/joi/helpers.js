const { customError } = require("./../error/error.js");

//-----------------------------------------
//-----------------------------------------

const checkSchema = (data, schema, method) => {
  const { error: err } = schema.validate(data)
  if (err) {
    throw customError(
        "Error Payload", method || "checkSchema", 400, err);
  }
}


//-----------------------------------------
//-----------------------------------------

module.exports.checkSchema = checkSchema;