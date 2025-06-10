import { useState } from "react";
import { LOGO_URL } from "../utils/constant";

const Header = () => {
    //
    const [btnName,setbtnName]=useState("Login");
    //for prove that all header is rendered or only
    // buttton when we click on button so ans is: all header rendered see it in console
    //console.log("Headered rendered")
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
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Cart</li>
                    <button onClick={()=>{
                        btnName==="Login"?setbtnName("Logout"):setbtnName("Login");
                    }} className="login">{btnName}</button>
                </ul>
            </div>
        </div>
    )
};

export default Header;