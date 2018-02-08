import variable from "./../variables/platform";

export default (variables = variable) => {
  const platform = variables.platform;

  const toastTheme = {
    ".danger": {
      backgroundColor: variables.brandDanger
    },
    ".warning": {
      backgroundColor: variables.brandWarning
    },
    ".success": {
      backgroundColor: '#e6ffe6',
      borderColor: platform.primaryColor,
      borderWidth: 0.3,
      "NativeBase.Text": {
        color: '#0B3A42',
        flex: 1
      },
    },
  //  backgroundColor: "black",
    borderRadius: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    //marginTop: -5,
    minHeight: 30,
    "NativeBase.Text": {
      color: "white",
      flex: 1
    },
    "NativeBase.Button": {
    //  backgroundColor: "transparent",
      height: 0,
      width:0,
      elevation: 0,
      "NativeBase.Text": {
        fontSize: 14
      }
    }
  };

  return toastTheme;
};
