import express from 'express'
import { doReview, getReviews } from '../controllers/review.js'

const router=express.Router()

router.post('/do_review',doReview)
router.post('/get_review',getReviews)

export default router
