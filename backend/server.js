import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import productRoutes from "./routes/product.routes.js"
import connectToMongoDB from "./db/mongodb.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000

dotenv.config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json()); // parse incoming requests with JSON
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`)
})