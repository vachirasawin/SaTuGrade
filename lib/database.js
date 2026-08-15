import mongoose from "mongoose"

export const connectDatabase = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Connected to database");
    } catch(error) {
        console.log("Error during connecting to database: ", error);
        throw error;
    }
}