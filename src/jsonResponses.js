/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
// Note this object is purely in memory

const respond = (request, response, status, content, type) => {
  if (type[0] === 'text/xml') {
    // console.dir('xml');
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${content.message}</message>`;
    responseXML = `${responseXML}</response>`;
    console.dir(responseXML);

    response.writeHead(status, { 'Content-Type': type });
    response.write(responseXML);
    response.end();
  } else {
    const objectString = JSON.stringify(content);

    response.writeHead(status, { 'Content-Type': type });
    response.write(objectString);
    response.end();
  }
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'successResponse',
  };
  console.dir(acceptedTypes[0]);
  return respond(request, response, 200, responseJSON, acceptedTypes[0]);
};


const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Successful response with parameters',
    id: 'successParameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badResponse';

    return respond(request, response, 400, responseJSON, acceptedTypes[0]);
  }

  return respond(request, response, 200, responseJSON, acceptedTypes[0]);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Successful response with parameters',
    id: 'successWithParamsAuthorized',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing logedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respond(request, response, 400, responseJSON, acceptedTypes[0]);
  }

  return respond(request, response, 200, responseJSON, acceptedTypes[0]);
};


const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'youShallNotPass',
  };
  return respond(request, response, 403, responseJSON, acceptedTypes[0]);
};


const internalError = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'youShallNotPass',
  };
  return respond(request, response, 500, responseJSON, acceptedTypes[0]);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };
  return respond(request, response, 501, responseJSON, acceptedTypes[0]);
};


const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'the page you are looking for is not found',
    id: 'notFound',
  };
  return respond(request, response, 404, responseJSON, acceptedTypes[0]);
};


module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
  notFound,
};
