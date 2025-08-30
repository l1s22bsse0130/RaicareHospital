import mongoose from "mongoose";

const ConnectionDB = async()=>{
    mongoose.connection.on('connected',()=>console.log("Database connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/raicare`)
}
export default ConnectionDB;