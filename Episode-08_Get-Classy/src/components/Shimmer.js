/*
const Shimmer = () => {
    return (
        <div className="shimmer-container">
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
        </div>
    )
};
*/

const Shimmer = () => {
    return (
        <div className="shimmer-container">
            {Array(12).fill("").map((_, i) => (
                <div className="shimmer-card res-card" key={i}>
                    <div className="shimmer-img shimmer-animate"></div>
                    <div className="shimmer-line shimmer-animate"></div>
                    <div className="shimmer-line shimmer-animate"></div>
                    <div className="shimmer-line shimmer-animate"></div>
                </div>
            ))}
        </div>
    );
};


export default Shimmer;