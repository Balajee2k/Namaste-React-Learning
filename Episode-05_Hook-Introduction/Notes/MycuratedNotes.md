- In this episode, we will learn about hooks in React (we learn this by adding a feature in my app that is wheni click on button its show only top rated restaurent).
- Before proceeding, we clean up our mess and make a proper file structure for each component to make our app better and ready for further building to the next level.
- In this lecture we will learn how react work, what is Reconciliation, React fiber,Virtual Dom and many things like that.

## There are two types of export in React
A. Named Export: 
   - Exporting multiple components or variables from a file.
   - Example: 
     ```javascript
     export const ComponentA = () => { ... };
     export const ComponentB = () => { ... };
     ```
   - How to import named export:
     ```javascript
     import { ComponentA, ComponentB } from './path/to/file';
     ```     
B. Default Export:
   - Exporting a single component or variable from a file.
   - Example:
     ```javascript
     const Component = () => { ... };
     export default Component;
     ```
   - How to import default export:
     ```javascript
     import Component from './path/to/file';
     ```       

## Can you do the named export and default export in the same file?
- Yes, you can have both named exports and a default export in the same file.
- Example:
  ```javascript
  export const ComponentA = () => { ... };
  const ComponentB = () => { ... };
  export default ComponentB;
  ```
- How to import:
  ```javascript
  import ComponentB, { ComponentA } from './path/to/file';
  ```

## Can you do named and default export for the same function?
- No, you cannot have a named export and a default export for the same function or variable in the same file.
- If you try to do so, it will result in a syntax error.
- You can either use named export or default export for a single function or variable, but not both.
- Example of incorrect usage:
  ```javascript
  const Component = () => { ... };
  export default Component;
  export const Component = () => { ... }; // This will cause an error
  ```

## Let's deep dive into Hooks (Understand how and what a hook is)

- First, see what it is by example and definition:
```javascript
import React, { useState } from 'react';
const Counter = () => {
    const [count, setCount] = useState(0); // useState is a Hook

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
};
export default Counter;
```
- Let's understand what happened above. So basically:
Like in JS, we do like this:
```javascript
let count = [];//intialize data is empty in count
// When we have to update or change anything in a variable, we do like this
count = 5; // Directly changing the variable
```
But in React(in hook func), we cannot do like this. We have to do like this: 
```javascript
const [count] = useState(0);
```
Here, `count` is a const variable like in JS, and in React, we write a super powerful function (or technically, a hook) like this:
```javascript
const [count] = useState();
```
If we have to change(like put some data in count variable) or update anything in this, then we use another variable name `setCount` (pass into array of const), and what data we have changed, we pass that in the useState function like this:
```javascript
const [count, setCount] = useState([5]);
```
And this does magic in my UI, not only logically but also visually.

As we see, when we do this by using JavaScript normally, then it changes or modifies data in the console only but not in the UI. But when we do this in React, then it changes the data in the console as well as in the UI. This is the magic of React when using hooks.

For seeing how it works in JS, let's see how `./body.js` looks like below:
```javascript
const Body = () => {
    // For understanding hook and filter, take 3 res data
    let lisofRestaurant = [
        {
            "info": {
                "id": "449025",
                "name": "Pizza Hut",
                "costForTwo": "₹350 for two",
                "cuisines": [
                    "Pizzas"
                ],
                "avgRating": 3.3,  
                "sla": {
                    "deliveryTime": 22,
                },         
            },
        },
        {
            "info": {
                "id": "254135",
                "name": "McDonald's",
                "costForTwo": "₹400 for two",
                "cuisines": [
                    "American"
                ],
                "avgRating": 4.3,
                "sla": {
                    "deliveryTime": 23,
                },
            },
        },
        {
            "info": {
                "id": "328777",
                "name": "Govinda Dhaba",
                "costForTwo": "₹320 for two",
                "cuisines": [
                    "Thalis",
                    "North Indian"
                ],
                "avgRating": 4.1,
                "sla": {
                    "deliveryTime": 28,
                },
            }
        },
    ];

    return (
        <div className="body">
            <div className="SearchBar">
                <input className="search" type="text" placeholder="Search for restaurants, cuisines, or a dish" />
            </div>
            <div className="filter">
                <button className="filter-btn" onClick={() => {
                    // Filter the lisofRestaurant array to only include restaurants with avgRating greater than 4 (see concept of filter in JS)
                    lisofRestaurant = lisofRestaurant.filter((res) => res.info.avgRating > 4);
                    console.log(lisofRestaurant);
                }}>
                    Top Rated Restaurants
                </button>
            </div>
            <div className="res-container">
                {lisofRestaurant.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                ))}
            </div>
        </div>
    );
}
```
Above code does not change the UI, it just changes the data in the console only and not in the UI because we are not using hooks here.

Now let's see how `./body.js` looks like if we use hooks below:
```javascript
const Body = () => {
 //Local State Variable-Super Powerful variable
const[ lisofRestaurant,setlistofRestaurant] =useState([
        {
            "info": {
                "id": "449025",
                "name": "Pizza Hut",
                "costForTwo": "₹350 for two",
                "cuisines": [
                    "Pizzas"
                ],
                "avgRating":3.3,  
                "sla": {
                    "deliveryTime": 22,
                },         
            },
        },
        {
            "info": {
                "id": "254135",
                "name": "McDonald's",
              "costForTwo": "₹400 for two",
                "cuisines": [
                    "American"
                ],
                "avgRating": 4.3,
                    "sla": {
                    "deliveryTime": 23,
                },
            },
        },
        {
            "info": {
                "id": "328777",
                "name": "Govinda Dhaba",
                "costForTwo": "₹320 for two",
                "cuisines": [
                    "Thalis",
                    "North Indian"
                ],
                "avgRating": 4.1,
                    "sla": {
                    "deliveryTime": 28,
                },

            }
        },
    ]);

    return (
        <div className="body">
            <div className="SearchBar">
                <input className="search" type="text" placeholder="Search for restaurants, cuisines, or a dish" />
            </div>
            <div className="filter">
            <button className="filter-btn" onClick={()=>{
                // Filter the lisofRestaurant array to only include restaurants with avgRating greater than 4
                // and update the state variable using setlistofRestaurant
                const filterlist=lisofRestaurant.filter((res)=>res.info.avgRating>4);
                //here we use react concept of hooks to change the data in the UI
                setlistofRestaurant(filterlist);
            }}>Top Rated Restaurants</button>

            </div>

            <div className="res-container">
                {lisofRestaurant.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                ))}

            </div>
        </div>
    )
}
```

- Whenever a state variable changes, the component re-renders.
- Hooks are functions that let you use state and other React features without writing a class.
- Logic of updating ui is called re-rendering.

## Lets see what is this diffrent methods to write this:
```javascript
const[ lisofRestaurant,setlistofRestaurant] =useState(resList);
```
This is called array destructuring in JavaScript. It allows you to unpack values from arrays or properties from objects into distinct variables.
Means you can write like this also:
```javascript
import { useState } from 'react';
const arr=useState(resList);
const lisofRestaurant=arr[0];
const setlistofRestaurant=arr[1];
```

## 🟢 Important: React Hooks vs Class Components

### What are React Hooks?
React Hooks are a feature introduced in React 16.8 that allow **functional components** to manage state and side effects, which previously only class components could do. Hooks make code more concise and easier to understand.

---

### Difference Between Class Components and Functional Components with Hooks

| Feature                | Class Component (Before Hooks)                | Functional Component (With Hooks)         |
|------------------------|-----------------------------------------------|-------------------------------------------|
| State Management       | Yes (using `this.state` and `this.setState`)  | Yes (using `useState` hook)               |
| Lifecycle Methods      | Yes (e.g., `componentDidMount`)               | Yes (using `useEffect` hook)              |
| Syntax                 | More verbose, uses ES6 classes                | Simpler, just JavaScript functions        |
| Boilerplate            | More (constructor, binding, etc.)             | Less, no `this` keyword                   |

---

### Example: Counter Component

**Class Component (Before Hooks)**
```javascript
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}
```

**Functional Component (With Hooks)**
```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

### Summary

- **Before React 16.8:** Only class components could manage state and lifecycle methods.
- **After React 16.8 (with Hooks):** Functional components can also manage state and side effects, making class components mostly unnecessary.
...existing notes...


## What is Virtual DOM in react?
- The Virtual DOM is a lightweight copy of the actual DOM means Basically remember how we create elements in react using React.createElement() and that create a object in javascript(that we see in console ) and that object is converted into html using javascript engine. So that react element is called Virtual DOM and the real dom is the actual html that we see in browser.
- React maintains a Virtual DOM to optimize updates to the actual DOM.
Example:
```javascript
const element = React.createElement('div', { className: 'container' }, 'Hello, World!');
```
- In the above example, `element` is a Virtual DOM representation of a `div` with a class name of `container` and text content of `Hello, World!`.
Example of actual DOM:
```html
<div class="container">Hello, World!</div>
```

## What is Diff Algorithm in react?
- The Diff Algorithm is a process used by React to efficiently update the Virtual DOM and synchronize it with the actual DOM means when we change something in the virtual dom then react uses this algorithm to find the difference between the old virtual dom and new virtual dom(basically calculating) and then update only that part of the actual dom that has changed.

## What is Reconciliation in react?
- Reconciliation is the process of updating the Virtual DOM and the actual DOM when the state of a component changes.
`How React works internally?`
Basically, when we change something, like in our app when we click on the button for Top Rated Restaurants, it updates the Virtual DOM. This means it creates a new object from the old object, compares both logically, and then makes changes in the actual UI (DOM).

- React uses a reconciliation algorithm to determine the minimal number of changes required to update the actual DOM based on the changes in the Virtual DOM.

-Reconciliation called basically React fibre now and it is basically all the process that we do in virtual dom using diff algorithm and updating the actual dom.

## What is React Fiber? 
- React Fiber is the reconciliation algorithm used by React to efficiently update the Virtual DOM and synchronize it with the actual DOM.
- It allows React to break down the rendering work into smaller units, enabling better performance and smoother updates.


## Theory Assignment:
- What is the `difference` between `Named export`, `Default export`, and `* as export`?
- What is the `importance` of `config.js` file?
- What are `React Hooks`?
- Why do we need `useState Hook`?