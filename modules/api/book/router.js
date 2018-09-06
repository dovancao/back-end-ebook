const express = require("express");
const router = express.Router();
const checkJWT = require('../../../core/middlerware/check-jwt');

const bookController = require("./controller");

router.get("/type/:category", (req,res) => {
  bookController
    .getAllBookByCategory(req.params.category)
    .then(books => res.send(books))
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  bookController
    .createBook(req.body)
    .then(id => res.send(id))
    .catch(err => {
      console.log(error);
      res.status(500).send(err);
    });
});

router.get("/:id", checkJWT, (req,res) => {
  bookController
    .getBookById(req.params.id)
    .then(user => res.send(user))
    .catch(err => {
      res.status(500).send(err);
    })
})

module.exports = router;