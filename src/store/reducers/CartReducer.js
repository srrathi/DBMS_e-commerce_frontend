const initialState = {
  cart: [],
  refreshCart: false,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload.data],
      };
    case "UPDATE_PRODUCT_CART":
      let cartProducts = state.cart;
      const productindex = cartProducts.findIndex(
        (product) => product.cartProductId === action.payload.data.cartProductId
      );
      cartProducts[productindex] = action.payload.data;
      return {
        ...state,
        cart: [...cartProducts],
      };
    case "DELETE_PRODUCT_CART":
      const updatedCart = state.cart.filter(
        (product) => product.cartProductId !== action.payload.cartProductId
      );
      return {
        ...state,
        cart: [...updatedCart],
      };
    case "SET_ALL_CART_PRODUCTS":
      return {
        ...state,
        cart: action.payload.data,
      };
    case "REFRESH_CART_PRODUCTS":
      return {
        ...state,
        refreshCart: !state.refreshCart,
      };
    case "MAKE_CART_EMPTY":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
export default CartReducer;
