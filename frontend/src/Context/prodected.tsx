import React,{ createContext,useContext,useEffect } from "react";
import {Outlet,useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar";

interface ProtectedRoutesType{
    token:string|null
}

const ProtectedContext=createContext<ProtectedRoutesType|null>(null);


function useProtectedContext() {
    const context = useContext(ProtectedContext);
    if (context === null) {
      throw new Error('useProtectedContext must be used within a ProtectedContextProvider');
    }
    return context;
  }

const ProtectedRoutes=()=>{
    const navigate=useNavigate()
    const token:string|null=localStorage.getItem("token");

    useEffect(()=>{
        if(!token){
            navigate("/");
        }
        const sessionToken=token?.split(" ")[1];
        if(sessionToken){
            try {
                const sessionData=jwt_decode(sessionToken);
                if(!sessionData){
                    navigate("/");
                }
            } catch (error) {
                navigate("/"); 
            }
           
        }

    },[]);

    return (
        <ProtectedContext.Provider value={{token}}>
            <Navbar logout={true} />
            <Outlet/>
        </ProtectedContext.Provider>
    )
    
}

export {useProtectedContext};

export default ProtectedRoutes;
