const initialState = {
  customer: {},
  cart: [],
  showLoginPopup: false,
};

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CUSTOMER_DETAILS":
      return {
        ...state,
        customer: action.payload.data,
      };
    case "UPDATE_CUSTOMER_DETAILS":
      return {
        ...state,
        customer: {
          ...state.customer,
          ...action.payload.data,
        },
      };
    case "ADD_UPDATE_ITEM_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload.data],
      };
    case "CLEAR_COUSTOMER_DATA":
      return {
        customer: {},
        cart: [],
      };
    case "SHOW_LOGIN_POPUP":
      return {
        ...state,
        showLoginPopup: true,
      };
    case "HIDE_LOGIN_POPUP":
      return {
        ...state,
        showLoginPopup: false,
      };
    default:
      return state;
  }
};
export default CustomerReducer;
