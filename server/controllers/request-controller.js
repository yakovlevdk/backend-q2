const Request = require("../models/Request");

async function getRequests() {
  const requests = await Request.find();
  return requests;
}

async function addRequest(body) {
  await Request.create(body);
}

module.exports = { getRequests, addRequest };
