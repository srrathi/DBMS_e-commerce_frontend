const initialState = {
  products: [],
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCTS_STORE":
      return {
        ...state,
        products: action.payload.data,
      };
    default:
      return state;
  }
};
export default ProductsReducer;
