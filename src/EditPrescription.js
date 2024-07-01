import React, {createRef, useEffect, useState} from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import init_prescription from "./assets/img/vio-4.jpg";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const EditPrescription = () => {
        const [selectedFile, setSelectedFile] = useState(init_prescription);
        const [submitStatus, setSubmitStatus] = useState('');
        const [predictRes, setPredictRes] = useState("");

        // Prescription States
        const [content, setContent] = useState(null);
        const [author, setAuthor] = useState(null);
        const [approved, setApproved] = useState(false);
        const [price, setPrice] = useState(null);

        const token = localStorage.getItem('access_token');
        const cropperRef  = createRef();
        const { prescriptionId } = useParams();
        const navigate = useNavigate();

        useEffect(() => {
            fetchPrescription()

        }, []);


        const fetchPrescription = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v0/pharmacist_prescriptions/${prescriptionId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setContent(data.content)
                setAuthor(data.author)
                setApproved(data.approved)
                setPrice(data.price)
                setSelectedFile(data.image)
                console.log(data);
            } else {
                console.error("Failed to fetch prescriptions.");
            }
        } catch (error) {
            console.error("Error fetching prescriptions:", error);
        }
    };

        const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('content', content);
            formData.append('price', price);
            formData.append('approved', approved);

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v0/pharmacist_prescriptions/${prescriptionId}/`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData
                });

                if (response.ok) {
                    setSubmitStatus('prescription update successfully!');
                    navigate('/prescription-list');
                } else {
                    setSubmitStatus('Failed to submit prescription.');
                }
            } catch (error) {
                setSubmitStatus('Failed to submit prescription.');
                console.error(error);
            }

        };

        const handlePrediction = async (e) => {
            e.preventDefault();
            const cropper = cropperRef.current.cropper;
            cropper.getCroppedCanvas().toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('image', new File([blob], "fileName.png", { type: "png" }));
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/v0/ocr/', formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (response.status === 200) {
                        console.log(response.data);
                        setPredictRes(response.data)
                    } else {
                        this.setState({ uploadStatus: 'Failed to upload image.' });
                    }
                } catch (error) {
                    this.setState({ uploadStatus: 'Failed to upload image.' });
                    console.error(error);
                }
            });
        };

        return (
            <>

                <main className="p-10 md:ml-64 h-auto pt-20">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Better Data Save Lives.</span></h1>

                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
                        <form>
                            <div>
                                <Cropper
                                    src={selectedFile}
                                    style={{height: 600, width: "100%"}}
                                    initialAspectRatio={16 / 9}
                                    guides={true}
                                    ref={cropperRef}
                                />
                            </div>

                            <div className="mt-7">
                                <input className="w-5/6 bg-gray-50 border border-gray-300" disabled={true} value={predictRes["text"]}  />
                                <button type={"submit"} className="w-1/12 ml-14" onClick={handlePrediction}>
                                    Predict Text  🔍
                                </button>
                            </div>
                        </form>

                        <hr className="h-px my-8 bg-gray-200 border-0 "/>
                        <form onSubmit={handleSubmit}>

                            <h1>{submitStatus}</h1>
                            {author?
                            <div className="mb-5">
                                <p><strong>Patient Card</strong></p>
                                <p>username : {author.user.username}</p>
                                <p>date_of_birth : {author.date_of_birth}</p>
                                <p>Address : {author.address}</p>
                                <p>Phone : {author.emergency_contact}</p>

                            </div>
                                :<hr/>
                            }
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Prescription List
                            </label>

                            <textarea className="w-full border" onChange={(e) => setContent(e.target.value)}
                                      value={content} />


                            <hr className="h-px my-8 border-0"/>
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium dark:text-white">Price
                            </label>
                            <input type={"text"} className="" placeholder="$" value={price}
                                       onChange={(e) => setPrice(e.target.value)}
                            />
                            <hr className="h-px my-8 border-0"/>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={approved} className="sr-only peer"
                                       onChange={(e) => setApproved(!approved)}
                                />
                                <div
                                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span
                                    className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Approved</span>
                            </label>


                            <hr className="h-px my-8 border-0 "/>
                            <input type={"submit"}
                                   className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                   value="Save"/>
                        </form>
                    </div>
                </main>
            </>
        );


}

export default EditPrescription;
