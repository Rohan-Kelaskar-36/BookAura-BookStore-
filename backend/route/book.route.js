import express from 'express';
import Book from '../model/book.model.js'; // Ensure the model is correct

const router = express.Router();

// Define a route to get books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();  // Assuming your model is Book
    res.json(books);  // Send the books as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;
