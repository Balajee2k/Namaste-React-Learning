import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurant";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState();

    if (resInfo === null) {
        return <Shimmer />;
    }

    const { name, cuisines = [], costForTwoMessage, cloudinaryImageId } = resInfo?.cards?.[2]?.card?.card?.info || {};

    const categories = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((c) =>
        c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

    return (
        <div className="menu text-center">
            <h1 className="text-2xl font-bold my-6">{name}</h1>
            <h2 className="text-lg">{cuisines.join(", ")}</h2>
            <h2 className="text-lg">{costForTwoMessage}</h2>
            {/* categories Accordion ui comes here */}
            {categories.length > 0 ? (
                categories.map((category, index) => (
                    //controlled component
                    <RestaurantCategory
                        key={category?.card?.card?.title}
                        data={category?.card?.card}
                        //expand the items only when we clicked, other accordians should be hided.
                        showItems={index === showIndex ? true : false}
                        /*
Lifting state up
-----------------
passing the function to set the index value in child component.
*/
                        setShowIndex={() => setShowIndex(index)} // 
                    />
                ))
            ) : (
                <p className="text-gray-500 mt-8">No menu categories available</p>
            )}
        </div>
    )
}

export default RestaurantMenu;