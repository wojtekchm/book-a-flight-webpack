import createSelectSeatInfo from "./createSelectSeatInfo";
import resultsPricing from "./resultsPricing";

let seatCounter = 0;
const submitReservationBtn = document.getElementById("submitReservationBtn");
const resultPricingWrap = document.getElementById("resultPricing");

const selectSeat = (seat, selectedPlaces, planes, planeName, finalPrice) => {
  seat.addEventListener("click", () => {
    // Pobieranie informacji na temat miejsca z svg
    const row = seat.parentElement;
    const rowId = row.getAttribute("id");
    const className = row.parentElement.getAttribute("id");
    const seatId = seat.getAttribute("id");
    const seatNumber = seatId.slice(1);
    const selectedPlacesWrap = document.getElementById("selectedPlaces");

    const selectedSeatList = document.querySelectorAll(".placeWrap");

    let selectSeatFlag = false;

    selectedSeatList.forEach((selectedSeat) => {
      if (selectedSeat.getAttribute("id") === seatId) {
        selectSeatFlag = true;
      }
    });

    if (selectSeatFlag) {
      const selectAgain = document.querySelector(`#selectedPlaces #${seatId}`);
      selectedPlacesWrap.removeChild(selectAgain);
      seat.classList.remove("active");
      selectSeatFlag = false;
      seatCounter--;
      resultsPricing(finalPrice);
    } else {
      if (seatCounter < 9) {
        seatCounter++;

        // Kolorowanie miejsca
        seat.classList.add("active");

        createSelectSeatInfo(
          row,
          rowId,
          className,
          seatId,
          seatNumber,
          selectedPlaces,
          planes,
          planeName,
          finalPrice
        );
        resultsPricing(finalPrice);
      } else {
        alert("Wybrano za dużo miejsc!");
      }
    }
    if (seatCounter < 1) {
      submitReservationBtn.classList.add("disabled");
      resultPricingWrap.classList.remove("active");
    } else {
      submitReservationBtn.classList.remove("disabled");
      resultPricingWrap.classList.add("active");
      const resultSeatCountText = document.getElementById("resultSeatCount");
      resultSeatCountText.textContent = seatCounter;
    }
  });
};

export default selectSeat;
