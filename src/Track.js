import React from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {Circle} from "react-leaflet";
import LeafletRoutingMachine from "./LeafletRoutingMachine";


export default function Track() {

    return (
        <main className="p-10 md:ml-64 h-auto pt-20">
            <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-screen mb-4">
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{height: "100%", width: "100%"}}
                              scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circle
                        center={[51.505, -0.09]}
                        pathOptions={{ fillColor: 'blue' }}
                        radius={500}
                    />

                    < LeafletRoutingMachine />
                </MapContainer>
            </div>
        </main>

    );
}
