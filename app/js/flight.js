import flightsList from "../data/flightsList.json";
import planes from "../data/planes.json";

import createFlightInfo from "./flight/createFilghtInfo";
import createPlaneSeats from "./flight/createPlaneSeats";

const {flights} = flightsList;

const flightPage = document.getElementById("flightPage");

if (flightPage) {
    // Pobranie parametrow lotu z url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const planeName = urlParams.get("plane");
    const flightId = urlParams.get("id");

    // Pokazanie samlotu według przyjętego parametru
    const plane = document.getElementById(planeName);
    console.log(plane);
    plane.style.display = "block";

    flights.forEach((flight) => {
        const {id} = flight;

        if (id === flightId) {
            createFlightInfo(flight);
            createPlaneSeats(planeName, planes);
        }
    });
}
