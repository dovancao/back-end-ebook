const imageModel = require("./model");
const fs = require("fs");

const createImage = ({ title, imageFile}) =>
  new Promise((resolve, reject) => {
    imageModel
      .create({
        image: fs.readFileSync(imageFile.path),
        title
      })
      .then(data => resolve({ id: data._id }))
      .catch(err => reject(err));
  })

const getImageByTitle = title =>
  new Promise((resolvem, reject) => {
    imageModel
      .findOne({
        title: title
      })
      .exec()
      .then(data => resolve(data))
      .catch(err => reject(err))
  })

module.exports = {
  createImage,
  getImageByTitle
}