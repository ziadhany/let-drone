import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Profile from "./Profile";
import Track from "./Track";
import Orders from "./Orders";
import Prescription from "./Prescription";
import Login from "./Login";
import SignUp from "./SignUp";
import Logout from "./Logout";
import EditPrescription from "./EditPrescription";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/Logout",
                element: <Logout />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/upload-prescription",
                element: <Prescription />,
            },
            {
                path: "/edit-prescription",
                element: <EditPrescription />,
            },
            {
                path: "/orders",
                element: <Orders />,
            },
            {
                path: "/track",
                element: <Track />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
