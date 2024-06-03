import React, { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";


export default function EditPrescription() {

    return (
        <Cropper
            src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={16 / 9}
            guides={false}
        />
    );
}

