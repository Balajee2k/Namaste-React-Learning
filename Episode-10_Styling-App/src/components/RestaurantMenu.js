import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurant";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
    const { resId } = useParams(); // Get the dynamic parameter from the URL
    const  resInfo  = useRestaurantMenu(resId);

    if (resInfo === null) {
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