const bookModel = require('./model');
const fs = require('fs');

const createBook = ({title, author, category, rating, numberOfPage, publisher,retailCompany, priceOfBook, description}) =>
  new Promise((resolve, reject) => {
    bookModel
      .create({
        title, 
        author, 
        rating,
        category, 
        numberOfPage, 
        publisher,
        retailCompany, 
        priceOfBook, 
        description,
      })
      .then(data => resolve ({ id: data._id}))
      .catch(err => reject(err));
  });

/** get all book by category */

const getAllBookByCategory = category => {
  new Promise((resolve, reject) => {
    bookModel
      .findAll({
        category: category
      })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('title, rating, price')     
      .exec()
      .then(data => 
        resolve(
          data.map(book => 
            Object.assign({}, book._doc, {
              imageUrl: `api/book/${book._id}/image`
            })
          )  
        )
      )
      .catch(err => reject(err));
  }) 
}

/** get book by id */
const getBookById = id => 
  new Promise((resolve, reject) => {
    bookModel
      .findOne({
        _id: id
      })
      .select("title, author, category, rating, price, numberOfPage, publisher,retailCompany, priceOfBook, description, imageFile")
      .exec()
      .then(data =>
        resolve(
          Object.assign({}, data._doc, {imageUrl: `api/books/${id}/avatar`})
        )
      )
      .catch(err => reject(err));
  })

module.exports = {
  createBook,
  getAllBookByCategory,
  getBookById
}