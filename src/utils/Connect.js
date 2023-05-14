import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log("Mongo DB is already connected.")
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "activist",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true

        console.log("Mongo DB is connected.")
    } catch (err) {
        console.error("Failed to connect to the DB.", err)
    }
}