const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// http://localhost:4000/list/me
router.get("/", (req, res, next) => {
  // Get all the items
  Member.find()
    .then((memberDocuments) => {
      res.status(200).json(memberDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/list/me
router.post("/", (req, res, next) => {
  // Create a item
  Member.create(req.body)
    .then((memberDocument) => {
      res.status(201).json(memberDocument);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
