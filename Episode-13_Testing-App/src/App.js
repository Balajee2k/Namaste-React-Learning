import { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer.js";
import { useState } from "react";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Cart from "./components/Cart.js";

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
    //Authentication logic can be added here to understand UserContext. Provider logic that how can we use and where to use this concept of provider
    const [UserName, setUserName] = useState();

    useEffect(() => {
        const data = {
            name: "Balajee"
        };
        setUserName(data.name);

    }, []);



    /* Provider is used to provide the store to the components so i want to give here provider to the Header and outlet
    If you want to Provide to any specific component then you can do it */
    return (
        <Provider store={appStore}>

            <UserContext.Provider value={{ loggedInUser: UserName, setUserName }}>
                <div className="app">
                    <Header />
                    <Outlet />
                </div>
            </UserContext.Provider>

        </Provider>
    )
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
                },
                {
                    path: "/cart",
                    element: <Cart/>
                },

            ],
        errorElement: <Error />,

    },

]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
