import flightsList from "../data/flightsList.json";

const { flights } = flightsList;

const flightListWrap = document.getElementById("flightsList");

const queryString = window.location.href;

const createFlightBox = (
  parentElement,
  backgroundImgSrc,
  outletCity,
  arrivalCity,
  id,
  planeType
) => {
  const flightBox = document.createElement("a");
  flightBox.classList.add("flightBox");
  flightBox.href = `/flight?id=${id}&plane=${planeType}`;

  const flightPlaces = document.createElement("h2");
  flightPlaces.classList.add("flightPlaces");

  const outletCityText = document.createElement("span");
  outletCityText.classList.add("outlet");
  outletCityText.textContent = outletCity;

  const arrivalCityText = document.createElement("span");
  arrivalCityText.classList.add("arrival");
  arrivalCityText.textContent = arrivalCity;

  flightPlaces.textContent = `${outletCity} - ${arrivalCity}`;

  flightBox.appendChild(flightPlaces);
  parentElement.appendChild(flightBox);
};

if (flightListWrap) {
  flights.forEach((flight) => {
    const {
      destinationOutlet,
      destinationArrival,
      imgPath,
      id,
      planeType,
    } = flight;
    createFlightBox(
      flightListWrap,
      imgPath,
      destinationOutlet,
      destinationArrival,
      id,
      planeType
    );
  });
}
