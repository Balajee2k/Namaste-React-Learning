import React from "react";
import ReactDOM from "react-dom/client";

//This is creating react element using old create react element method
//Basically it works by  React.createElement -> it make React Elelment -> then this is a Js object-> HTMLElement(rendered in browser)
const parent = React.createElement(
    "div",
    {id:"parent"},
    React.createElement("div",{id:"heading"},
        [
            React.createElement("h1",{},"I am h1 tag"),
            React.createElement("h2",{},"I am h2 tag"),
        ]
    )
);
console.log(parent);

//Here now we use JSX ie.. javascript syntax like html which help to write html like structure in react
//work: JSX-> Babel convertes into React.createElement -> then this is a Js object -> HTMLElement(rendered in browser)
//This is a react element using JSX
const jsxHeading=(<h1 id="heading"
>Welcome to React using Jsx</h1>
);

//Lets see how react component is Written(newone): see its just a arrow func of js
const HeadingComponent = () => {
    return (
        <h1 id="heading">Welcome to React using Jsx</h1>
    );
};

//same above component can we written like this(bcz if we have one line jsx then we can skip return and use arrow function directly)
const HeadingComponent2 = () => <h1 id="heading">Welcome to React Component</h1>;

//same like this and we use this
const HeadingComponent3 = () => (
    <div>
        <h1 id="heading">Welcome to React Component2</h1>
    </div>
);


//Lets play : Componenet composition like this:
const App = () => {
    return (
        <div id="parent">
            <HeadingComponent3/> {/*This is how we use component inside component*/}
            <HeadingComponent3></HeadingComponent3>{/*we can also inject like this */ }
            {HeadingComponent3()} {/*we can also inject like this */}
            <HeadingComponent2/>
        </div>
    );
};



const root = ReactDOM.createRoot(document.getElementById("root"));
//rendering react element
root.render(jsxHeading);
//rendering react component(use <HeadingComponent/> to render component) like this babel understand that this is a component
root.render(<HeadingComponent/>);

root.render(<App/>);
