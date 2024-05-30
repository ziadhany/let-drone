import React from 'react';

export default function Prescription() {
    return (
        <>
            <div id="order-page">
                <form className="max-w-lg mx-auto" id="upload-perception">
                        <div className="flex items-center justify-center w-full mb-5">
                            <label htmlFor="dropzone-file"
                                   className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                        className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                        800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden"/>
                            </label>
                        </div>


                        <fieldset className="mb-5">
                            <legend className="sr-only">Checkbox variants</legend>

                            <div className="flex items-center mb-4">
                                <input checked id="checkbox-1" type="checkbox" value=""
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-1"
                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to
                                    the <a className="text-blue-600 hover:underline dark:text-blue-500">terms
                                        and
                                        conditions</a>.</label>
                            </div>

                            <div className="flex items-center mb-4">
                                <input id="checkbox-2" type="checkbox" value=""
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-2"
                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I want to
                                    get
                                    promotional offers</label>
                            </div>

                            <div className="flex items-center mb-4">
                                <input id="checkbox-3" type="checkbox" value=""
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-3"
                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I am 18
                                    years
                                    or older</label>
                            </div>

                            <div className="flex mb-4">
                                <div className="flex items-center h-5">
                                    <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox"
                                           value=""
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </div>
                                <div className="ms-2 text-sm">
                                    <label htmlFor="helper-checkbox"
                                           className="font-medium text-gray-900 dark:text-gray-300">Free shipping via
                                        Flowbite</label>
                                    <p id="helper-checkbox-text"
                                       className="text-xs font-normal text-gray-500 dark:text-gray-400">For orders
                                        shipped
                                        from $25 in books or $29 in other categories</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input id="international-shipping-disabled" type="checkbox" value=""
                                       className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                       disabled/>
                                <label htmlFor="international-shipping-disabled"
                                       className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">Eligible
                                    for
                                    international shipping (disabled)</label>
                            </div>
                        </fieldset>

                        <button type="button"
                                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Upload
                            Medical prescription
                        </button>
                </form>
            </div>
        </>
);
}
