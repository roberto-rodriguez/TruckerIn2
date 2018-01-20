import variable from "./../variables/platform";

export default (variables = variable) => {
  const thumbnailTheme = {
    ".square": {
      borderRadius: 0,
      ".small": {
        width: 36,
        height: 36,
        borderRadius: 0
      },
      ".large": {
        width: 80,
        height: 80,
        borderRadius: 0
      }
    },
    ".extrasmall": {
      width: 30,
      height: 30,
      borderRadius: 15,
      ".square": {
        borderRadius: 0
      }
    },
    ".small": {
      width: 36,
      height: 36,
      borderRadius: 18,
      ".square": {
        borderRadius: 0
      }
    },
    ".medium": {
      width: 58,
      height: 58,
      borderRadius: 29,
      ".square": {
        borderRadius: 0
      }
    },
    ".large": {
      width: 80,
      height: 80,
      borderRadius: 40,
      ".square": {
        borderRadius: 0
      }
    },
    ".extralarge": {
      width: 120,
      height: 120,
      borderRadius: 60,
      ".square": {
        borderRadius: 0
      }
    },
    width: 56,
    height: 56,
    borderRadius: 28
  };

  return thumbnailTheme;
};
