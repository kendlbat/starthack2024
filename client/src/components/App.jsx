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
import EvaluatePage from "./pages/EvaluatePage";
import PlanPage from "./pages/PlanPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
                element: <PlanPage />,
            },
            {
                path: "evaluate",
                element: <EvaluatePage />,
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
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <RouterProvider router={router} />
                </SessionProvider>
            </QueryClientProvider>
        </React.StrictMode>
    );
};

export default App;
