
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { InovationHome } from "./inovationHome";
import { InovationLogin } from "./inovationLogin";
import { InovationProducts } from "./inovationProducts";
import { useState } from "react";

export function InovationIndex() {

    const [active,setActive] = useState(false);

    function menuClick(){
        setActive(current =>!current);
    }

    return (
        <>
            <BrowserRouter>
                 <header className="bg-[#f1edda]">
                    <div className="flex justify-between md:flex flex-wrap md:justify-around h-18 items-center p-1">
                        <div>
                            <span className="bi bi-cart3 text-4xl font-semibold">Shoping</span>
                            <span className="text-orange-500 text-3xl -rotate-45" style={{fontFamily: 'Dancing Script,cursive'}}>Villas...</span>
                        </div>
                        <div>
                            <div className={active?
                                "md:block md:top-0 md:right-16 md:bg-transparent md:position-fixed py-2 rounded-lg position-absolute top-20 right-0 p-2 flex flex-col z-1 bg-[#f1edda] bg-opacity-80"
                                :"py-2 hidden md:block md:border-0"}>
                                <Link to="/" className="md:ms-5 font-semibold hover:text-orange-500 hover:border hover:border-orange-500 hover:rounded-lg hover:p-1">HOME</Link>
                                <Link to="products" className="md:ms-5 font-semibold hover:text-orange-500 hover:border hover:border-orange-500 hover:rounded-lg hover:p-1">PRODUCT</Link>
                                <Link className="md:ms-5 font-semibold hover:text-orange-500 hover:border hover:border-orange-500 hover:rounded-lg hover:p-1">ABOUT</Link>
                                <Link className="md:ms-5 font-semibold hover:text-orange-500 hover:border hover:border-orange-500 hover:rounded-lg hover:p-1">CONTACT</Link>
                                <span className="md:ms-5">
                                <Link to="login" className="bi bi-person text-lg font-semibold hover:text-orange-500">Login</Link>/
                                <Link className="text-lg font-semibold hover:text-orange-500">Register</Link>
                                </span>
                            </div>
                        </div>
                        <div>
                            <button onClick={menuClick} className= {active?"bi bi-three-dots-vertical text-4xl font-extrabold p-1 md:hidden":"bi bi-three-dots text-4xl font-extrabold p-1 md:hidden"}></button>
                        </div>
                    </div>
                    <div className="text-end me-10 font-semibold md:block">
                        <span><i>Call Now</i>-1800 455 455</span>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<InovationHome />} />
                    <Route path="/login" element={<InovationLogin />} />
                    <Route path="products" element={<InovationProducts />} />
                    <Route path="*" element={<><h1>Requested path not found: Go Back..</h1></>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}