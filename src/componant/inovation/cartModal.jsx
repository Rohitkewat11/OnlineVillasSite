import React, { useEffect } from "react";
import { useState } from "react";



export function CartModal({ visible, onClose, data }) {

    const [cartItems, setCartItems] = useState(data);
    

    function qytLess(e){
        if(e.target.nextSibling.value >1){
            e.target.nextSibling.value=(parseInt(e.target.nextSibling.value)-1);
        }
    }

    function qytMore(e){
        if(e.target.previousSibling.value<5){
            e.target.previousSibling.value=(parseInt(e.target.previousSibling.value)+1);
        }
    }


    // function for deleting Cart product Items=========>
    function deleteItemClick(e){
        var temp = cartItems.find((val=>val.id==e.target.value));
        var index=cartItems.indexOf(temp);
        cartItems.splice(index,1);
        setCartItems([...cartItems]);
    }


    useEffect(()=>{
        setCartItems(data);
    },[data]);


    if (!visible){
        return null;
    }

    return (
        <>
            <div className="w-screen position-fixed inset-0 bg-opacity-10 backdrop-blur-sm flex justify-center items-center">

                <div className="position-relative w-[600px] rounded-md rounder-lg bg-white">
                    <button className="bi bi-x-circle text-3xl position-absolute -top-10 right-4 text-red-800" onClick={onClose}></button>
                    {/* Modal */}
                    <div className="border-2 rounded-lg">
                        <div className="bg-[#f1edda] border rounded-t-md">
                            <h3 className="text-2xl font-semibold p-2 text-orange-500">Product Summary</h3>
                        </div>
                        {/* Modal BOdy */}
                        <div className="h-96 overflow-scroll">
                            <table className="table table-hover bg-white hover:bg-slate-500">
                                <thead>
                                    <tr className="border-bottom border-black text-center">
                                        <th >Preview</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {
                                        cartItems.map(items =>
                                            <tr key={items.id} className="">
                                                <td>
                                                    <img className="border rounded-md text-center" src={items.thumbnail} height="50" width="50" alt="" />
                                                </td>
                                                <td className="text-center">{items.title}</td>
                                                <td className="text-center">{items.price}</td>
                                                <td className="text-center">
                                                    <span className="border-1 rounded-lg p-1">
                                                    <button onClick={qytLess} className="bi bi-dash border-1 rounded-l-lg bg-red-700 text-white" title="Less"></button>
                                                    <input className="w-4 text-center" type="text" value="1" width={1}/>
                                                    <button onClick={qytMore} className="bi bi-plus border-1 rounded-r-lg bg-green-700 text-white" title="More"></button>
                                                    </span>
                                                <button value={items.id} onClick={deleteItemClick} className="bi bi-trash text-red-500 ms-2 mt-2" title="Delete"></button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                    <td className="font-semibold text-lg">Totle-:{cartItems.map(item=>item.price).reduce((total,value)=>total+value,0)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <button className="position-absolute right-0 border rounded-lg bg-blue-700 text-white p-1 mt-3">Place Order</button>
                </div>
            </div>
        </>
    )
}