import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useListofRes from "../utils/useListofRes";
import useonlineStatus from "../utils/useOnlineStatus";
import useOnlineStatus from "../utils/useOnlineStatus";
import ChromeDinoGame from 'react-chrome-dino';

const Body = () => {
    // Use the custom hook instead of local state and useEffect
    const { listofRestaurant, filteredRestaurant, setFilteredRestaurant } = useListofRes();
    const [searchText, setSearchText] = useState("");
    const onlinestatus=useOnlineStatus();

    if(!onlinestatus){
        return (
            <div>
                <ChromeDinoGame />
                <h1>Looks like you are offline, please check your internet connection</h1>
            </div>
        );
    }

    /*conditional Rendering using if either we can club this in below return (using this ternary operator?)
    if(listofRestaurant.length===0){
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
                    const filterlist = listofRestaurant.filter((res) => res.info.avgRating > 4.);
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