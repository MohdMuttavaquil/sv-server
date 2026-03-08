import orderModel from "../Model/orderSchema.js";
import Razorpay from "razorpay"
import crypto from "crypto";
import userModel from "../Model/userSchema.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Online Payment
const onlinePay = async (req, res) => {
    const { amount } = req.body
    
    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: 'receipt_order_' + Date.now(),
    };

    try {
        const order = await razorpay.orders.create(options)
        res.json(order)
    } catch (error) {
        console.log(error)
        res.json({ sucess: false, message: "some error to create order" })
    }
}

// Verify Online payment
const verifyPay = async (req, res) => {

    const { order_id, payment_id, signature } = req.body
    try {
       
        const sign = order_id + "|" + payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest("hex");

        if (expectedSignature === signature) {
            res.json({ success: true, message: "payment verification successfull" });
        } else {
            res.json({ success: false, message: "Payment verification failed" });
        }

    } catch (error) {
        console.log(error)
        res.json({ sucess: false, message: "some error for verify" })
    }
}


const order = async (req, res) => {
    const { address, price, phoneNo, productName, payment, name, sellerName } = req.body
    const id = req.user.userId
   
    try {
        const newOrder = new orderModel({
            productName: productName,
            address: address,
            price: price,
            phoneNo: phoneNo,
            payment: payment,
            sellerName: sellerName,
            buyerName: name,
            userId: id
        })

        await newOrder.save()
        
        res.json({ success: true, message: "Thanks for order" })
    } catch (error) {
        console.log(error)
        res.json({ sucess: false, message: "some error" })
    }
}


export { order, onlinePay, verifyPay }