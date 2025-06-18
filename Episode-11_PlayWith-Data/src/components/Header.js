import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {
    // Custom hook to get online status
    const onlineStatus = useOnlineStatus();
    const [btnName, setbtnName] = useState("Login");
    //for prove that all header is rendered or only
    // buttton when we click on button so ans is: all header rendered see it in console
    console.log("Headered rendered")
    //Learn more abt useEffect: see more in readme
    useEffect(() => {
        console.log("useEffect called");
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
                    <li className="px-5"><Link to="/cart">Cart</Link></li>
                    <li className="px-5"><Link to="/grocery">Grocery</Link></li>
                    <button onClick={() => {
                        btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
                    }} className="login">{btnName}</button>
                </ul>
            </div>
        </div>
    )
};

export default Header;