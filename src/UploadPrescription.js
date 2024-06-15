import React, { Component } from 'react';
import axios from 'axios';

class UploadPrescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            uploadStatus: "",
            location: "",
            error:""
        };
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

        if (file && allowedFormats.includes(file.type)) {
            this.setState({ selectedFile: file });
        } else {
            this.setState({ uploadStatus: 'Invalid file format. Please upload an image in JPG, PNG, GIF, or SVG format.' });
        }
    };

    handleUpload = async () => {
        const { selectedFile } = this.state;
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v0/patients_prescriptions/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer 6fhV1ZDZ27B2jmcZMiLHN2lfAYLcby`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                this.setState({ uploadStatus: 'Image uploaded successfully!' });
                console.log(data);
            } else {
                this.setState({ uploadStatus: 'Failed to upload image.' });
            }
        } catch (error) {
            this.setState({ uploadStatus: 'Failed to upload image.' });
            console.error(error);
        }

    };


    fetchLocation = (e) => {
        if (e.target.value === 'DRONE') {
            // if geolocation is supported by the users browser
            if (navigator.geolocation) {
                // get the current users location
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // save the geolocation coordinates in two variables
                        const {latitude, longitude} = position.coords;
                        // update the value of user location variable
                        this.state.location=  {latitude, longitude};
                        console.log(this.state.location)
                    },
                    // if there was an error getting the users location
                    (error) => {
                        console.error('Error getting user location:', error);
                    }
                );
            }
            // if geolocation is not supported by the users browser
            else {
                console.error('Geolocation is not supported by this browser.');
            }
        }
    };

    render() {
        const { uploadStatus } = this.state;

        return (
            <>
                <div id="order-page" className="mt-14">
                    {uploadStatus && <p>{uploadStatus}</p>}
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Upload Prescription</h3>

                    <div className="flex items-center justify-center mb-5 w-3/6">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                    className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                    800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={this.handleFileChange}/>
                        </label>
                    </div>

                    <div className="w-3/6 mb-5">
                        <label htmlFor="countries"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Delivery options</label>
                        <select id="countries"
                                onChange={this.fetchLocation}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Delivery options</option>
                            <option value="PICKUP">Pickup</option>
                            <option value="DRONE">Drone Delivery</option>
                        </select>
                        <h3>{ this.state.error }</h3>
                    </div>

                    <button onClick={this.handleUpload}
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Upload Medical prescription
                    </button>
                </div>
            </>
        );
    }
}

export default UploadPrescription;
