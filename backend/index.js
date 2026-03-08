import {connectDB} from "./database/db.js";

import express from "express";
import cors from "cors";
import foodRoute from "./routes/foodRoute.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// import bodyParser from "body-parser";


// middleware
const app = express();
const PORT = 2500;
dotenv.config();
app.use(cors());
app.use(express.json());

//bd connection
connectDB();



//api endpoints
app.use("/api/food",foodRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRouter);
app.use("/images", express.static("upload"));
app.use("/upload", express.static("upload"));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
} );