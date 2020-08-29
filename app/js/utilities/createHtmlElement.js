const createHtmlElement = (tag, className) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
};

export default createHtmlElement;