// const createEventOffers = (offers) => {
const createEventOffers = (offers, id) => {

  return offers.map((offer, index) => {
    // const {id, title, price} = offer;
    const {title, price} = offer;
    const isChecked = Math.random() > 0.5;

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offers}-${index + 1}" type="checkbox" name="event-offer-${id}"
        ${isChecked ? `checked` : ``}
        >
        <label class="event__offer-label" for="event-offer-${id}-${index + 1}">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`.trim()
    );
  })
    .join(``);
};

const createOffersTemplate = (offers, id) => {
  const eventOffersTemplate = createEventOffers(offers, id);
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${eventOffersTemplate}
      </div>
    </section>`.trim()
  );
};

export {createOffersTemplate};
