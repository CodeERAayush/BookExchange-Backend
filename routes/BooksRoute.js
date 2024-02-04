import express from 'express'
import { AddBook, getAllBooks, getCatBooks } from '../controllers/book.js'

const router=express.Router()

// router.post('/add_book',AddBook)
router.get('/getBooks',getAllBooks)
router.post('/get_books_categorywise',getCatBooks)

export default router