const createFlightInfo = (flight) => {
    const {
        destinationArrival,
        destinationOutlet,
        flightNumber,
        dates,
    } = flight;

    const destinations = document.getElementById("destinations");
    destinations.textContent = `${destinationOutlet} - ${destinationArrival}`;

    const flightId = document.getElementById("flightId");
    flightId.textContent = flightNumber;

    const flightDate = document.getElementById("flightDate");
    const dateOption = document.createElement("option");

    dates.forEach((date) => {
        dateOption.setAttribute("value", `${date}`);
        dateOption.textContent = date;

        flightDate.appendChild(dateOption);
    });

    console.log(dates);
};

export default createFlightInfo;