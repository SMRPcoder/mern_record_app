import React from "react";

interface NavbarProps {
    logout: boolean
}


export default function Navbar({ logout }: NavbarProps) {


    return (


        <nav >
            <div className="flex justify-between" >
                <div onClick={() => window.location.reload()} className="w-20 h-20 cursor-pointer" >
                    <img alt="logo" src="/img/videocamera-day.png" />
                </div>
                <div className="mt-6">
                    <h1 className="font-bold text-2xl" >MERN Record App</h1>
                </div>
                {logout ?
                    <div className="w-20 h-20 m-6" >

                        <a onClick={() => { localStorage.clear(); window.location.reload() }} className="font-bold text-2xl text-blue-500 hover:text-violet-500 hover:underline hover:cursor-pointer">Logout</a>

                    </div>
                    : <div onClick={() => window.location.reload()} className="w-20 h-20 cursor-pointer" >
                        <img className="-scale-x-100" alt="logo" src="/img/videocamera-day.png" />
                    </div>}
            </div>
        </nav>


    )
}