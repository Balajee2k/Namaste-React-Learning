import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constant.js";
import React from "react";
import { addItem } from "../utils/cartSlice.js";
//Itemcards ke andar ka mal ka data idhar hai
const ItemList = ({ items }) => {
    const dispatch = useDispatch();
    
    const handleAddItem = (item) => {
        console.log("Adding item:", item);
        // Dispatch the actual item object instead of hardcoded string
        dispatch(addItem(item));
        
        

    }

    return (
        <div>
            {items?.map((item) => (
                <div
                    key={item.card.info.id}
                    className="flex p-2 m-2 border-gray-200 border-b-2 text-left"
                >
                    <div className="w-9/12">
                        <div className="py-2">
                            <h2 className="font-bold text-slate-600">{item.card.info.name}</h2>
                            <span className="text-slate-600">
                                ₹
                                {
                                    item.card.info.price
                                    ? item.card.info.price / 100
                                    : item.card.info.defaultPrice / 100
                                }
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-4">{item.card.info.description}</p>
                    </div>
                    <div className="w-3/12 p-4 relative">
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                            <button 
                                className="cursor-pointer p-2 px-4 rounded bg-white font-bold text-green-600 shadow-lg border border-gray-300 hover:bg-gray-50"
                                onClick={() => handleAddItem(item)}
                            >
                                ADD+
                            </button>
                        </div>
                        {item.card.info.imageId && (
                            <img 
                                src={CDN_URL + item.card.info.imageId} 
                                className="w-full h-24 object-cover rounded"
                                alt={item.card.info.name}
                            />
                        )}
                    </div>    
                </div>      
            )) || <p>No items available</p>}
        </div>
    )
}

export default ItemList;