import express from 'express'
import { login, singIn, userInfo } from '../Controller/userController.js'
import authMiddleware from '../Middleware/auth.js'

const userRoute = express.Router()

userRoute.post('/login', login)
userRoute.post('/singin', singIn)
userRoute.get('/info', authMiddleware, userInfo)


export default userRoute