const express = require("express");
const { updateURL, getURL } = require("../controller/urlController");


const urlrouter = express.Router();

urlrouter.get("/:short-url", getURL);
urlrouter.post("/shorten", updateURL);

module.exports = {
  urlrouter,
};
