import React, {useContext, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "./AuthContext";
import logo from "./assets/img/let-drone.webp";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/token/', {
                grant_type: 'password',
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
            <div className="max-w-xl mx-auto bg-white py-8 px-8 mt-12 shadow sm:rounded-lg sm:px-10 justify-center lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-32 w-auto"
                         src={logo} alt="let-drone"/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in
                        to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username
                                </label>
                            <div className="mt-2">
                                <input id="username" name="username" type="text" autoComplete="email"
                                       value={username} onChange={(e) => setUsername(e.target.value)}
                                       required
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    <a href="/forget-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                        password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password"
                                       value={password} onChange={(e) => setPassword(e.target.value)}
                                       required
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                in
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <a href="/signup"
                           className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2">Sign Up</a>
                    </p>
                </div>
            </div>

        </>
    );

};

export default Login;
