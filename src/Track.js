import React, {useEffect, useState} from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {Circle} from "react-leaflet";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import {useParams} from "react-router-dom";


export default function Track() {
    const { orderId } = useParams();
    const [ delivery, setDelivery] = useState({});
    const [ gcss, setGcss] = useState([]);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchDelivery = async (dId) => {
            const url = `http://127.0.0.1:8000/api/v0/delivery/${dId}`;
            try {
                const response = await fetch(url, {
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
                    console.error("Failed to fetch delivery order.");
                }
            } catch (error) {
                console.error("Error fetching delivery order:", error);
            }
        };
        console.log(orderId)
        fetchDelivery(orderId)

        const fetchGCS = async (dId) => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/v0/gcs/", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setGcss(data);
                    console.log(data);
                } else {
                    console.error("Failed to fetch gcs list.");
                }
            } catch (error) {
                console.error("Error fetching gcs list:", error);
            }
        };
        fetchGCS()
    }, []);

    if (!delivery || !delivery.drone){
        return <div>Loading...</div>;
    }

    return (
        <main className="p-10 md:ml-64 h-auto pt-20">
            <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-screen mb-4">
                <MapContainer center={[delivery.drone.current_location.latitude, delivery.drone.current_location.longitude]} zoom={20} style={{height: "100%", width: "100%"}}
                              scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {

                        gcss.map((gcs, i) => (
                            <Circle key={i} center={[gcs.current_location.latitude, gcs.current_location.longitude]} pathOptions={{fillColor: 'blue'}}
                                                    radius={5000}/>

                                ))
                    }


                    < LeafletRoutingMachine destination_point_latitude={delivery.pickup_location.latitude}
                                            destination_point_longitude={delivery.pickup_location.longitude}
                                            drone_point_latitude={delivery.drone.current_location.latitude }
                                            drone_point_longitude={delivery.drone.current_location.longitude }
                    />
                </MapContainer>
            </div>
        </main>

    );
}
