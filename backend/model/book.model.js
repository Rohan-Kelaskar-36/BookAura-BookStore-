// import mongoose from "mongoose";
// const bookschema=mongoose.Schema({
//     name:String,
//     price:Number,
//     category:String,
//     image:String,
//     title:String
// })

import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
