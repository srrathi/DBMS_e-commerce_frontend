export const ADD_PRODUCT_CART = (product) => {
  return {
    type: "ADD_PRODUCT_CART",
    payload: {
      data: product,
    },
  };
};

export const UPDATE_PRODUCT_CART = (updatedProduct) => {
  return {
    type: "UPDATE_PRODUCT_CART",
    payload: {
      data: updatedProduct,
    },
  };
};

export const MAKE_CART_EMPTY = () => {
  return {
    type: "MAKE_CART_EMPTY",
  };
};

export const DELETE_PRODUCT_CART = (cartProductId) => {
  return {
    type: "DELETE_PRODUCT_CART",
    payload: {
      cartProductId: cartProductId,
    },
  };
};

export const SET_ALL_CART_PRODUCTS = (cartProducts) => {
  return {
    type: "SET_ALL_CART_PRODUCTS",
    payload: {
      data: cartProducts,
    },
  };
};

export const REFRESH_CART_PRODUCTS = () => {
  return {
    type: "REFRESH_CART_PRODUCTS",
  };
};
