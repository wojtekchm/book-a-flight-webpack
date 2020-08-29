import selectSeat from "./selectSeat";

const createPlaneSeats = (planeName, planes, finalPrice) => {
  const seats = document.querySelectorAll(".class g g");
  const selectedPlaces = document.getElementById("selectedPlaces");

  seats.forEach((seat) => {
    selectSeat(seat, selectedPlaces, planes, planeName, finalPrice);
  });
};

export default createPlaneSeats;
