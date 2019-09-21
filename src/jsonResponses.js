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
    // return respond(request, response, status, responseXML, 'text/xml');
  } else {
    const objectString = JSON.stringify(content);
    // return respond(request, response, status, objectString, 'application/json');

    response.writeHead(status, { 'Content-Type': type });
    response.write(objectString);
    response.end();
  }
};

// const respondJSON = (request, response, status, object) => {
//   // const headers = {
//   //   'Content-Type': 'application/json',
//   // };
//   // response.writeHead(status, headers);
//   // response.write(JSON.stringify(object));
//   // response.end();
// };

// const respondXML = (request, response, status, object) => {

// };

// const sortResponse = (request, response, status, responseJSON, acceptedTypes) => {
// // console.dir(acceptedTypes[0]);
//   if (acceptedTypes[0] === 'text/xml') {
//   // console.dir('xml');
//     return respond(request, response, status, responseJSON);
//   }
//   const objectString = JSON.stringify(responseJSON);
//   return respond(request, response, status, objectString, 'application/json');
// };

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'successResponse',
  };
  return respond(request, response, 200, responseJSON, acceptedTypes);
};


const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Successful response with parameters',
    id: 'successParameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badResponse';

    return respond(request, response, 400, responseJSON, acceptedTypes);
  }

  return respond(request, response, 200, responseJSON, acceptedTypes);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Successful response with parameters',
    id: 'successWithParamsAuthorized',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing logedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respond(request, response, 400, responseJSON, acceptedTypes);
  }

  return respond(request, response, 200, responseJSON, acceptedTypes);
};


const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'youShallNotPass',
  };
  return respond(request, response, 403, responseJSON, acceptedTypes);
};


const internalError = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'youShallNotPass',
  };
  return respond(request, response, 500, responseJSON, acceptedTypes);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };
  return respond(request, response, 501, responseJSON, acceptedTypes);
};


const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'the page you are looking for is not found',
    id: 'notFound',
  };
  return respond(request, response, 404, responseJSON, acceptedTypes);
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
