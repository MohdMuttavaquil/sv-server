import userModel from '../Model/userSchema.js'
import Jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from "validator"

const createToken = (id, name) => {
    return Jwt.sign({ id: id, name: name }, process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

}

const singIn = async (req, res) => {

    const { name, email, password, admain } = req.body

    try {
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter valid email" })
        }

        const existUser = await userModel.findOne({ email: email })
        if (existUser) {
            return res.json({ success: false, message: "user already exist" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashPassword,
            role: admain ? "admain" : "user"
        })

        await newUser.save()
        const role = newUser.role
        const token = createToken(newUser._id, newUser.name)
        res.json({ success: true, token, role })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

const login = async (req, res) => {

    const { email, password } = req.body

    try {
        const existUser = await userModel.findOne({ email: email })

        if (!existUser) {
            return res.json({ success: false, message: "Enter valid email" })
        }

        const checkPassword = await bcrypt.compare(password, existUser.password)
        if (!checkPassword) {
            return res.json({ success: false, message: "Password is wrong" })
        }
        const token = createToken(existUser._id, existUser.name)
        const role = existUser.role
        res.json({ success: true, token, role })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

const userInfo = async (req, res)=>{
     
   const id = req.user.userId
   
    try {
        const user = await userModel.findById(id).select('name email role')
        res.json({success: true, user})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}


export { singIn, login, userInfo } 