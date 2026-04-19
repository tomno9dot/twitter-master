import mongoose from "mongoose"

let isConnected = false;

const connectDb = async () => {
    if (isConnected) {
        return;
    }
    try {
       const db = await mongoose.connect(process.env.MONGO_URI)
       isConnected = db.connections[0].readyState;
       console.log("MongoDB connected successfully")
      
    } catch (error) {
        console.error(`Error connecting to mongodb: ${error.message}`)
        process.exit(1)

    }
}
export default connectDb