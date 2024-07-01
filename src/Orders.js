import React, {useEffect, useState} from 'react';
import {ethers} from "ethers";
import Web3 from "web3";


const Orders = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [Prescriptions, setPrescriptions] = useState([]);
    const [Delivery, setDelivery] = useState([]);
    const token = localStorage.getItem('access_token');

    // Replace with your contract's ABI and address
    const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "uuid",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "status",
                    "type": "string"
                }
            ],
            "name": "PrescriptionAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "uuid",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "status",
                    "type": "string"
                }
            ],
            "name": "PrescriptionPaid",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_uuid",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_status",
                    "type": "string"
                }
            ],
            "name": "addPrescription",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_uuid",
                    "type": "string"
                }
            ],
            "name": "payForPrescription",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "prescriptions",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "uuid",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "status",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "exists",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contractAddress = '0xC446C844917D26b9f7F46Fcd702b2C0aEEBefA82';

    const connectWalletHandler = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum)
                const accounts = await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner()
                const address = await signer.getAddress()
                setDefaultAccount(address)

            } catch (error) {
                setErrorMessage(error.message);
            }
        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    }

    const payForPrescription = async (uuid, price) => {
        console.log(uuid, price)
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(window.ethereum);
                const contract = new web3.eth.Contract(contractABI, contractAddress);

                const accounts = await web3.eth.getAccounts();
                const amount = web3.utils.toWei(price, 'ether');

                await contract.methods.payForPrescription(uuid).send({
                    from: accounts[0],
                    value: amount,
                });

                alert('Payment successful and prescription status updated!');
            } catch (error) {
                console.error('Error paying for prescription:', error);
                alert('Payment failed.');
            }
        } else {
            alert('MetaMask is not installed!');
        }
    };

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v0/patients_prescriptions/', {
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

        const fetchTrackOrder = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v0/delivery/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setDelivery(data);
                    console.log(data);
                } else {
                    console.error("Failed to fetch delivery orders.");
                }
            } catch (error) {
                console.error("Error fetching delivery orders.", error);
            }
        };

        fetchTrackOrder();
    }, []);

    return (
        <>
            <div id="order-page">

                <div
                    className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 mt-14">
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our
                        available wallet providers or create a new one.</p>
                    <ul className="my-4 space-y-3">
                        <li>
                            <button href="#" onClick={() => connectWalletHandler()}
                                    className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <svg aria-hidden="true" className="h-4" viewBox="0 0 40 38" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z" fill="#E17726"/>
                                    <path d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z"
                                          fill="#E27625"/>
                                    <path
                                        d="M32.1656 27.0093L39.7516 27.1537L37.1004 36.1603L27.8438 33.6116L32.1656 27.0093Z"
                                        fill="#E27625"/>
                                    <path
                                        d="M7.83409 27.0093L12.1399 33.6116L2.89876 36.1604L0.263672 27.1537L7.83409 27.0093Z"
                                        fill="#E27625"/>
                                    <path
                                        d="M17.5203 10.8677L17.8304 20.8807L8.55371 20.4587L11.1924 16.4778L11.2258 16.4394L17.5203 10.8677Z"
                                        fill="#E27625"/>
                                    <path
                                        d="M22.3831 10.7559L28.7737 16.4397L28.8067 16.4778L31.4455 20.4586L22.1709 20.8806L22.3831 10.7559Z"
                                        fill="#E27625"/>
                                    <path d="M12.4115 27.0381L17.4768 30.9848L11.5928 33.8257L12.4115 27.0381Z"
                                          fill="#E27625"/>
                                    <path d="M27.5893 27.0376L28.391 33.8258L22.5234 30.9847L27.5893 27.0376Z"
                                          fill="#E27625"/>
                                    <path
                                        d="M22.6523 30.6128L28.6066 33.4959L23.0679 36.1282L23.1255 34.3884L22.6523 30.6128Z"
                                        fill="#D5BFB2"/>
                                    <path
                                        d="M17.3458 30.6143L16.8913 34.3601L16.9286 36.1263L11.377 33.4961L17.3458 30.6143Z"
                                        fill="#D5BFB2"/>
                                    <path d="M15.6263 22.1875L17.1822 25.4575L11.8848 23.9057L15.6263 22.1875Z"
                                          fill="#233447"/>
                                    <path d="M24.3739 22.1875L28.133 23.9053L22.8184 25.4567L24.3739 22.1875Z"
                                          fill="#233447"/>
                                    <path d="M12.8169 27.0049L11.9606 34.0423L7.37109 27.1587L12.8169 27.0049Z"
                                          fill="#CC6228"/>
                                    <path d="M27.1836 27.0049L32.6296 27.1587L28.0228 34.0425L27.1836 27.0049Z"
                                          fill="#CC6228"/>
                                    <path
                                        d="M31.5799 20.0605L27.6165 24.0998L24.5608 22.7034L23.0978 25.779L22.1387 20.4901L31.5799 20.0605Z"
                                        fill="#CC6228"/>
                                    <path
                                        d="M8.41797 20.0605L17.8608 20.4902L16.9017 25.779L15.4384 22.7038L12.3988 24.0999L8.41797 20.0605Z"
                                        fill="#CC6228"/>
                                    <path d="M8.15039 19.2314L12.6345 23.7816L12.7899 28.2736L8.15039 19.2314Z"
                                          fill="#E27525"/>
                                    <path d="M31.8538 19.2236L27.2061 28.2819L27.381 23.7819L31.8538 19.2236Z"
                                          fill="#E27525"/>
                                    <path
                                        d="M17.6412 19.5088L17.8217 20.6447L18.2676 23.4745L17.9809 32.166L16.6254 25.1841L16.625 25.1119L17.6412 19.5088Z"
                                        fill="#E27525"/>
                                    <path
                                        d="M22.3562 19.4932L23.3751 25.1119L23.3747 25.1841L22.0158 32.1835L21.962 30.4328L21.75 23.4231L22.3562 19.4932Z"
                                        fill="#E27525"/>
                                    <path
                                        d="M27.7797 23.6011L27.628 27.5039L22.8977 31.1894L21.9414 30.5138L23.0133 24.9926L27.7797 23.6011Z"
                                        fill="#F5841F"/>
                                    <path
                                        d="M12.2373 23.6011L16.9873 24.9926L18.0591 30.5137L17.1029 31.1893L12.3723 27.5035L12.2373 23.6011Z"
                                        fill="#F5841F"/>
                                    <path
                                        d="M10.4717 32.6338L16.5236 35.5013L16.4979 34.2768L17.0043 33.8323H22.994L23.5187 34.2753L23.48 35.4989L29.4935 32.641L26.5673 35.0591L23.0289 37.4894H16.9558L13.4197 35.0492L10.4717 32.6338Z"
                                        fill="#C0AC9D"/>
                                    <path
                                        d="M22.2191 30.231L23.0748 30.8354L23.5763 34.8361L22.8506 34.2234H17.1513L16.4395 34.8485L16.9244 30.8357L17.7804 30.231H22.2191Z"
                                        fill="#161616"/>
                                    <path
                                        d="M37.9395 0.351562L39.9998 6.53242L38.7131 12.7819L39.6293 13.4887L38.3895 14.4346L39.3213 15.1542L38.0875 16.2779L38.8449 16.8264L36.8347 19.1742L28.5894 16.7735L28.5179 16.7352L22.5762 11.723L37.9395 0.351562Z"
                                        fill="#763E1A"/>
                                    <path
                                        d="M2.06031 0.351562L17.4237 11.723L11.4819 16.7352L11.4105 16.7735L3.16512 19.1742L1.15488 16.8264L1.91176 16.2783L0.678517 15.1542L1.60852 14.4354L0.350209 13.4868L1.30098 12.7795L0 6.53265L2.06031 0.351562Z"
                                        fill="#763E1A"/>
                                    <path
                                        d="M28.1861 16.2485L36.9226 18.7921L39.7609 27.5398L32.2728 27.5398L27.1133 27.6049L30.8655 20.2912L28.1861 16.2485Z"
                                        fill="#F5841F"/>
                                    <path
                                        d="M11.8139 16.2485L9.13399 20.2912L12.8867 27.6049L7.72971 27.5398H0.254883L3.07728 18.7922L11.8139 16.2485Z"
                                        fill="#F5841F"/>
                                    <path
                                        d="M25.5283 5.17383L23.0847 11.7736L22.5661 20.6894L22.3677 23.4839L22.352 30.6225H17.6471L17.6318 23.4973L17.4327 20.6869L16.9139 11.7736L14.4707 5.17383H25.5283Z"
                                        fill="#F5841F"/>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">MetaMask</span>
                                <span
                                    className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                            </button>
                            <div className="mt-5">
                                <div className='accountDisplay'>
                                    <h3>Address: {defaultAccount}</h3>
                                </div>
                                {errorMessage}
                            </div>
                        </li>

                    </ul>
                    <div>
                        <a href="#"
                           className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            Why do I need to connect with my wallet?</a>
                    </div>
                </div>

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
                                Pay Now
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
                                    {prescription.price ? prescription.price : "⏳💰"} ETH
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
                                    <button type="button" disabled={prescription.approved ? !prescription.approved:true} onClick={() =>  payForPrescription(prescription.id, prescription.price)}
                                            className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                                        <svg className="w-4 h-4 me-2 -ms-1 text-[#626890]" aria-hidden="true"
                                             focusable="false" data-prefix="fab" data-icon="ethereum" role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                            <path fill="currentColor"
                                                  d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path>
                                        </svg>
                                        Pay with Ethereum
                                    </button>
                                </td>
                            </tr>
                        )}

                        </tbody>
                    </table>
                </div>

            </div>


            <div id="order-page">
                <h2 className="text-3xl font-extrabold dark:text-white mt-5">
                    Delivery Queue List
                </h2>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-3">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Drone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                estimated_delivery_time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                pickup_time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                created_at
                            </th>
                            <th scope="col" className="px-6 py-3">
                                updated_at
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Track
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {Delivery.map((delivery, i) =>
                            <tr className="bg-white dark:bg-gray-800" key={i}>
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <a href={"/drones/"+ delivery.drone.id}
                                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <img src={"https://cdn-icons-png.flaticon.com/512/3180/3180151.png"} className="max-w-7"/>
                                        </a>
                                </th>
                                <td className="px-6 py-4">
                                    { delivery.status }
                                </td>
                                <td className="px-6 py-4">
                                    {delivery.estimated_delivery_time}
                                </td>
                                <td className="px-6 py-4">
                                    {delivery.pickup_time}
                                </td>
                                <td className="px-6 py-4">
                                    {delivery.updated_at}
                                </td>
                                <td className="px-6 py-4">
                                    {delivery.created_at}
                                </td>
                                <td className="px-6 py-4">

                                    <a href={'track-orders/' + delivery.id}
                                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
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

export default Orders;