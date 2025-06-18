import React, { lazy,Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer.js";
//import Grocery from "./components/Grocery";
//instead of this we use lazy loading

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
    return <div className="app">
        <Header />
        <Outlet />
    </div>
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children:
            [
                {
                    path: "/",
                    element: <Body />
                },
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: "/contact",
                    element: <Contact />
                },
                {
                    path: "/restaurant/:resId",
                    element: <RestaurantMenu />
                },
                {
                    path: "/grocery",
                    element: (<Suspense fallback={<Shimmer />}><Grocery /></Suspense>)
                }

            ],
        errorElement: <Error />,

    },

]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
