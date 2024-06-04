import React, { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import prescription from "./assets/img/vio-4.jpg";
export default function EditPrescription() {

    return (
        <>
            <main className="p-10 md:ml-64 h-auto pt-20">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Better Data</span> Save
                    Lives.</h1>

                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
                    <form>
                        <input className="w-5/6 bg-gray-50 border border-gray-300"/>
                        <input type={"submit"} className="w-1/12 ml-5" value="Predict Text 🔍"/>
                    </form>
                    <div>
                        <Cropper
                            src={prescription}
                            style={{height: 600, width: "100%"}}
                            // Cropper.js options
                            initialAspectRatio={16 / 9}
                            guides={true}
                        />
                    </div>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <form>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Prescription List
                        </label>

                        <textarea className="w-full bg-gray-50 border border-gray-300"/>
                        <hr className="h-px my-8 bg-gray-200 border-0"/>
                        <label htmlFor="message"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price
                        </label>

                        <input type={"text"} className="" placeholder="$"/>
                        <hr className="h-px my-8 border-0 "/>
                        <input type={"submit"} className="w-3/6 mr-5 font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" value="Approved ✅"/>
                        <input type={"submit"} className="w-2/6 font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" value="Un Approved ❌"/>

                    </form>
                </div>

            </main>

        </>
    )
        ;
}

