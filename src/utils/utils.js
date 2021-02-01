import AbstractView from "../view/abstract";
import {FilterType} from "../const";

const KeyboardKey = {
  ESCAPE: `Escape`,
  ESCAPE_IE: `Esc`,
};

export const isEscapeKey = (evt) => evt.key === KeyboardKey.ESCAPE || evt.key === KeyboardKey.ESCAPE_IE;

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, child, place = RenderPosition.BEFOREEND) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    default:
      throw new Error(`Unknown render position: ${place}`);
  }
};

export const createElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;

  return wrapper.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  if (oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  oldChild.replaceWith(newChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const getTripEventsByFilter = (points, filterType) => {
   const nowDate = new Date();

   switch (filterType) {
     case FilterType.FUTURE:
       return points.filter(point => point.dateFrom > nowDate);
     case FilterType.PAST:
       return points.filter(point => point.dateFrom < nowDate);
     default:
       return points;
   }
};
