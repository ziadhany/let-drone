import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Dashboard from "./Dashboard";
import Track from "./Track";
import Orders from "./Orders";
import UploadPrescription from "./UploadPrescription";
import Login from "./Login";
import SignUp from "./SignUp";
import Logout from "./Logout";
import EditPrescription from "./EditPrescription";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import AuthProvider from "./AuthProvider";
import Profile from "./Profile";
import Drone from "./Drone";
import AskDoctor from "./AskDoctor";



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
                path: "/forget-password",
                element: <ForgotPassword />,
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
                path: "/Dashboard",
                element: <Dashboard/>,
            },
            {
                path: "/profile",
                element: <PrivateRoute> <Profile/> </PrivateRoute>,
            },
            {
                path: "/upload-prescription",
                element: <PrivateRoute><UploadPrescription /></PrivateRoute>,
            },
            {
                path: "/edit-prescription",
                element: <PrivateRoute><EditPrescription /></PrivateRoute>,
            },
            {
                path: "/ask-doctor",
                element: <PrivateRoute><AskDoctor /></PrivateRoute>,
            },
            {
                path: "/orders",
                element: <PrivateRoute><Orders /></PrivateRoute>,
            },
            {
                path: "/track-orders/:orderId",
                element: <PrivateRoute><Track /></PrivateRoute>,
            },
            {
                path: "/drones/:droneId",
                element: <PrivateRoute><Drone /></PrivateRoute>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
