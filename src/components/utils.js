export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

export const render = (container, element) => {
  let childrens = element;

  if (typeof element === `string`) {
    const div = document.createElement(`div`);
    div.innerHTML = element;
    childrens = Array.from(div.children);
    childrens.forEach((node) => {
      container.append(node);
    });
  } else {
    container.append(element);
  }

  return childrens;
};

/* const unrender = (element) => {
  if (element) {
    element.remove();
  }
}; */
