import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";

import Window1 from "./routes/window1";
import Window2 from "./routes/window2";
import Window3 from "./routes/window3";

import ErrorPage from "./components/ErrorPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Window1 />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/window2",
        element: <Window2 />,
    },
    {
        path: "/:project",
        element: <Window3 />,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);