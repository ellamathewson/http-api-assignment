/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
// Note this object is purely in memory

const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// const respondJSON = (request, response, status, object) => {
//   // const headers = {
//   //   'Content-Type': 'application/json',
//   // };
//   // response.writeHead(status, headers);
//   // response.write(JSON.stringify(object));
//   // response.end();
// };

const respondXML = (request, response, status, object) => {
  let responseXML = '<response>';
  responseXML = `${responseXML}<message>${object.message}</message>`;
  responseXML = `${responseXML}</response>`;
  console.dir(responseXML);

  return respond(request, response, status, responseXML, 'text/xml');
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'successResponse',
  };

  // console.dir(acceptedTypes[0]);
  if (acceptedTypes[0] === 'text/xml') {
    // console.dir('xml');
    return respondXML(request, response, 200, responseJSON);
  }
  const objectString = JSON.stringify(responseJSON);
  return respond(request, response, 200, objectString, 'application/json');
};


const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Successful response with parameters',
    id: 'successParameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badResponse';

    if (acceptedTypes[0] === 'text/xml') {
      // console.dir('xml');
      return respondXML(request, response, 400, responseJSON);
    }
    const objectString = JSON.stringify(responseJSON);
    return respond(request, response, 400, objectString, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    // console.dir('xml');
    return respondXML(request, response, 400, responseJSON);
  }
  const objectString = JSON.stringify(responseJSON);
  return respond(request, response, 400, objectString, 'application/json');
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'Successful response with parameters',
    id: 'successWithParamsAuthorized',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing logedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respond(request, response, responseJSON, 'application/json');
  }

  return respond(request, response, responseJSON, 'application/json');
};


const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'youShallNotPass',
  };
  return respond(request, response, responseJSON, 'application/json');
};


const internalError = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'youShallNotPass',
  };
  return respond(request, response, responseJSON, 'application/json');
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };
  return respond(request, response, responseJSON, 'application/json');
};


const notFound = (request, response) => {
  const responseJSON = {
    message: 'the page you are looking for is not found',
    id: 'notFound',
  };
  return respond(request, response, responseJSON, 'application/json');
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

/*

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

const successMeta = (request, response) => respondJSONMeta(request, response, 200);


*/
