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
        <div className="header">
            <div className="logo-container">
                <img
                    className="logo"
                    src={LOGO_URL} alt="logo"
                />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li>
                    <button onClick={() => {
                        btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
                    }} className="login">{btnName}</button>
                </ul>
            </div>
        </div>
    )
};

export default Header;