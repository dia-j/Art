import userModel from "../models/userModel.js"

// add items to user cart 
const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const itemId = req.body.itemId;
        console.log('addToCart called with userId:', userId, 'itemId:', itemId);
        let userData = await userModel.findOne({ _id: userId });
        if (!userData) {
            console.log('User not found:', userId);
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        let cartData = userData.cartData || {};
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.log('addToCart error:', error);
        res.status(500).json({ success: false, message: "Error adding item to cart", error: error.message });
    }
}

//remove Items from user cart 
const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const itemId = req.body.itemId;
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        let cartData = await userData.cartData;
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
            }
            await userModel.findByIdAndUpdate(userId, { cartData });
            res.json({ success: true, message: "Item removed from cart" });
        } else {
            res.status(400).json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log('removeFromCart error:', error);
        res.status(500).json({ success: false, message: "Error removing item from cart", error: error.message });
    }
}

// fetch user cart data
const getCart = async (req,res) => {
    try { 
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log('getCart error:', error);
        res.status(500).json({ success: false, message: "Error fetching cart data", error: error.message });
    }
}

// clear user cart data
const clearCart = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error clearing cart", error: error.message });
    }
};

export {addToCart,removeFromCart,getCart,clearCart}