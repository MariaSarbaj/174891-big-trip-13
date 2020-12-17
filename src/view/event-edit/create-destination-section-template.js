import {createPhotosTemplate} from "./create-photos-template";

const createDestinationSectionTemplate = (point) => {
  const {destination} = point;

  const eventPhotosTemplate = createPhotosTemplate(destination.pictures);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${eventPhotosTemplate}
        </div>
      </div>
    </section>`
  );
};

export {createDestinationSectionTemplate};
