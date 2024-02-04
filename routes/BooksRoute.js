import express from 'express'
import { AddBook, getAllBooks } from '../controllers/book.js'

const router=express.Router()

// router.post('/add_book',AddBook)
router.get('/getBooks',getAllBooks)

export default router