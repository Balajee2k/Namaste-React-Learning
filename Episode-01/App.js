const heading = React.createElement("h1", {id:"heading"}, "Hi there, I am learning React!");

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(heading);

// we can also use the following line to render the element without making seperate
// ReactDOM.createRoot(document.getElementById("root")).render(heading);
console.log(heading); // this is a object which is made by React.createElement
// it is a virtual DOM object
console.log(root)

/* Lets see if we have to make this type of complex div
   or element then how we do it in core react
    <div id="parent">
        <div id="child">
            <h1>This is a h1 tag</h1>
            <h2>This is a h2 tag</h2>
        </div>    
    </div>     
*/

const parent = React.createElement(
    "div",
    {id:"parent"},
    React.createElement("div",{id:"Child"},
        [
            React.createElement("h1",{},"I am h1 tag"),
            React.createElement("h2",{},"I am h2 tag"),
        ]
    )
);
//render is basically for replacing whaterver you write in div of root 
root.render(parent);

//Note: Rreact is library not framework bcz its also apply to the small part of html like in card also or anywhere but a framework  is the thing that work only in full condition(framework comw with lot of baggage).