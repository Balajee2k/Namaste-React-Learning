import { CDN_URL } from "../utils/constant";
const RestaurantCard = (props) => {
    const { resData } = props;


    return (
        <div className="m-4 p-4 w-[250px] bg-gray-100 rounded-2xl hover:shadow-lg hover:bg-gray-200 hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
                className="rounded-lg"
                src={CDN_URL + resData.info.cloudinaryImageId}
                alt="res-logo"
            />
            <h3 className="font-bold py-4 text-lg">{resData.info.name}</h3>
            <h4>{resData.info.cuisines.join(",")}</h4>
            <h4>{resData.info.avgRating}⭐</h4>
            <h4>{resData.info.costForTwo}</h4>
            <h4>{resData.info.sla.deliveryTime} mins</h4>
        </div>

    );
}

//Higher Order Component(see in notes as in my data promoted is not present in swiggy as its removed)
//Input: RestaurantCard -> RestaurantCardPromoted
//Output: RestaurantCardPromoted 



export default RestaurantCard;