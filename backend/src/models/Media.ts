import mongoose,{Schema,model,Document} from "mongoose";

export interface IMedia {
    userId:Schema.Types.ObjectId,
    type:string,
    status:string,
    path:string
}

export interface IMediaModel extends IMedia,Document {

}

const MediaSchema=new Schema({
    userId:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    path:{
        type:String
    },
})

const Media=model<IMediaModel>("Media",MediaSchema);

export default Media;