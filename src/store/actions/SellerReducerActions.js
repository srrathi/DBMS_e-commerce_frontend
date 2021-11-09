export const SET_SELLER_DETAILS = (sellerDetails) => {
  return {
    type: "SET_SELLER_DETAILS",
    payload: {
      data: sellerDetails,
    },
  };
};

export const UPDATE_SELLER_DETAILS = (updatedSellerDetails) => {
  return {
    type: "UPDATE_SELLER_DETAILS",
    payload: {
      data: updatedSellerDetails,
    },
  };
};

export const CLEAR_SELLER_DATA = () => {
  return {
    type: "CLEAR_SELLER_DATA",
  };
};

export const GET_SELLER_PRODUCTS = (sellerProductsArray) => {
  return {
    type: "GET_SELLER_PRODUCTS",
    payload: {
      data: sellerProductsArray,
    },
  };
};
