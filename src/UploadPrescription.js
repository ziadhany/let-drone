import React, { Component } from 'react';
import axios from 'axios';

class UploadPrescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            uploadStatus: ''
        };
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];
        this.setState({ selectedFile: file });
    };


    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleUpload = async () => {
        const { selectedFile } = this.state;
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v0/ocr/', {
                method: 'POST',
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

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
        let url = 'http://127.0.0.1:8000/api/v0/ocr/';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    };

    render() {
        const { uploadStatus } = this.state;

        return (
        <>
            <div id="order-page" className="mt-14">
                    { uploadStatus && <p>{uploadStatus}</p> }
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Upload Prescription</h3>

                        <div className="flex items-center justify-center w-full mb-5">
                        <label htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">

                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                        className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                        800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={this.handleFileChange}/>
                        </label>
                        </div>

                        <button onClick={this.handleUpload}
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Upload
                        Medical prescription
                        </button>

                    </div>
        </>
    );
}
}


export default UploadPrescription;