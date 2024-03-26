import express from "express"
import { post, myposts, allposts } from "../controllers/product.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/post", protectRoute, post)

router.get("/myposts", protectRoute, myposts)

router.get("/allposts", protectRoute, allposts)

export default router;