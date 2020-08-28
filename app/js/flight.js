import flightsList from "../data/flightsList.json";
import planes from "../data/planes.json";

console.log(planes);

const discountList = [
  { type: "Dziecko", discount: "0.5" },
  { type: "Dorosły", discount: "1" },
  { type: "Senior", discount: "0.8" },
];
const { flights } = flightsList;

const changePricing = (
  basePrice = 1,
  classPrice = 1,
  parentElement,
  discountValue = 1,
  laugage = 0
) => {
  const pricing = parentElement.querySelector("#price");
  pricing.textContent =
    parseInt(basePrice) * classPrice * discountValue + parseInt(laugage);
};

const flightPage = document.getElementById("flightPage");

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

if (flightPage) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const planeName = urlParams.get("plane");
  const flightId = urlParams.get("id");

  const plane = document.getElementById(planeName);
  console.log(plane);
  plane.style.display = "block";

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

  const createPlaneSeats = () => {
    const seats = document.querySelectorAll(".class g g");
    const selectedPlaces = document.getElementById("selectedPlaces");
    let seatsCounter = 0;
    let selectedSeats = [];
    seats.forEach((seat) => {
      seat.addEventListener("click", () => {
        if (seatsCounter < 9) {
          seatsCounter++;
          seat.classList.toggle("active");
          const row = seat.parentElement;
          const rowId = row.getAttribute("id");
          const className = row.parentElement.getAttribute("id");
          const seatId = seat.getAttribute("id");
          const seatNumber = seatId.slice(1);

          selectedSeats.push(seatId);

          console.log(selectedSeats);

          const placeWrap = createElement("div", "placeWrap");
          placeWrap.setAttribute("id", seatId);
          const classText = createElement("p", "title");

          switch (className) {
            case "business":
              classText.innerHTML = "Klasa: <span>Bisnesowa</span>";
              break;
            case "economic":
              classText.innerHTML = "Klasa: <span>Ekonomiczna</span>";
              break;
            case "premium":
              classText.innerHTML = "Klasa: <span>Premium</span>";
              break;
            default:
              classText.innerHTML = "Klasa: <span>Ekonomiczna</span>";
              break;
          }
          placeWrap.appendChild(classText);

          const seatText = createElement("p", "title");
          seatText.innerHTML = `Miejsce: <span>${seatNumber}</span>`;
          placeWrap.appendChild(seatText);

          const rowText = createElement("p", "title");
          rowText.innerHTML = `Rząd: <span>${rowId.toUpperCase()}</span>`;
          placeWrap.appendChild(rowText);

          const discountSelect = createElement("select", "discount");
          const defaultOption = createElement("option", "option");
          defaultOption.setAttribute("value", "1");
          defaultOption.setAttribute("selected", "selected");
          defaultOption.setAttribute("disabled", "disabled");
          defaultOption.textContent = "Wybierz taryfe";
          discountSelect.appendChild(defaultOption);

          discountList.forEach((discountOption) => {
            const selectOption = createElement("option", "option");
            selectOption.setAttribute("value", discountOption.discount);
            selectOption.textContent = discountOption.type;

            discountSelect.appendChild(selectOption);
          });

          placeWrap.appendChild(discountSelect);

          const checkboxInputWrap = createElement("div", "laug");
          const checkboxInput = createElement("input", "checkboxInput");
          checkboxInput.setAttribute("type", "checkbox");
          checkboxInput.setAttribute("id", `laug${rowId + seatId}`);

          const checkboxLabel = createElement("label", "laugLabel");
          checkboxLabel.setAttribute("for", `laug${rowId + seatId}`);
          checkboxLabel.textContent = "Dodatkowy bagaż (do 10kg)";

          checkboxInputWrap.appendChild(checkboxInput);
          checkboxInputWrap.appendChild(checkboxLabel);
          placeWrap.appendChild(checkboxInputWrap);

          const pricing = createElement("p", "title");
          const basePrice = planes[planeName].pricing.basePrice;
          const classPrice = planes[planeName].pricing[className];
          const laguagePrice = planes[planeName].pricing.extraLaugage;

          pricing.innerHTML = `Cena: <span id="price">${
            basePrice * classPrice
          }</span>`;
          placeWrap.appendChild(pricing);

          const discountSelectChange = placeWrap.querySelector(".discount");

          discountSelectChange.addEventListener("change", () => {
            if (checkboxChange.checked === true) {
              changePricing(
                basePrice,
                classPrice,
                placeWrap,
                discountSelectChange.value,
                laguagePrice
              );
            } else if (checkboxChange.checked === false) {
              changePricing(
                basePrice,
                classPrice,
                placeWrap,
                discountSelectChange.value
              );
            }
          });

          const checkboxChange = placeWrap.querySelector("input");

          console.log(checkboxChange);

          checkboxChange.addEventListener("change", () => {
            if (checkboxChange.checked === true) {
              changePricing(
                basePrice,
                classPrice,
                placeWrap,
                discountSelectChange.value,
                laguagePrice
              );
            } else if (checkboxChange.checked === false) {
              changePricing(
                basePrice,
                classPrice,
                placeWrap,
                discountSelectChange.value
              );
            }
          });

          selectedPlaces.appendChild(placeWrap);
        } else {
          alert("Wybrano za dużo miejsc!");
        }
      });
    });
  };

  flights.forEach((flight) => {
    const { id } = flight;

    if (id === flightId) {
      console.log(flight);
      createFlightInfo(flight);
      createPlaneSeats();
    }
  });
}
