import React from 'react';
import logo from "./assets/img/let-drone.webp";

export default function Dashboard() {
    return (
    <>
        <div className="h-screen w-screen bg-gray-100 pt-10 ">
            <div className="max-w-3xl mx-auto bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-20 w-auto"
                         src={logo} alt="let-drone"/>
                </div>

                <section id="intro" className="container mx-auto py-16 px-4 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Let-Drone</h2>
                    <p className="text-lg text-gray-600">
                        Let-Drone is an innovative decentralized application designed to leverage blockchain technology and smart contracts for efficient and transparent drone management.
                    </p>
                </section>


                <section id="features" className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Decentralized Platform</h3>
                                <p className="text-gray-600">
                                    Utilizing blockchain to ensure transparency and security with a peer-to-peer network.
                                </p>
                            </div>

                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Smart Contracts</h3>
                                <p className="text-gray-600">
                                    Automating processes like flight permissions, data sharing, and payments in a trustless environment.
                                </p>
                            </div>

                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Drone Management</h3>
                                <p className="text-gray-600">
                                    Efficient scheduling and management of drone flights with real-time tracking.
                                </p>
                            </div>

                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Data Sharing</h3>
                                <p className="text-gray-600">
                                    Secure exchange of data between drones and users with immutable records.
                                </p>
                            </div>

                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Payment System</h3>
                                <p className="text-gray-600">
                                    Supporting cryptocurrency payments and automated transactions via smart contracts.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="how-it-works" className="container mx-auto py-16 px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
                    <p className="text-lg text-gray-600">
                        Let-Drone leverages smart contracts and ActivityPub to provide a seamless and efficient experience in managing drone operations.
                    </p>
                </section>


                <section id="benefits" className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Transparency and Security</h3>
                                <p className="text-gray-600">
                                    Ensuring transparency and security in all operations with blockchain technology.
                                </p>
                            </div>

                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Interoperability</h3>
                                <p className="text-gray-600">
                                    Seamless communication with other federated platforms via ActivityPub.
                                </p>
                            </div>

                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Cost Efficiency</h3>
                                <p className="text-gray-600">
                                    Reducing operational costs by eliminating intermediaries.
                                </p>
                            </div>

                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Automation and Efficiency</h3>
                                <p className="text-gray-600">
                                    Enhancing efficiency and reducing manual errors through automation.
                                </p>
                            </div>

                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Trust and Reliability</h3>
                                <p className="text-gray-600">
                                    Providing a trustless environment with smart contracts, ensuring reliability.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                <footer className="bg-blue-600 py-6">
                    <div className="container mx-auto text-center">
                        <p className="text-white">&copy; 2024 Let-Drone. All rights reserved.</p>
                    </div>
                </footer>

            </div>
        </div>
    </>
    );
}
