import * as jwt from "jsonwebtoken";

const privatestring:string="suuhcdshcujcd";

const createJwt=(data:{email:string,name:string,id:string}):string=>{

    const token:string=jwt.sign({email:data.email,name:data.name,id:data.id},privatestring);
    return "Bearer "+token;
}

const verifyJwt=(token:string)=>{
    const data=jwt.verify(token,privatestring);
    return data;
}

export {createJwt,verifyJwt};