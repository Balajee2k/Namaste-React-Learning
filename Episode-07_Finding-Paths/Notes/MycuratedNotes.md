## Q. More about `useEffect()` and `useState()`

### `useEffect()`
- `useEffect` is a React Hook used to perform side effects in function components. It runs *after* the render cycle is committed to the screen.
- The timing and frequency of `useEffect` execution depend on the dependency array provided as its second argument:

```javascript
useEffect(() => {
  // Side effect code here
  // Optional: Return a cleanup function
  return () => {
    // Cleanup logic (e.g., unsubscribe, clear timers)
  };
}, [/* dependencies */]);
```

#### Case 1: No dependency array passed
```javascript
import { useEffect } from "react";

useEffect(() => {
  console.log("Runs after every render");
});
```
- The effect runs **after every render** (both the initial mount and every update). Use this sparingly as it can lead to performance issues.

#### Case 2: Empty dependency array `[]`
```javascript
import { useEffect } from "react";

useEffect(() => {
  console.log("Runs only once after initial render");
}, []);
```
- The effect runs **only once**, after the initial render (when the component mounts). This is similar to `componentDidMount` in class components.

#### Case 3: Dependency array with values `[dependency1, dependency2, ...]`
```javascript
import { useEffect, useState } from "react";

// Assume count is a state variable
// const [count, setCount] = useState(0);

useEffect(() => {
  console.log("Runs after initial render and whenever 'count' changes:", count);
}, [count]); // Example: 'count' is a dependency
```
- The effect runs **after the initial render** and **whenever any value in the dependency array changes** between renders.

### `useState()`
- `useState()` is a React Hook used to add local state variables to functional components.
- **Rules of Hooks:**
    - Call `useState()` at the **top level** of your functional component (not inside loops, conditions, or nested functions).
    - Only call Hooks from **React function components** or **custom Hooks**.
- When a state variable (created by `useState()`) is updated using its setter function, React triggers a re-render of the component and its children to reflect the new state. This process is part of React's reconciliation cycle.

---

## React Router (`react-router-dom`)
- `react-router-dom` is a library used for handling routing in React applications, enabling navigation between different views or pages.

### Setup and Usage:
1. **Installation:** Install the package using npm or yarn:
    ```bash
    npm install react-router-dom
    ```
2. **Import necessary components:**
    ```javascript
    import { createBrowserRouter, RouterProvider } from "react-router-dom";
    ```
3. **Define Routes:** Use `createBrowserRouter()` to define your application's routes. It accepts an array of route objects. Each route object typically defines a `path` and the `element` (component) to render for that path.
    ```javascript
    // Example:
    // import AppLayout from "./AppLayout";
    // import About from "./About";

    const appRouter = createBrowserRouter([
      {
        path: "/",
        element: <AppLayout />,
        // You can also add children routes, error elements, etc.
      },
      {
        path: "/about",
        element: <About />,
      },
    ]);
    ```
4. **Provide Router Configuration:** Use the `RouterProvider` component to make the routing configuration available to your application. Instead of directly rendering your main `AppLayout` component, you render `RouterProvider` and pass your `appRouter` configuration to it.
    ```javascript
    // In your main rendering file (e.g., index.js or App.js)
    // import ReactDOM from "react-dom/client";

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<RouterProvider router={appRouter} />);
    ```

5. **React Router gives us a hook to get more details about errors on a page:**
- `useRouteError()`: This hook can be used to access error information when a route fails to load or render. It provides details about the error, which can be displayed in an error boundary component.
    ```javascript
    import { useRouteError } from "react-router-dom";

    function ErrorPage() {
      const error = useRouteError();
      return (
        <div>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>{error.statusText || error.message}</p>
        </div>
      );
    }
    ```

---

## Children Routes
- Children routes allow you to define nested routes within a parent route. This is useful for creating layouts where certain components (like headers, footers, or sidebars) are shared across multiple pages.
- To define children routes, you can add a `children` property to your route object. The `element` for the parent route will typically render an `Outlet` component, which serves as a placeholder for the child routes.
    ```javascript
    const appRouter = createBrowserRouter([
      {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
          {
            path: "about",
            element: <About />
          },
          {
            path: "contact",
            element: <Contact />
          }
        ]
      }
    ]);
    ```
- Normally, we do this to nest routes. Using the `children` property, we can push child routes to the `AppLayout`.
- **Q. How to push my children to the AppLayout?**
  - We use the `Outlet` component for this.

```javascript
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};
```
- Here, `Outlet` acts as a placeholder for the child routes.

---

## Q. Why don't we use anchor tag (`<a></a>`) to go to another page in React, and what do we use instead?

- In React, using anchor tags (`<a>`) to navigate between pages causes a full page reload, which is not the desired behavior in a single-page application (SPA). This reloads the entire application, losing the current state and context.
- Instead, React Router provides a `Link` component that allows for client-side navigation without reloading the page. This maintains the SPA experience by updating the URL and rendering the appropriate components without a full page refresh.
    ```javascript
    import { Link } from "react-router-dom";

    function Navigation() {
      return (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      );
    }
    ```
- This concept is called SPA (Single Page Application), where we don't reload the page but just change the content.

---

## Routing in web apps
- 2 Types of routing in web apps:
  1. **Client-side routing**: Handled by the browser, where the application dynamically updates the content without reloading the page. This is typically done using libraries like React Router. (On first load, everything is loaded in the browser, and then we just change the content of the page.)
  2. **Server-side routing**: Handled by the server, where each request for a new page results in a full page reload and a new HTML document being sent from the server.

---

## Dynamic routing
- In React Router, you can define dynamic routes using URL parameters. For example, if you want to create a route that displays user profiles based on their user ID, you can define a route like this:
    ```javascript
    const appRouter = createBrowserRouter([
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />
      }
    ]);
    ```

---

## How to make API call in React

- To understand dynamic routing, imagine making a restaurant menu. Whenever you click on a restaurant, it shows the menu for that specific restaurant.

---

## Easiest way to write map function
- Example from `RestaurantMenu.js`:
```javascript
{itemCards.map((item) => (
  <li key={item.card.info.id}>
    {item.card.info.name} - ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
  </li>
))}
```
- Here, we use the `map` function to iterate over the `itemCards` array and render a list item (`<li>`) for each item. The `key` prop is set to a unique identifier (`item.card.info.id`) to help React identify which items have changed, are added, or are removed.

---

## How we change something in the API dynamically (use of `useParams`)
- To access the dynamic parameter from the URL (like `resId` in `/restaurant/:resId`), you can use the `useParams` hook from `react-router-dom`. This allows you to retrieve the value of the dynamic segment in your route.
    ```javascript
    import { useParams } from "react-router-dom";

    const RestaurantMenu = () => {
      const { resId } = useParams(); // Get the dynamic parameter from the URL
      // Use resId to fetch data or perform actions
    };
    ```


## React Router Link tag details (how it works under the hood)
- The `Link` tag from React Router uses an underlying `<a href="">` tag, but it prevents the default browser reload. Instead, it updates the URL and renders the new component, keeping the app as a single page.

## How we get the resId in our url like in our app?
- We did changes in the `AppLayout.js` file to include the `Link` tag with the `to` prop set to the dynamic route:
    ```javascript
    <Link to={`/restaurant/${resId}`}>View Menu</Link>
    ```
- This creates a link that, when clicked, navigates to the restaurant's menu page with the specific `resId` in the URL.
- Here /restaurant data comes from the RestaurantMenu.js file, and the `resId` is dynamically passed from the restaurant data from the earlier Api call.    