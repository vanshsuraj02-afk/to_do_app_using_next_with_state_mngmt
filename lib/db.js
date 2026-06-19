import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error("MongoDB URI is missing");
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn:null,promise:null};
}
async function connectDB(){
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose)=>{
            console.log("MongoDB Connected");
            return mongoose;
        })
    }

    try {
        cached.conn = await cached.promise;
    }catch(err){
        cached.promise=null;
        throw err;
    }

    return cached.conn;

}


export default connectDB;