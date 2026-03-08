import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    productName: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phoneNo: {
        type: Number,
        require: true
    },
    payment: {
        type: String,
        enum: ["Online", "Cash on dliverey", "failed"],
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    sellerName: {
        type: String,
        require: true
    },
    buyerName: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    status: {
        type: String,
        enum: ["Processing", "shipping", "Delivered", "Return", "Cancel"],
        require: true,
        default: "Processing"
    },
    casueOfReturn: {
        type: String,
        require: true,
        default: ""
    }

})

orderSchema.index({userId: 1, sellerName: 1, status: 1})

const orderModel = mongoose.model.Orders || mongoose.model("Orders", orderSchema)

export default orderModel