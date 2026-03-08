import orderModel from "../Model/orderSchema.js";
import productModel from "../Model/productSchema.js";

const userOrder = async (req, res) => {
    const id = req.user.userId

    try {
        const order = await orderModel.find({ userId: id }).select('productName price payment status').sort({ _id: -1 })
        res.json({ success: true, order })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

const admainOrder = async (req, res) => {
    const name = req.user.userName

    try {
        const order = await orderModel.find({ sellerName: name }).select('productName price payment status address phoneNo buyerName').sort({ _id: -1 })
        res.json({ success: true, order })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

const confirmOrder = async (req, res) => {
    const id = req.body.id
    const name = req.body.name

    try {
        await orderModel.findByIdAndUpdate(id, { status: "shipping" }, { new: true })
        await productModel.findOneAndUpdate({ name: name }, { $inc: { quantity: - 1 } }, { new: true })
        res.json({ success: true, message: "Order Shipped" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

const deliveredOrder = async (req, res) => {
    const id = req.body.id

    try {
        await orderModel.findByIdAndUpdate(id, { status: "Delivered" }, { new: true })
        res.json({ success: true, message: "Order Delivered" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

const cancelOrder = async (req, res) => {
    const id = req.body.id

    try {
        await orderModel.findByIdAndUpdate(id, { status: "Cancel" }, { new: true })
        res.json({ success: true, message: "Order Cancelled" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}


// REturn order
const returnOrder =  async (req,res)=>{

    const id = req.body.id
    const data = req.body.data
    try {
        await orderModel.findByIdAndUpdate(id, {status: "Return", casueOfReturn: data})
        res.json({success: true, message: "Return Request Send"})
    } catch (error) {
         console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

const getReturnOrd = async (req, res) =>{

    const name = req.user.userName
    try {
        const order = await orderModel.find({ sellerName: name, status: "Return"}).select('productName casueOfReturn buyerName price').sort({ _id: -1})
        res.json( {success: true, order})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

export { userOrder, admainOrder, confirmOrder, deliveredOrder, cancelOrder, returnOrder, getReturnOrd }