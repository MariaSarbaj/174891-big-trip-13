const createPhotosTemplate = (pictures) => {
  return pictures.map((picture) => {
    return (
      `<img class="event__photo" src="${picture}" alt="Event photo">`);
  })
    .join(``);
};

export {createPhotosTemplate};
