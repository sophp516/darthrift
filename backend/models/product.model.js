import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    img: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true,
    },
    productName: {
        type: String, 
        required: true
    },
    description: {
        type: String,
    },
    isSold: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


const Product = mongoose.model("Product", productSchema);

export default Product;