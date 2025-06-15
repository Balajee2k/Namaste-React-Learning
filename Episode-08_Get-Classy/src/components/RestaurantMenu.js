import { useEffect,useState } from "react"
import { RESTAURANT_MENU_API } from "../utils/constant";
import Shimmer from "./Shimmer";
import {useParams} from "react-router-dom";

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);

    const { resId } = useParams(); // Get the dynamic parameter from the URL

    useEffect(()=>{
        // Fetch restaurant menu data from API
        // This is where you would typically make an API call to fetch the menu items
        fetchMenu();
    },[]);

    const fetchMenu = async() => {
        const data=await fetch(RESTAURANT_MENU_API+resId);
        const json=await data.json();
        setResInfo(json.data);
    }
    
    if(resInfo===null) {
        // If resInfo is not yet available, show the shimmer effect
        return <Shimmer />;
    }

    // Fix: Add optional chaining and provide fallback values
    const {name, cuisines = [], costForTwoMessage, cloudinaryImageId} = resInfo?.cards?.[2]?.card?.card?.info || {};
    
    // Get the entire itemCards array instead of just one item
    const itemCards = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card?.itemCards || resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card?.categories?.[0]?.itemCards || [];

    return (
        <div className="menu">
            <h1>{name}</h1>
            <h2>{cuisines.join(", ")}</h2>
            <h3>{costForTwoMessage}</h3>
            <h2>Menu Items</h2>
            <ul>
                {itemCards.map((item) => (
                    <li key={item.card.info.id}>
                        {item.card.info.name} - ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RestaurantMenu;