export const flexbox = ({ dir = "row", jc = "center", ai = "center" } = {}) => `
      display: flex;
      flex-direction: ${dir};
      justify-content: ${jc};
      align-items: ${ai}
  `;
