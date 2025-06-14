const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTH_ERROR = 401;
const UNAUTHORIZED = 401; // Added this line
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409; // Added this line
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;
// Error messages
const BAD_REQUEST_MESSAGE = "Invalid request data";
const UNAUTH_MESSAGE = "Authorization required";
const FORBIDDEN_MESSAGE = "Forbidden";
const NOT_FOUND_MESSAGE = "Requested resource not found";
const CONFLICT_MESSAGE = "Resource already exists";
const DEFAULT_SERVER_ERROR_MESSAGE = "An error occurred on the server";

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTH_ERROR,
  UNAUTHORIZED, // Added this line
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT, // Added this line
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  UNAUTH_MESSAGE,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE,
  CONFLICT_MESSAGE,
  DEFAULT_SERVER_ERROR_MESSAGE,
};
