import express from 'express'
import { addInCart, removeInCart, userCart } from '../Controller/cartController.js'
import authMiddleware from '../Middleware/auth.js'

const cartRoute = express.Router()

cartRoute.post('/addincart', authMiddleware, addInCart)
cartRoute.post('/removeincart', authMiddleware, removeInCart)
cartRoute.get('/', authMiddleware, userCart)

export default cartRoute