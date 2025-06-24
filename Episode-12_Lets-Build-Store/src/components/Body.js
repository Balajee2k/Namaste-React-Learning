import RestaurantCard from "./RestaurantCard";
import { useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useListofRes from "../utils/useListofRes";
import useOnlineStatus from "../utils/useOnlineStatus";
import ChromeDinoGame from 'react-chrome-dino';
import UserContext from "../utils/UserContext.js";
const Body = () => {
    const { listofRestaurant, filteredRestaurant, setFilteredRestaurant } = useListofRes();
    const [searchText, setSearchText] = useState("");
    const onlinestatus = useOnlineStatus();

    //Get context Value from main App.js 
    const { loggedInUser, setUserName } = useContext(UserContext);


    if (!onlinestatus) {
        return (
            <div>
                <ChromeDinoGame />
                <h1>Looks like you are offline, please check your internet connection</h1>
            </div>
        );
    }

    return listofRestaurant.length === 0 ? <Shimmer /> : (
        <div className="body">

            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input
                        type="text"
                        className="border border-solid border-black"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}

                        placeholder="Search for restaurants"
                    />
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-xl"
                        onClick={() => {
                            const filteredRestaurant = listofRestaurant.filter(
                                (restaurant) => restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
                            );
                            setFilteredRestaurant(filteredRestaurant);
                        }}>Search</button>

                    <button className="m-2 px-4 py-2 bg-green-100 rounded-xl cursor-pointer" onClick={() => {
                        const filterlist = listofRestaurant.filter((res) => res.info.avgRating > 4.3);
                        setFilteredRestaurant(filterlist);
                    }}>Top Rated Restaurants</button>


                        {/*Extra feature to undertstand User context*/}
                        <label>UserName</label>
                        <input
                            className=" px-4 border border-solid border-black"
                            type="text"
                            placeholder="Put username anything and see magic"
                            value={loggedInUser}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}

                        />

                </div>


            </div>


            <div className="res-container flex flex-wrap">
                {filteredRestaurant.map((restaurant) => (
                    <Link to={"/restaurant/" + restaurant.info.id} key={restaurant.info.id}>
                        <RestaurantCard resData={restaurant} />
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default Body;