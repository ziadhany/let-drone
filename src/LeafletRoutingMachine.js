import {useMap} from "react-leaflet";
import {useEffect} from "react";
import L from "leaflet";
import "leaflet-routing-machine"
import routingControl from "leaflet-routing-machine";

function LeafletRoutingMachine() {
    const map = useMap();
    useEffect(() => {
        const icon1 = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3180/3180151.png', // Replace with the path to your first custom icon
            iconSize: [32, 32], // Size of the icon
            iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
        });

        const icon2 = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/6009/6009864.png', // Replace with the path to your second custom icon
            iconSize: [32, 32], // Size of the icon
            iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
        });

        L.Routing.control({
            waypoints: [
                L.latLng(57.74, 11.94),
                L.latLng(57.6792, 11.949)
            ],
            draggable: true,
            addWaypoints: false, // Disable adding new waypoints
            dragWaypoints: false, // Disable dragging existing waypoints
            routeWhileDragging: false, // Disable route updating while dragging
            addRouteWhileDragging: false,
            createMarker: function(i, waypoint, n) {
                const icon = i === 0 ? icon1 : icon2;
                const marker = L.marker(waypoint.latLng, {
                    icon: icon, // Use the custom icon
                    draggable: false // Make the marker draggable
                });

                marker.on('dragend', function(event) {
                    const marker = event.target;
                    const position = marker.getLatLng();
                    marker.setLatLng(position, { draggable: false }).bindPopup(position.toString()).openPopup();
                    routingControl.spliceWaypoints(i, 1, position);
                });

                return marker;
            }

        }).addTo(map);
        // Hide the default instructions container if it exists
        const instructionsContainer = document.querySelector('.leaflet-routing-alternatives-container');
        if (instructionsContainer) {
            instructionsContainer.style.display = 'none';
        }
    }, []);
    return null;
}

export default LeafletRoutingMachine;