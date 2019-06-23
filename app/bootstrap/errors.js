const GenericError = require('@app/errors/GenericError');
const ValidationError = require('@app/errors/ValidationError');
const UnauthorizedError = require('@app/errors/UnauthorizedError');
const ModelNotFoundError = require('@app/errors/ModelNotFoundError');
const ForbiddenAccessError = require('@app/errors/ForbiddenAccessError');



const handle = (err, req, res, next) => {
  switch (err.constructor) {
    case UnauthorizedError:
      return res.error(err, 401);

    case ValidationError:
      return res.error(err, 422);

    case ForbiddenAccessError:
      return res.error(err, 403);

    case ModelNotFoundError:
      return res.error(err, 404);

    case GenericError:
      return res.error(err, 400);

    default:
      console.log(err);
      return res.error(err, 500);
  }
};

module.exports = {
  handle,
};
