import React from "react";
import ReactDOM from "react-dom/client";


const HeadingComponent= () => (
    <div>
        <h1 id="heading">Welcome to React Component2</h1>
    </div>
);




const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent/>);
