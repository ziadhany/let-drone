import {useMap} from "react-leaflet";
import {useEffect} from "react";
import L from "leaflet";
import "leaflet-routing-machine"

function LeafletRoutingMachine() {
    const map = useMap();
    useEffect(() => {
        L.Routing.control({
            waypoints: [
                L.latLng(57.74, 11.94),
                L.latLng(57.6792, 11.949)
            ]
        }).addTo(map);
    }, []);
    return null;
}

export default LeafletRoutingMachine;