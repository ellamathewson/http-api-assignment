/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
// Note this object is purely in memory
const users = {};

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
  console.dir('success');
  const responseJSON = {
    message: 'This is a successful response',
    id: 'successResponse',
  };
  return respondJSON(request, response, 200, responseJSON);
};

const successMeta = (request, response) => respondJSONMeta(request, response, 200);

const updateUser = (request, response) => {
  const newUser = {
    createdAt: Date.now(),
  };

  users[newUser.createdAt] = newUser;
  return respondJSON(request, response, 201, newUser);
};

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
  updateUser,
  notFound,
  notFoundMeta,
};
