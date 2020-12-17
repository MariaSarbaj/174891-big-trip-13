const createOptionsTemplate = (destinations) => {
  return destinations.map((destination) => {
    const {name} = destination;
    return `<option value="${name}"></option>`;
  })
    .join(``);
};

export {createOptionsTemplate};
