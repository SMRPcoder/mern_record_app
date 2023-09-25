import { Request, Response } from "express";
import Media from "../models/Media";




const startRecording=(req:Request,res:Response)=>{

    try {
        const {type,status}=req.body;
        // we want userId so get it from middleware
        const userId=req.userId;
        const newMedia=new Media({
            status,type,userId
        });
        newMedia.save().then(data=>{
            res.status(200).json({message:"Started Recording",status:true,data});
        }).catch(err=>{
            console.error(`Error Happend While Saving Record: ${err}`);
            res.status(500).json({message:"Error Happend While Saving Record",status:false});
        })
        
    } catch (error) {
        console.error(`Error Happend While Start Recording: ${Error}`);
        res.status(500).json({message:"Error Happend While Start Recording",status:false});
    }

}

const stopRecording=(req:Request,res:Response)=>{

    try {
        const {mediaId,path,status}=req.body;
        Media.findByIdAndUpdate(mediaId,{path,status}).then(data=>{
            if(data){
                res.status(200).json({message:"Stopped Recording",data,status:true});
            }else{
                res.status(200).json({message:"Record Data is not found",status:true});
            }
        }).catch(err=>{
            console.error(`Error Happend While Updating Record: ${err}`);
            res.status(500).json({message:"Error Happend While Updating Record",status:false});
        })
        
    } catch (error) {
        console.error(`Error Happend While Stop Recording: ${Error}`);
        res.status(500).json({message:"Error Happend While Stop Recording",status:false});
    }

}

export {startRecording,stopRecording};