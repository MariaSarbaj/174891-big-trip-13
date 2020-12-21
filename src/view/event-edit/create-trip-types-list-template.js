import {convertTextToUppercase} from "../../utils/convert-text-to-uppercase";

const createTripTypesListTemplate = (types, point) => {
  const {type: checkedType} = point;

  return types.map((type, id) => {
    const isChecked = type === checkedType ? `checked` : ``;

    const typeName = convertTextToUppercase(type);

    return (
      `<div class="event__type-item">
        <input id="event-type-${type}-${id + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id + 1}">${typeName}</label>
      </div>`.trim()
    );
  })
    .join(``);
};

export {createTripTypesListTemplate};
