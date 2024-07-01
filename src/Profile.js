import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function Profile() {
    const [status, setStatus] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [date_of_birth, setDateBirth] = useState('');
    const [address, setAddress] = useState('');
    const [emergency_contact, setEmergencyContact] = useState('');
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v0/profile/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFirstName(data.user.first_name);
                    setLastName(data.user.last_name);
                    setEmail(data.user.email);
                    setDateBirth(data.date_of_birth);
                    setAddress(data.address);
                    setEmergencyContact(data.emergency_contact);
                    console.log(data);
                } else {
                    console.error("Failed to fetch prescriptions.");
                }
            } catch (error) {
                console.error("Error fetching prescriptions:", error);
            }

        };
        fetchProfile();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/v0/profile/', {
                user: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                },
                date_of_birth: date_of_birth,
                address: address,
                emergency_contact: emergency_contact,
            },{
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

           setStatus('profile saved successful');
        } catch (error) {
            console.error('fetch profile failed', error);
        }
    };

    return (
        <>

            <div className="h-screen w-screen bg-gray-100 pt-10">
                <div className="max-w-xl mx-auto bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <h1>{status}</h1>
                    <div className="flex items-center justify-center p-12">

                        <div className="mx-auto w-full max-w-[550px] bg-white">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                        First name
                                    </label>
                                    <input type="text" name="name" id="name" placeholder="First Name"
                                           value={first_name}
                                           onChange={(e) => setFirstName(e.target.value)}
                                           className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Last name
                                    </label>
                                    <input type="text" name="name" id="name" placeholder="Last Name"
                                           onChange={(e) => setLastName(e.target.value)}
                                           value={last_name}
                                           className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Email Address
                                    </label>
                                    <input type="email" name="email" id="email" placeholder="Enter your email"
                                           onChange={(e) => setEmail(e.target.value)}
                                           value={email}
                                           className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                </div>
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="date"
                                                   className="mb-3 block text-base font-medium text-[#07074D]">
                                                Date of birth
                                            </label>
                                            <input type="date" name="date" id="date"
                                                   onChange={(e) => setDateBirth(e.target.value)}
                                                   value={date_of_birth}
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Address
                                    </label>
                                    <input type="text" name="name" id="name" placeholder="Address"
                                           onChange={(e) => setAddress(e.target.value)}
                                           value={address}
                                           className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Emergency contact
                                    </label>
                                    <input type="text" name="name" id="name" placeholder="Enter your emergeny contract"
                                           value={emergency_contact}
                                           onChange={(e) => setEmergencyContact(e.target.value)}
                                           className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                </div>

                                <button
                                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
