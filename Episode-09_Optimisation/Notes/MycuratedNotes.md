- In this episode, we will learn about how to write code that is more efficient and faster.
- We will learn about the different types of optimizations and how to apply them.
- In this episode, we will also learn new concepts such as Custom Hooks and how to use them.

## Let's first study about how you can create Custom Hooks in React.
- Custom hooks are a way to extract reusable logic from components in React. They allow you to encapsulate stateful logic and share it across multiple components without changing the component hierarchy.
- Custom hooks are JavaScript functions whose names start with "use" and can call other hooks.
- They can return any value, including state, functions, or objects.

### Example of Custom Hook
```javascript
import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        // Fetch restaurant menu data from API
        fetchMenu();
    }, [resId]);

    const fetchMenu = async () => {
        const data = await fetch(RESTAURANT_MENU_API + resId);
        const json = await data.json();
        setResInfo(json.data);
    };
    return resInfo;
};

export default useRestaurantMenu;
``` 
- Now we understand custom hooks more clearly by building a feature in our app that shows whether the user is offline or online.
Example: Check useOnlineStatus.js and we use this component in body and header. Also check and learn how we can use this custom hook in multiple components.

## Optimization in React
- So for understanding this, let's take an example of the Swiggy app in which they run the Swiggy app and Swiggy Instamart which is also on Swiggy, but they separated the code and components for both. Like for Instamart, there are also separate home and all other components. So if you want to use Instamart, then you have to go to that page and it will load the code for that page only and not the whole app.
- This is called code splitting and it is a way to optimize the loading time of your app. If both are on the same page, then it will load the whole code and it will take time to load the app.
- So we can use React.lazy and Suspense to achieve this code splitting in our app. Let's create a component Grocery for our app and we will use this component in our app.js file to see how it works and how lazy loading works.

```javascript
import React, { lazy, Suspense } from "react";
const Grocery = lazy(() => import("./Grocery"));

function App() {
  return (
    <div className="App">
      <h1>Welcome to Fast Food Grocery</h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Grocery />
      </Suspense>
    </div>
  );
}
export default App;
```
- Understand under the hood, what happens if you use lazy loading: it creates a separate JS file in the network tab for grocery only when you click on grocery. Otherwise, it only loads index.js (this compresses all our code into one file).

Important Note:
- You can use lazy loading for any component, but for optimization, if each component is large, then we use it. However, if we have 10-20 small components, then we will not use lazy loading as it will create multiple JS files and it will take time to load all the files.
