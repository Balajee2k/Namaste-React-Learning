import ItemList from "./ItemList";

//iske pass ap sidha data Itemcards ka data hai
const RestaurantCategory = ({ data,showItems,setShowIndex }) => {
    const handleClick = () => {
        // Toggle the showItems state
        setShowIndex();
    };

    return (
        <div>
            {/* Accordion Category Title */}
            <div className="mx-auto my-4 w-6/12 bg-gray-50 shadow-lg p-4">
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold">
                        {data?.title} ({data?.itemCards?.length || 0})
                    </span>
                    <span>{showItems ? "⬆️" : "⬇️"}</span>
                </div>

                {/* Accordion Category Items(Body) */}
                {showItems && <ItemList items={data?.itemCards} />}
            </div>
        </div>
    );
}

export default RestaurantCategory;