/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// const urlStruct = {
//   GET: {
//     '/': htmlHandler.getIndex,
//     '/style.css': htmlHandler.getCSS,
//     '/success': jsonHandler.success,
//     '/badRequest': jsonHandler.badRequest,
//     '/unauthorized': jsonHandler.unauthorized,
//     '/forbidden': jsonHandler.forbidden,
//     '/internal': jsonHandler.internalError,
//     '/notImplemented': jsonHandler.notImplemented,
//     notFound: jsonHandler.notFound,
//   },
//   HEAD: {
//     '/success': jsonHandler.successMeta,
//     '/badRequest': jsonHandler.badRequestMeta,
//     '/unauthorized': jsonHandler.unauthorizedMeta,
//     '/forbidden': jsonHandler.forbiddenMeta,
//     '/internal': jsonHandler.internalErrornMeta,
//     '/notImplemented': jsonHandler.notImplementedMeta,
//     notFound: jsonHandler.notFoundMeta,
//   },
// };

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  const acceptedTypes = request.headers.accept.split(',');

  // console.dir(request.method);
  // console.dir(`parsed url ${parsedUrl}`);
  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
      jsonHandler.success(request, response, acceptedTypes);
      break;
    case '/badRequest':
      console.dir(`params ${params.valid}`);
      jsonHandler.badRequest(request, response, acceptedTypes, params);
      break;
    case '/unauthorized':
      jsonHandler.unauthorized(request, response, acceptedTypes, params);
      break;
    case '/forbidden':
      jsonHandler.forbidden(request, response, acceptedTypes);
      break;
    case '/internal':
      jsonHandler.forbidden(request, response, acceptedTypes);
      break;
    case '/notImplemented':
      jsonHandler.notImplemented(request, response, acceptedTypes);
      break;
    case '/notFound':
      jsonHandler.notFound(request, response, acceptedTypes);
      break;
    default:
      htmlHandler.getIndex(request, response, acceptedTypes);
      break;
  }

  // if (urlStruct[request.method][parsedUrl.pathname]) {
  //   urlStruct[request.method][parsedUrl.pathname](request, response, params);
  // } else {
  //   urlStruct.GET.notFound(request, response);
  // }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
