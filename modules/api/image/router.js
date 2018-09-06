const express = require("express");
const router = express.Router();
// const upload = multer({ dest: "uploads/" });
const saveFile = require('../../../core/helper/upload-file');
const promisify = require('util');
const checkJWT = require('../../../core/middlerware/check-jwt');
// const imageController = require('./controller');

router.get('/get/:title/:id', async (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      `../../../static/image/book-image/${req.params.title}/${req.params.id}}`
    );
    const readdir = promisify(fs.readdir);
    const data = await readdir(filePath);
    let dataHyperlink = data.map((value) => {
      const directory = `/static/image/${req.params.title}/${req.params.id}}`;
      return directory + value;
    });
    const dataObject = {data: data, dataHyperLink: dataHyperlink};
    res.status(200).send(dataObject);
  } catch (error) {
    console.log(err);
    res.status(500).send({
        errorMessage: err.message
    });
  }
})

router.post('/upload/:id', checkJWT, saveFile().single('image'),
  (req, res) => {
    res.status(200).send(req.file.originalname);
})

module.exports = router;