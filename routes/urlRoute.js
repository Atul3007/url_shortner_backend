const express = require("express");
const { updateURL } = require("../controller/urlController");


const urlrouter = express.Router();

//urlrouter.get("/all-banner", getbannerController);
urlrouter.get("/shorten", updateURL);

module.exports = {
  urlrouter,
};
