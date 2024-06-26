import React, {useContext, useState} from 'react';
import logo from "./assets/img/let-drone.webp";
import axios from "axios";
import {AuthContext} from "./AuthContext";
import {useNavigate} from "react-router-dom";

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/register/', {
                email: email,
                username: username,
                password: password,
            });
            const accessToken = response.data.access_token;
            login(accessToken);
            console.log('Login successful');
            navigate('/dashboard'); // Redirect to the desired component
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <>
            <div className="h-screen w-screen bg-gray-100 pt-10">
                <div className="max-w-xl mx-auto bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-20 w-auto"
                             src={logo} alt="let-drone"/>
                        <h2 className="mt-10 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign
                            Up</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label className="block font-medium text-gray-700">Username</label>
                            <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="shadow-sm block w-full py-2 sm:text-sm rounded-md text-gray-800 disabled:bg-gray-200 sm:text-sm border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 focus:outline-none  "
                            name="username" required="" placeholder="First Name"/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="block font-medium text-gray-700">E-Mail Adress</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)}
                                                                                                           className="shadow-sm block w-full py-2 sm:text-sm rounded-md text-gray-800 disabled:bg-gray-200 sm:text-sm border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 focus:outline-none  "
                                                                                                           name="email"
                                                                                                           required=""
                                                                                                           placeholder="E-Mail Adress"/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="block font-medium text-gray-700">Password <span
                                className="text-gray-500 font-base text-sm">(Min. 6 chars)</span></label>
                            <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="shadow-sm block w-full py-2 sm:text-sm rounded-md text-gray-800 disabled:bg-gray-200 sm:text-sm border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 focus:outline-none  "
                            name="password" minLength="6" placeholder="Password" required=""/>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="block font-medium text-gray-600 font-normal flex items-start space-x-2">
                                <div><input type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600"
                                            required=""/></div>
                                <div>I have read and agree to the <a href="/legal/privacy" target="_blank"
                                                                     className="text-primary-600 hover:text-primary-700">Privacy
                                    Policy</a> and <a href="/legal/terms" target="_blank"
                                                      className="text-primary-600 hover:text-primary-700">Terms and
                                    Conditions</a>.
                                </div>
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none ring-2 ring-offset-2 ring-transparent ring-offset-transparent disabled:bg-gray-400 appearance-none text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-white w-full"
                                type="submit" name="_action" value="create">
                                <div className="relative">
                                    <div className="">Sign up</div>
                                    <div
                                        className="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg className="animate-spin h-5 w-5 text-white"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    stroke-width="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
