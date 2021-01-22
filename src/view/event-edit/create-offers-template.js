const checkIsOfferChecked = (offer, activeOffers) => {
  let isChecked = false;

  activeOffers.forEach((activeOffer) => {
    if (offer.title === activeOffer.title) {
      isChecked = true;
    }
  });

  return isChecked;
};


const createEventOffers = (offers, activeOffers, id) => {

  return offers.map((offer, index) => {
    const {title, price} = offer;
    const isChecked = checkIsOfferChecked(offer, activeOffers);

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-${index + 1}" type="checkbox" name="event-offer-${id}"
        ${isChecked ? `checked` : ``}>
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

const createOffersTemplate = (offers, activeOffers, id) => {
  const eventOffersTemplate = createEventOffers(offers, activeOffers, id);
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
