import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    MRPPrice:{
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    admainName: {
        type: String,
        require: true
    },
    images: {
        type: Array,
        require: true
    },
    
    size: {
      type: Array,
      default: []
    }
    
})

productSchema.index({ category: 1, admainName: 1, name: 1 })

const productModel = mongoose.model.Products || mongoose.model("Products", productSchema)

export default productModel