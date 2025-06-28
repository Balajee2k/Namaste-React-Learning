import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import { useSelector } from "react-redux";

const Header = () => {
    const onlineStatus = useOnlineStatus();
    const [btnName, setbtnName] = useState("Login");
    const { loggedInUser } = useContext(UserContext);
    //
    const cart=useSelector((store)=> store.cart.items);

    useEffect(() => {
    }, [btnName]);


    return (
        <div className="flex justify-between bg-rose-50">
            <div className="logo-container">
                <img
                    className="w-40"
                    src={LOGO_URL}
                />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-5">Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
                    <li className="px-5"><Link to="/">Home</Link></li>
                    <li className="px-5"><Link to="/about">About</Link></li>
                    <li className="px-5"><Link to="/contact">Contact</Link></li>
                    <li className="px-5"><Link to="/cart">Cart🛒({cart.length})</Link></li>
                    <li className="px-5"><Link to="/grocery">Grocery</Link></li>
                    <button onClick={() => {
                        btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
                    }} className="login">{btnName}</button>
                    <li className="p-2 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    )
};

export default Header;