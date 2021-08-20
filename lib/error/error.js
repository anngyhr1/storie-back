//----------
// ERROR
//----------

// this function is used to create a custom error object
const customError = (message, method, statusCode, err, stack) => {
  const e = new Error();
  e.message = message;
  e.method = method;
  e.statusCode = statusCode;
  e.stack = err ? err.stack : stack;
  e.original = err;
  return e;
};

//-----------------------------------------
//-----------------------------------------

module.exports.customError = customError;
