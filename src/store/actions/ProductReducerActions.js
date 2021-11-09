export const ADD_PRODUCTS_STORE = (ProductsArray) => {
  return {
    type: "ADD_PRODUCTS_STORE",
    payload: {
      data: ProductsArray,
    },
  };
};
