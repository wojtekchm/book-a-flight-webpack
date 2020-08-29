const classNameConvert = (className, element, text) => {
  switch (className) {
    case "business":
      element.innerHTML = `${text}: <span>Biznesowa</span>`;
      break;
    case "economic":
      element.innerHTML = `${text}: <span>Ekonomiczna</span>`;
      break;
    case "premium":
      element.innerHTML = `${text}: <span>Premium</span>`;
      break;
    default:
      element.innerHTML = `${text}: <span>Ekonomiczna</span>`;
      break;
  }
};

export default classNameConvert;
