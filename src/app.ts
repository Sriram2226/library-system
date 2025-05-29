// src/app.ts
import express from 'express';
import { BookController } from './controllers/BookController';
import { BookService } from './services/BookService';
import { InMemoryBookRepository } from './repositories/InMemoryBookRepository';

const app = express();
app.use(express.json());

// Dependency Injection
const bookRepository = new InMemoryBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

// Routes
app.post('/books', (req, res) => bookController.createBook(req, res));
app.post('/books/:id/borrow', (req, res) => bookController.borrowBook(req, res));

const port = 3000;
app.listen(port, () => {
  console.log(`Library system running on port ${port}`);
});
