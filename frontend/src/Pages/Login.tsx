import React,{useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Notify } from "notiflix";
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar";



export default function Login() {
    const navigate=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token){
            const sessionToken=token?.split(" ")[1];

            if(sessionToken){

                try {
                    const sessionData=jwt_decode(sessionToken);
                    if(sessionData){
                        return navigate("/app/home");
                    }
                } catch (error) {
                    return navigate("/"); 
                }
               
            }
        }
    },[])

    const validatinschema = yup.object({
        name: yup.string().required("This Field Is Required"),
        email: yup.string().email().required("This Field Is Required")
    })

   


    return (
        <>
        <Navbar logout={false} />
        <div className="flex items-center justify-center" style={{ marginTop: "12vh" }}>
            <div className="">
                <div className="card text-center">
                    <h1 className="font-bold text-4xl p-4 text-[#78a1d1]" >Login</h1>

                    <Formik validationSchema={validatinschema} initialValues={{ name: "", email: "" }} 
                    onSubmit={(values) => { axios.post("http://localhost:3001/api/auth/login",values).then(data=>{
                        if(data.data.status){
                            Notify.success(data.data.message);
                            localStorage.setItem("token",data.data.token);
                            setTimeout(()=>navigate("/app/home"),1000);
                        }else{
                            Notify.failure(data.data.message);
                        }
                    }) }} >
                        {({ errors, touched }) => (
                            <Form className="flex flex-col p-2 items-center">
                                <label className="text-[#78a1d1] font-bold mt-3">Name</label>
                                {errors.name && touched.name ? <p className="text-red-500">{errors.name}</p> : null}
                                <Field name="name" type="text" className="w-[300px] border-2 border-[#77cbd2]" />
                                <label className="text-[#78a1d1] font-bold mt-3">Email</label>
                                {errors.name && touched.name ? <p className="text-red-500">{errors.name}</p> : null}
                                <Field name="email" type="text" className="w-[300px] border-2 border-[#77cbd2]" />
                                <button type="submit" className="mt-4 p-3 bg-blue-500  text-white font-bold rounded-xl">Submit</button>
                            </Form>
                        )}

                    </Formik>
                </div>
            </div>
        </div>
        </>
    )
}