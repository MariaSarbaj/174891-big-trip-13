const createTripTypesListTemplate = (types, point) => {
  const {type: checkedType} = point;

  return types.map((type, id) => {
    const isChecked = type === checkedType ? `checked` : ``;

    const typeName = type.toLowerCase();

    return (
      `<div class="event__type-item">
        <input id="event-type-${typeName}-${id + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
        <label class="event__type-label  event__type-label--${typeName}" for="event-type-${typeName}-${id + 1}">${type}</label>
      </div>`.trim()
    );
  })
    .join(``);
};

export {createTripTypesListTemplate};
