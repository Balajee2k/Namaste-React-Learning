
// Main Body Shimmer (for restaurant cards) - No header included
const Shimmer = () => {
    return (
        <div className="body">
            {/* Filter Section Shimmer */}
            <div className="filter flex">
                <div className="search m-4 p-4 flex items-center space-x-4">
                    <div className="w-64 h-10 bg-gray-300 rounded border animate-pulse"></div>
                    <div className="w-20 h-10 bg-gray-300 rounded-xl animate-pulse"></div>
                    <div className="w-40 h-10 bg-gray-300 rounded-xl animate-pulse"></div>
                </div>
            </div>

            {/* Restaurant Cards Shimmer */}
            <div className="res-container flex flex-wrap">
                {Array(12).fill("").map((_, i) => (
                    <div 
                        className="m-4 p-4 w-[250px] bg-gray-100 rounded-2xl animate-pulse" 
                        key={i}
                    >
                        {/* Image shimmer - matches your RestaurantCard image */}
                        <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
                        
                        {/* Restaurant name shimmer - matches your h3 */}
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                        
                        {/* Cuisines shimmer - matches your h4 */}
                        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                        
                        {/* Rating shimmer - matches your rating h4 */}
                        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                        
                        {/* Cost shimmer - matches your cost h4 */}
                        <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                        
                        {/* Delivery time shimmer - matches your delivery time h4 */}
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Shimmer;