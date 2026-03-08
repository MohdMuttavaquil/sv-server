import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["user", "admain"],
    },
    cart: {
        type: Array,
        default: []
    }

})

userSchema.index({ name: 1, email: 1}); 

const userModel = mongoose.model.Users || mongoose.model("Users", userSchema)

export default userModel