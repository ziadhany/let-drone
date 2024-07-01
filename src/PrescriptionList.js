import React, {useEffect, useState} from 'react';

const PrescriptionList = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [Prescriptions, setPrescriptions] = useState([]);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v0/pharmacist_prescriptions/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPrescriptions(data);
                    console.log(data);
                } else {
                    console.error("Failed to fetch prescriptions.");
                }
            } catch (error) {
                console.error("Error fetching prescriptions:", error);
            }
        };

        fetchPrescriptions();
    }, []);

    return (
        <>
            <div id="order-page" className="mt-5">
                <h2 className="text-3xl font-extrabold dark:text-white mt-5">Prescriptions List</h2>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-3">

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Prescription Files
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Approved
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                delivery_option
                            </th>
                            <th scope="col" className="px-6 py-3">
                                created_at
                            </th>
                            <th scope="col" className="px-6 py-3">
                                updated_at
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {Prescriptions.map((prescription, i) =>
                            <tr className="bg-white dark:bg-gray-800" key={i}>
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <a href={prescription.image}
                                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline">📋
                                        Prescription image</a>
                                </th>
                                <td className="px-6 py-4">
                                    {prescription.approved ? "✅" : "⏳"}
                                </td>
                                <td className="px-6 py-4">
                                    $ {prescription.price ? prescription.price : "⏳💰"}
                                </td>
                                <td className="px-6 py-4">
                                    {prescription.delivery_option}
                                </td>
                                <td className="px-6 py-4">
                                    {prescription.updated_at}
                                </td>
                                <td className="px-6 py-4">
                                    {prescription.created_at}
                                </td>
                                <td className="px-6 py-4">
                                    <a href={`prescription-edit/` + prescription.id}>Edit

                                        <svg width="24" height="24" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                            >
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>

                                    </a>
                                </td>
                            </tr>
                        )}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default PrescriptionList;