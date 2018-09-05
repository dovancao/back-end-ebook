const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const imageController = require('./controller');
const authMiddleware = require("../auth/auth");

router.post('/', authMiddleware.authorize ,upload.single('image'),
  (req, res) => {
    req.body.imageFile = req.file;
    imageController
      .createImage(req.body)
      .then(result => res.send(result))
      .catch(err => {
        res.status(500).send(err);
      })
  }
)

router.get('/:title', (req,res) => {
  imageController
    .getImageByTitle(req.params.title)
    .then(result => res.send(result))
    .catch(err => {
      res.status(500).send(err);
    })
})