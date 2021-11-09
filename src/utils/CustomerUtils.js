export const userLoggedInUtil = () => {
  const isUserSignedIn = window.localStorage.getItem("Authorization");
  //   console.log(isUserSignedIn.length);
  if (isUserSignedIn) {
    return true;
  } else {
    return false;
  }
};

export const generateRandomInvoiceId = (length = 10) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
