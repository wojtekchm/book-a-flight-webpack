import resultsPricing from "./resultsPricing";

const pricingCalculate = (
  finalPrice,
  basePrice = 1,
  classPrice = 1,
  parentElement,
  discountValue = 1,
  laugage = 0
) => {
  const pricing = parentElement.querySelector("#price");
  pricing.textContent =
    parseInt(basePrice) * classPrice * discountValue + parseInt(laugage);
  resultsPricing(finalPrice);
};

export default pricingCalculate;
