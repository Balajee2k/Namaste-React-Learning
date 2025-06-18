import { useEffect,useState } from "react"
import { RESTAURANT_MENU_API } from "../utils/constant";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        // Fetch restaurant menu data from API
        // This is where you would typically make an API Call to fetch the menu items
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(RESTAURANT_MENU_API + resId);
        const json = await data.json();
        setResInfo(json.data);
    }
    return resInfo;
}

export default useRestaurantMenu;