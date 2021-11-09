export const SET_CUSTOMER_DETAILS = (customerDetails) => {
  return {
    type: "SET_CUSTOMER_DETAILS",
    payload: {
      data: customerDetails,
    },
  };
};

export const CLEAR_COUSTOMER_DATA = () => {
  return {
    type: "CLEAR_COUSTOMER_DATA",
  };
};

export const SHOW_LOGIN_POPUP = () => {
  return {
    type: "SHOW_LOGIN_POPUP",
  };
};

export const HIDE_LOGIN_POPUP = () => {
  return {
    type: "HIDE_LOGIN_POPUP",
  };
};

export const UPDATE_CUSTOMER_DETAILS = (updatedCustomerDetails) => {
  return {
    type: "UPDATE_CUSTOMER_DETAILS",
    payload: {
      data: updatedCustomerDetails,
    },
  };
};
