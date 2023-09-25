import express, { Express,json } from "express";
import connection from "./Database/connection";
import AuthRouter from "./routes/auth-routes";
import RecordRouter from "./routes/record-routes";
import cors from "cors";


const app:Express=express();
app.use(json());
app.use(cors());
connection();

app.use("/api/auth",AuthRouter);
app.use("/api/record",RecordRouter);



app.listen(3001,()=>{
    console.log("App is listening on port 3000");
})