import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";
import { verifyJwt } from "../function/createJwt";

declare global{
    namespace Express {
        interface Request {
            userId:Schema.Types.ObjectId
        }
    }
}


const AuthUser=(req:Request,res:Response,next:NextFunction)=>{
    const {authorization}=req.headers;
    if(authorization){
        const token:string=authorization.split(" ")[1];
        const userData=verifyJwt(token);
        if(typeof userData == "object" && "id" in userData){
            req.userId=userData.id;
            next();
        }else{
            res.status(401).json({message:"UnAuthorized Token Provided",status:false});
        }
    }else{
        res.status(401).json({message:"Token Not Provided",status:false});
    }
}

export default AuthUser;