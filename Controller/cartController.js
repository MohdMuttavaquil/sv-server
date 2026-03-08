import userModel from "../Model/userSchema.js"


const userCart = async(req, res)=>{
    const id = req.user.userId

  try {
    const user = await userModel.findById(id)
    const cart = user.cart
    res.json({success: true, cart})
  } catch (error) {
     console.log(error)
    res.json({ success: false, message: "some error" })
  }
}

// Add item in user cart
const addInCart = async (req, res) => {

    const { itemId } = req.body
    const id = req.user.userId
 
    try {
        const user = await userModel.findByIdAndUpdate(id, { $push: { cart: itemId } }, { new: true })
        res.json({ success: true, message: "Item added succesfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

const removeInCart = async (req, res) => {
    const { itemId } = req.body
    const id = req.user.userId

    try {
       const user = await userModel.findByIdAndUpdate(id, { $pull: { cart: itemId } }, { new: true })
        const userCart = user.cart
        res.json({ success: true, userCart })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}


export { userCart, addInCart, removeInCart }