import express from 'express'
import { check, login, singIn, userInfo } from '../Controller/userController.js'
import authMiddleware from '../Middleware/auth.js'

const userRoute = express.Router()

userRoute.post('/login', login)
userRoute.post('/singin', singIn)
userRoute.get('/info', authMiddleware, userInfo)
userRoute.get('/check', authMiddleware, check)

export default userRoute