import {
    Routes,
    Route,
    Navigate,
    createBrowserRouter,
    RouterProvider,
    redirect,
} from "react-router-dom";
import Layout from "./Layout";
import React, { Suspense, useEffect } from "react";
import SessionProvider from "./SessionProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <div>Home</div>,
            },
            {
                path: "plan",
                element: <div>Plan</div>,
            },
            {
                path: "evaluate",
                element: <div>Evaluate</div>,
            },
            {
                path: "review",
                element: <div>Review</div>,
            },
        ],
    },
]);

const App = () => {
    return (
        <React.StrictMode>
            <SessionProvider>
                <RouterProvider router={router} />
            </SessionProvider>
        </React.StrictMode>
    );
};

export default App;
