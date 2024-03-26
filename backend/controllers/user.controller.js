import User from "../models/user.model.js";
import Product from "../models/product.model.js"

export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsers: ", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

// router.patch("/addfavorite", protectRoute, addFavorite)
export const addFavorite = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        const isFavorite = user.favoriteProducts.includes(productId);
        
        let updatedUser;
        if (isFavorite) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { favoriteProducts: productId } },
                { new: true }
            ).populate('favoriteProducts');
            res.status(200).json({ message: 'Product removed from favorites', user: updatedUser });
        } else {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { favoriteProducts: productId } },
                { new: true }
            ).populate('favoriteProducts');
            res.status(200).json({ message: 'Product added to favorites', user: updatedUser });
        }

        /* if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favoriteProducts: productId } }, // Add productId to favoriteProducts array if it's not already there
            { new: true } // Return the updated user document
        ).populate('favoriteProducts'); 
        res.status(200).json({ message: 'Product added to favorites', user: updatedUser }); */
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

// router.get("/getfavorites", protectRoute, getFavorites)
export const getFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('favoriteProducts');;

        const favorites = user.favoriteProducts
        res.status(200).json(favorites)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}