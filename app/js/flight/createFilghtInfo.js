const createFlightInfo = (flight) => {
  const {
    destinationArrival,
    destinationOutlet,
    flightNumber,
    dates,
    planeName,
  } = flight;

  const destinations = document.getElementById("destinations");
  destinations.textContent = `${destinationOutlet} - ${destinationArrival}`;

  const flightId = document.getElementById("flightId");
  flightId.textContent = flightNumber;

  const planeNameText = document.getElementById("planeName");
  planeNameText.textContent = planeName;

  const flightDate = document.getElementById("flightDate");

  dates.forEach((dateObj) => {
    const dateOption = document.createElement("option");
    const { date, day, arrivalHour, outletHour } = dateObj;
    const dateString = `${date} - ${day} - ${arrivalHour}-${outletHour}`;
    dateOption.setAttribute("value", `${dateString}`);
    dateOption.textContent = dateString;

    flightDate.appendChild(dateOption);
  });
};

export default createFlightInfo;
