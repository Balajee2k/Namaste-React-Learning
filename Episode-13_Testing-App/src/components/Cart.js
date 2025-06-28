import {useDispatch, useSelector} from "react-redux";
import ItemList from "./ItemList.js";
import { clearCart } from "../utils/cartSlice.js";
import { useDispatch } from "react-redux";
const Cart = () => {
    //Now how we get the item that we add from the menu so for that we have to subscribe to the store and get the state of the cart by using the useSelector hook from react-redux
    const cartItems = useSelector((store) => store.cart.items);
    //for clear cart
    const dispatch=useDispatch();


    const handleClearCart=()=>{
        dispatch(clearCart());//clear cart come from reducer in CartSlice
    };

    return(
        <>
        <div className='text-center m-4 p-4'>

            <h1 className='font-bold text-2xl'>{cartItems.length > 0 ? "Your Cart" : "Cart is Empty"}</h1>
            <h2>Total Items: {cartItems.length}</h2>
            <div className="w-6/12 m-auto">
                <button className="p-2 m-2 bg-black text-white rounded-lg"
                onClick={handleClearCart}
                >Clear Cart</button>
                <ItemList items={cartItems}/>
            </div>

        </div>

        </>

    )
}

export default Cart;