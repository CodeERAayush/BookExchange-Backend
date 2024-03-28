import express from 'express'
import { AddBook, getAllBooks, getCatBooks, getHostelWiseBooks, getHostelWiseBooksCategoryWise } from '../controllers/book.js'

const router=express.Router()

// router.post('/add_book',AddBook)
router.post('/getBooks',getAllBooks)
router.post('/get_books_categorywise',getCatBooks)
router.post('/get_books_hostelwise',getHostelWiseBooks)
router.post('/get_books_category_hostel',getHostelWiseBooksCategoryWise)

export default router