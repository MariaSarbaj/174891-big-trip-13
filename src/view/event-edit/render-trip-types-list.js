const renderTripTypesList = (types) => {
  return types.map((type, id) => {
    const typeName = type.toLowerCase();

    return (
      `<div class="event__type-item">
        <input id="event-type-${typeName}-${id + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${typeName}" for="event-type-${typeName}-${id + 1}">${type}</label>
      </div>`.trim()
    );
  })
    .join(``);
};

export {renderTripTypesList};
