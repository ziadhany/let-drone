import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const Drone = () => {
    const [drone, setDrone] = useState();
    const { droneId } = useParams();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchDrone = async (dId) => {
            const url = `http://127.0.0.1:8000/api/v0/drones/${dId}`;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setDrone(data);
                    console.log(data);
                } else {
                    console.error("Failed to fetch drone.");
                }
            } catch (error) {
                console.error("Error fetching drone:", error);
            }
        };
        console.log(droneId)
        fetchDrone(droneId)
    }, []);

    if (!drone) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div id="order-page">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-3">
                    <div>
                        <h1>Drone Details</h1>
                        <p><strong>ID:</strong> {drone.id}</p>
                        <p><strong>Model:</strong> {drone.model}</p>
                        <p><strong>Battery Level:</strong> {drone.battery_level}</p>
                        <p><strong>Current Location latitude:</strong> <a>{drone.current_location.latitude}</a></p>
                        <p><strong>Current Location longitude:</strong> <a>{drone.current_location.longitude}</a></p>
                        <p><strong>Current Location altitude:</strong> <a>{drone.current_location.altitude}</a></p>
                        <p><strong>Payload Capacity:</strong> {drone.payload_capacity}</p>
                        <p><strong>Created At:</strong> {new Date(drone.created_at).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(drone.updated_at).toLocaleString()}</p>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Drone;