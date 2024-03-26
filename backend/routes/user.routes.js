import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsers, addFavorite, getFavorites } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsers)

router.patch("/addfavorite", protectRoute, addFavorite)

router.get("/getfavorites", protectRoute, getFavorites)

export default router;