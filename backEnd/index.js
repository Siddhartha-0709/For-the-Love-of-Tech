import mongoose from "mongoose";
import 'dotenv/config'
import app from "./app.js";
const connectDB= async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    }); 
}).catch((err) => {
    console.log(err);
});


