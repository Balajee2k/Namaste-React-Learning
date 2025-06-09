import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState } from "react";

const Body = () => {
 //Local State Variable-Super Powerful variable
const[ lisofRestaurant,setlistofRestaurant] =useState(resList);
    return (
        <div className="body">
            <div className="SearchBar">
                <input className="search" type="text" placeholder="Search for restaurants, cuisines, or a dish" />
            </div>
            <div className="filter">
            <button className="filter-btn" onClick={()=>{
                const filterlist=lisofRestaurant.filter((res)=>res.info.avgRating>4);
                setlistofRestaurant(filterlist);
            }}>Top Rated Restaurants</button>

            </div>

            <div className="res-container">
                {lisofRestaurant.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                ))}

            </div>
        </div>
    )
}

export default Body;