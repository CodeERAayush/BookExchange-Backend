import express from 'express'
import { AddBook, getAllBooks, getBookDetails, getCatBooks, getHostelWiseBooks, getHostelWiseBooksCategoryWise, getHostelWiseNewBooks } from '../controllers/book.js'

const router=express.Router()

// router.post('/add_book',AddBook)
router.post('/getBooks',getAllBooks)
router.get('/getBookDetail/:id',getBookDetails)
router.post('/get_books_categorywise',getCatBooks)
router.post('/get_books_hostelwise',getHostelWiseBooks)
router.post('/get_new_books_hostelwise',getHostelWiseNewBooks)
router.post('/get_books_category_hostel',getHostelWiseBooksCategoryWise)

export default router