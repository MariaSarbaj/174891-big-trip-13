const createOffersTemplate = (offers, point) => {

  return offers.map((offer, index) => {
    const {title, price} = offer;

    const isChecked = Math.random() > 0.5;

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index + 1}" type="checkbox" name="event-offer-${point.id}"
        ${isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${index + 1}">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`.trim()
    );
  })
    .join(``);
};

export {createOffersTemplate};
