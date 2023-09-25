import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({path:path.resolve(__dirname,"../../.env")});

const username:string|undefined=process.env.MONGO_USERNAME;
const password:string|undefined=process.env.MONGO_PASSWORD;
const clustername:string|undefined=process.env.MONGO_CLUSTER;
const dbname:string|undefined=process.env.MONGO_DBNAME;


const uri:string=`mongodb+srv://${username}:${password}@${clustername}/${dbname}?retryWrites=true&w=majority`;
const connection=()=>mongoose.connect(uri).then(()=>{
    console.log("connection established successfully");
}).catch(err=>{
    console.error(`Error while connecting to mongodb: ${err}`)
})


export default connection;