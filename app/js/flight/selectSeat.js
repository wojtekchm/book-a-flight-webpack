import createSelectSeatInfo from "./createSelectSeatInfo";

let seatCounter = 0;

const selectSeat = (seat, selectedPlaces, planes, planeName) => {
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
          planeName
        );
      } else {
        alert("Wybrano za dużo miejsc!");
      }
      console.log(seatCounter);
    }
  });
};

export default selectSeat;
