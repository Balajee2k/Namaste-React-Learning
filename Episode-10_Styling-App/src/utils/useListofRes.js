import { useState, useEffect } from 'react';
import { SWIGGY_API } from './constant';

const useListofRes = () => {
    const [listofRestaurant, setlistofRestaurant] = useState([]);
    //another variable
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch(SWIGGY_API);
        const json = await data.json();
        setlistofRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        //updating same data with setFilteredRestaurant for when i refresh it load all cards like before
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }

    // Return the state variables and setter function that components will need
    return {
        listofRestaurant,
        filteredRestaurant,
        setFilteredRestaurant
    };
}

export default useListofRes;