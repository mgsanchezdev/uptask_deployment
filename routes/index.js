const express = require("express");
const router = express.Router();

module.exports = function () {
  //Route to home
  router.get("/", (req, res) => {
    res.json("Index");
  });
  return router;
};
