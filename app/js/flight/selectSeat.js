import createSelectSeatInfo from "./createSelectSeatInfo";

const selectSeat = (seat, selectedPlaces, planes, planeName) => {
    seat.addEventListener("click", () => {
        // Kolorowanie miejsca
        seat.classList.toggle("active");

        // Pobieranie informacji na temat miejsca z svg
        const row = seat.parentElement;
        const rowId = row.getAttribute("id");
        const className = row.parentElement.getAttribute("id");
        const seatId = seat.getAttribute("id");
        const seatNumber = seatId.slice(1);

        createSelectSeatInfo(row, rowId, className, seatId, seatNumber, selectedPlaces, planes, planeName);

    });

}

export default selectSeat
