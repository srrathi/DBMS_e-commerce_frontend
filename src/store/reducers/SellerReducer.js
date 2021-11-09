const initialState = {
  seller: {},
  sellerLoggedIn: false,
  products: [],
};

const SellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELLER_DETAILS":
      return {
        ...state,
        seller: action.payload.data,
        sellerLoggedIn: true,
      };
    case "UPDATE_SELLER_DETAILS":
      return {
        ...state,
        seller: {
          ...state.seller,
          ...action.payload.data,
        },
      };
    case "CLEAR_SELLER_DATA":
      return {
        seller: {},
        sellerLoggedIn: false,
      };
    case "GET_SELLER_PRODUCTS":
      return {
        ...state,
        products: action.payload.data,
      };
    default:
      return state;
  }
};
export default SellerReducer;
