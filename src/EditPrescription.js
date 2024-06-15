import React, { Component, createRef } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import prescription from "./assets/img/vio-4.jpg";
import axios from "axios";

class EditPrescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: prescription,
            uploadStatus: '',
            imageUrl: null,
            predictRes: "",
        };
        this.cropperRef = createRef();
    }

    handleSubmit = async () => {
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

    handlePrediction = async (e) => {
        e.preventDefault();
        const cropper = this.cropperRef.current.cropper;
        cropper.getCroppedCanvas().toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('image', new File([blob], "fileName.png", { type: "png" }));
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/v0/ocr/', formData, {
                    headers: {
                        'Authorization': `Bearer 6fhV1ZDZ27B2jmcZMiLHN2lfAYLcby`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {
                    this.setState({ uploadStatus: 'Image uploaded successfully!' });
                    console.log(response.data);
                    this.state.predictRes = response.data
                } else {
                    this.setState({ uploadStatus: 'Failed to upload image.' });
                }
            } catch (error) {
                this.setState({ uploadStatus: 'Failed to upload image.' });
                console.error(error);
            }
        });
    };

    render() {
        return (
            <>

                <main className="p-10 md:ml-64 h-auto pt-20">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Better Data Save Lives.</span></h1>

                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
                        <form>
                            <div>
                                <Cropper
                                    src={this.state.selectedFile}
                                    style={{height: 600, width: "100%"}}
                                    initialAspectRatio={16 / 9}
                                    guides={true}
                                    ref={this.cropperRef}
                                />
                            </div>

                            <div className="mt-7">
                                <input className="w-5/6 bg-gray-50 border border-gray-300" disabled={true} value={this.state.predictRes["text"]}  />
                                <button type={"submit"} className="w-1/12 ml-14" onClick={this.handlePrediction}>
                                    Predict Text  🔍
                                </button>
                            </div>
                        </form>

                        <hr className="h-px my-8 bg-gray-200 border-0 "/>
                        <form>
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Prescription List
                            </label>

                            <textarea className="w-full border"/>
                            <hr className="h-px my-8 border-0"/>
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium dark:text-white">Price
                            </label>
                            <input type={"text"} className="" placeholder="$"/>
                            <hr className="h-px my-8 border-0"/>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer"/>
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
}

export default EditPrescription;
