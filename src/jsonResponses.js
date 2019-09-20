/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
// Note this object is purely in memory

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'successResponse',
  };
  return respondJSON(request, response, 200, responseJSON);
};

const successMeta = (request, response) => respondJSONMeta(request, response, 200);

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This is a successful response with required parameters',
    id: 'successWithParams',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badResponse';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const badRequestMeta = (request, response) => respondJSONMeta(request, response, 400);

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'Successful response with parameters',
    id: 'successWithParamsAuthorized',
  };

  if (!params.valid || params.valid !== 'true') {
    respondJSON.message = 'Missing logedIn query parameter set to yes';
    respondJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const unauthorizedMeta = (request, response) => respondJSONMeta(request, response, 401);

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'youShallNotPass',
  };
  return respondJSON(request, response, 403, responseJSON);
};

const forbiddenMeta = (request, response) => respondJSONMeta(request, response, 403);

const internalError = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'youShallNotPass',
  };
  return respondJSON(request, response, 500, responseJSON);
};

const internalErrornMeta = (request, response) => respondJSONMeta(request, response, 500);

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };
  return respondJSON(request, response, 501, responseJSON);
};

const notImplementedMeta = (request, response) => respondJSONMeta(request, response, 501);

const notFound = (request, response) => {
  const responseJSON = {
    message: 'the page you are looking for is not found',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  success,
  successMeta,
  badRequest,
  badRequestMeta,
  unauthorized,
  unauthorizedMeta,
  forbidden,
  forbiddenMeta,
  internalError,
  internalErrornMeta,
  notImplemented,
  notImplementedMeta,
  notFound,
  notFoundMeta,
};
