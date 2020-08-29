import createHtmlElement from "../utilities/createHtmlElement";
import pricingCalculate from "./pricingCalculate";

import discount from "../../data/discountList.json";
import classNameConvert from "./classNameConvert";

const {discountList} = discount;


const createSelectSeatInfo = (row, rowId, className, seatId, seatNumber, selectedPlaces, planes, planeName) => {
    const placeWrap = createHtmlElement("div", "placeWrap");
    placeWrap.setAttribute("id", seatId);
    const classText = createHtmlElement("p", "title");

    classNameConvert(className, classText, 'Klasa')
    placeWrap.appendChild(classText);

    const seatText = createHtmlElement("p", "title");
    seatText.innerHTML = `Miejsce: <span>${seatNumber}</span>`;
    placeWrap.appendChild(seatText);

    const rowText = createHtmlElement("p", "title");
    rowText.innerHTML = `Rząd: <span>${rowId.toUpperCase()}</span>`;
    placeWrap.appendChild(rowText);

    const discountSelect = createHtmlElement("select", "discount");
    const defaultOption = createHtmlElement("option", "option");
    defaultOption.setAttribute("value", "1");
    defaultOption.setAttribute("selected", "selected");
    defaultOption.setAttribute("disabled", "disabled");
    defaultOption.textContent = "Wybierz taryfe";
    discountSelect.appendChild(defaultOption);

    discountList.forEach((discountOption) => {
        const selectOption = createHtmlElement("option", "option");
        selectOption.setAttribute("value", discountOption.discount);
        selectOption.textContent = discountOption.type;

        discountSelect.appendChild(selectOption);
    });

    placeWrap.appendChild(discountSelect);

    const checkboxInputWrap = createHtmlElement("div", "laug");
    const checkboxInput = createHtmlElement("input", "checkboxInput");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute("id", `laug${rowId + seatId}`);

    const checkboxLabel = createHtmlElement("label", "laugLabel");
    checkboxLabel.setAttribute("for", `laug${rowId + seatId}`);
    checkboxLabel.textContent = "Dodatkowy bagaż (do 10kg)";

    checkboxInputWrap.appendChild(checkboxInput);
    checkboxInputWrap.appendChild(checkboxLabel);
    placeWrap.appendChild(checkboxInputWrap);

    const pricing = createHtmlElement("p", "title");
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
            pricingCalculate(
                basePrice,
                classPrice,
                placeWrap,
                discountSelectChange.value,
                laguagePrice
            );
        } else if (checkboxChange.checked === false) {
            pricingCalculate(
                basePrice,
                classPrice,
                placeWrap,
                discountSelectChange.value
            );
        }
    });

    const checkboxChange = placeWrap.querySelector("input");

    checkboxChange.addEventListener("change", () => {
        if (checkboxChange.checked === true) {
            pricingCalculate(
                basePrice,
                classPrice,
                placeWrap,
                discountSelectChange.value,
                laguagePrice
            );
        } else if (checkboxChange.checked === false) {
            pricingCalculate(
                basePrice,
                classPrice,
                placeWrap,
                discountSelectChange.value
            );
        }
    });

    selectedPlaces.appendChild(placeWrap);
}

export default createSelectSeatInfo;