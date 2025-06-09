import React from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header";
import Body from "./components/Body";
import RestaurantCard from "./components/RestaurantCard";

/*
Structure of Food Ordering App
Header:
    -Logo
    -Nav Items
Body:
    -Search Bar
    -Restaurant Container
        -Restaurant Card
            -Img
            -Name Of Res, Star rating  , Cuisine, delery time
Footer:
    -CopyRight
    -Address
    -Links
    -Contacts
*/

const AppLayout = () => {
    return <div className="app">
        <Header />
        <Body />
    </div>
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
