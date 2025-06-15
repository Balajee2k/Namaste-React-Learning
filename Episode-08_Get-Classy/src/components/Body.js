import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { SWIGGY_API } from "../utils/constant";
import { Link } from "react-router-dom";

const Body = () => {
    //Local State Variable-Super Powerful variable
    const [listofRestaurant, setlistofRestaurant] = useState([]);
    //another variable
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");

    // Whenever State variable update,react trigger a reconcilation cyce(react re-rendering)
    console.log("Body Render");

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch(SWIGGY_API);
        const json = await data.json();
        //we use here optional chaining(?)
        setlistofRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        //updating same data with setFilterre for when i refresh it load all cards like before
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)

    };

    /*conditional Rendering using if either we can club this in below return (using this ternary operator?)
    if(lisofRestaurant.length===0){
        return <Shimmer/>
    }
    */
    return listofRestaurant.length === 0 ? <Shimmer /> : (
        <div className="body">

            <div className="filter">
                <div className="search">
                    <input
                        type="text"
                        className="search-box"
                        value={searchText}
                        //we do this bcz its freeze text box and we cant type anything as and
                        //whenver u try to write, state local component binded to value and value is binded to state local var
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}

                        placeholder="Search for restaurants, cuisines, or a dish"
                    />
                    <button onClick={() => {
                        const filteredRestaurant = listofRestaurant.filter(
                            (restaurant) => restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        setFilteredRestaurant(filteredRestaurant);
                    }} className="search-btn">Search</button>
                </div>
                <button className="filter-btn" onClick={() => {
                    const filterlist = listofRestaurant.filter((res) => res.info.avgRating > 4.5);
                    setFilteredRestaurant(filterlist);
                }}>Top Rated Restaurants</button>
            </div>


            <div className="res-container">
                {filteredRestaurant.map((restaurant) => (
                    <Link to={"/restaurant/"+restaurant.info.id} key={restaurant.info.id}>
                        <RestaurantCard resData={restaurant} />
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default Body;