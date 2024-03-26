import Product from "../models/product.model.js"

// router.post("/post", post)
export const post = async (req, res) => {
    try {
        const { img, productName, price, description } = req.body
        const senderId = req.user._id

        const newProduct = new Product({
            img, 
            productName, 
            price, 
            description,
            senderId
        })

        await newProduct.save()
        res.status(201).json(newProduct)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// router.get("/myposts", myposts)
export const myposts = async (req, res) => {
    try {
        const userId = req.user._id
        const myProducts = await Product.find({ senderId: userId })

        if(!myProducts) return res.status(200).json([])
        res.status(200).json(myProducts)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
}

// router.get("/allposts", allposts)
export const allposts = async (req, res) => {
    try {
        const allProducts = await Product.find()

        if(!allProducts) return res.status(200).json([])
        res.status(200).json(allProducts)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
}