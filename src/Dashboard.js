import React from 'react';


export default function Dashboard() {
    return (
    <>
        <div className="h-screen w-screen bg-gray-100 pt-10">
            <div className="max-w-xl mx-auto bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto"
                         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                    <h2 className="mt-10 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">dashboard</h2>
                </div>
                <h1>Hello this is my dashboard!</h1>
            </div>
        </div>
    </>
    );
}
