import express from 'express'
import path from "path"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectDb from './db/connectMongoDb.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/user.routes.js"
import {v2 as cloudinary} from "cloudinary"
import postRoutes from "./routes/post.routes.js"
import notificationRoutes from './routes/notification.routes.js'

dotenv.config();

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
})
const app = express()
const PORT = process.env.PORT ||  5000
const __dirname = path.resolve();

app.use(express.json({limit: "5mb"}))
app.use(express.urlencoded({ extended: true})) //to parse form data
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/notifications", notificationRoutes)

connectDb();

const frontendDistPath = path.join(__dirname, "frontend", "dist");

if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
	app.use(express.static(frontendDistPath));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(frontendDistPath, "index.html"));
	});
}

if (!process.env.VERCEL) {
    app.listen(PORT, () => { 
         console.log(`Server is running on port ${PORT}`) 
    })
}

export default app;