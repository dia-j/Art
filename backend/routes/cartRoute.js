import express from "express"
import authMiddleware from "../middleware/auth.js";
import { addToCart, removeFromCart, getCart, clearCart } from "../controllers/cartController.js"

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.delete("/remove", authMiddleware, removeFromCart);
cartRouter.get("/get", authMiddleware, getCart);
cartRouter.post("/clear", authMiddleware, clearCart);

export default cartRouter;