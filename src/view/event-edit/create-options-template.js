const createOptionsTemplate = (cities) => {
  return cities.map((city) => {
    return `<option value="${city}"></option>`;
  })
    .join(``);
};

export {createOptionsTemplate};
