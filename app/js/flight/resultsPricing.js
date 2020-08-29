const resultsPricing = (finalPrice) => {
  const allPrices = document.querySelectorAll("#price");
  allPrices.forEach((price) => {
    finalPrice += parseInt(price.textContent);
  });
  const resultPriceText = document.getElementById("resultPrice");
  resultPriceText.textContent = `${finalPrice}zł`;
};

export default resultsPricing;
