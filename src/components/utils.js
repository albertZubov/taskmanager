export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

/* const unrender = (element) => {
  if (element) {
    element.remove();
  }
}; */
