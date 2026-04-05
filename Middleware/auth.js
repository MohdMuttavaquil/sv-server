import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    
    const { token } = req.headers

    if (!token) {
        return res.status(401).json({ success: false, message: "Token missing" })
    }

    try {
        if (!req.body) {
            req.body = {}
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            userId: token_decode.id,
            userName: token_decode.name
        }

        next()
    } catch (error) {
        
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({ success: false, message: "Invalid token" })
        }

        console.log(error.name)
        return res.status(500).json({ success: false, message: "Somr error" })
    }
}

export default authMiddleware