import { useState, useEffect } from 'react';
import { SWIGGY_API } from './constant';

const useListofRes = () => {
    const [listofRestaurant, setlistofRestaurant] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch(SWIGGY_API);
        const json = await data.json();
        setlistofRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }
    return {
        listofRestaurant,
        filteredRestaurant,
        setFilteredRestaurant
    };
}

export default useListofRes;