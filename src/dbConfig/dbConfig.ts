import mongoose from "mongoose";

export default async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection =  mongoose.connection;

        connection.on("connected", () => {
            console.log("mongo db connected successfully");
            
        })
        connection.on("error", (err) => {
            console.log("mongo db connection error. Make sure that the Mongo db is running." + err );
            process.exit();
            
        })
        
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}
