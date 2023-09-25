import mongoose,{Schema,model,Document} from "mongoose";

export interface IUser {
    name:string,
    email:string
}

export interface IUserModel extends IUser,Document {

}

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true});

const User=model<IUserModel>("User",UserSchema);

export default User;