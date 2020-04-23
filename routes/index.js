const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

// Export router so that it can be used by server.js
module.exports = router;
