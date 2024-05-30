import React from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {Marker, Popup} from "react-leaflet";
export default function Track() {
    return (
        <main className="p-10 md:ml-64 h-auto pt-20">
            <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">

                <h1>Drone Map Drone MapDrone MapDrone MapDrone MapDrone MapDrone MapDrone MapDrone MapMapDrone Map</h1>


                <MapContainer center={[51.505, -0.09]} zoom={13} style={{height: "100%", width: "100%"}}
                              scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>


            </div>

        </main>

    )
        ;
}
