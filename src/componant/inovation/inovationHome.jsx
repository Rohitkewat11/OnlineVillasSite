import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function InovationHome() {

    // const [products, setProducts] = useState([]);

    // function loadproduct() {
    //     axios.get('https://dummyjson.com/products?skip=80&limit=100')
    //         .then(res => {
    //             setProducts(res.data.products);
    //         })
    // }

    // useEffect(() => {
    //     loadproduct();
    // }, []);

    return (
        <>
            <body>
                <div className="flex justify-center md:position-reletive md:flex md:justify-around">
                    <div className="border-2 md:h-96 md:w-96 h-80 w-80 rounded-full bg-[#f1edda] position-absolute top-24 md:left-52 md:top-48 border-1 border-orange-500">
                        <img src="./resource/images/girl2.png" alt="" />
                    </div>
                    <div className="position-absolute justify-items-center bottom-20 md:top-64 md:right-64">
                        <span className="text-5xl text-gray-400">New Arrivals</span>
                        <div className="text-4xl font-bold mt-2">JUST FOR<p className="text-orange-500 -rotate-45 px-20" style={{ fontFamily: 'Dancing Script,cursive' }}>You...</p></div>
                        <div className="flex md:position-absolute">
                            <div className="bg-black py-2 px-4">
                                <span className="text-white font-bold text-2xl">FOR ORDER<br />ONLINE</span>
                            </div>
                            <div className="bg-orange-300 py-2 px-3">
                                <span className="font-bold text-2xl">30%<br /> OFF</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" position-absolute bottom-0 md:bottom-10 md:right-10 font-bold text-slate-600">
                    <div><p className="ms-1">&copy;Copyright 9001:2008 All rights are Reserved.</p></div>
                    <span className="flex justify-center md:justify-end">
                        <a href="#" className="text-orange-500 bi bi-facebook text-2xl ms-2"></a>
                        <a href="#" className="text-orange-500 bi bi-twitter text-2xl ms-2"></a>
                        <a href="#" className="text-orange-500 bi bi-instagram text-2xl ms-2"></a>
                        <a href="#" className="text-orange-500 bi bi-youtube text-2xl ms-2"></a>
                        <a href="#" className="text-orange-500 bi bi-medium text-2xl ms-2"></a>
                    </span>
                </div>
            </body>
        </>
    )
}