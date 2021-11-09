import { createStore, combineReducers } from "redux";
import ProductsReducer from "./reducers/ProductsReducer";
import CustomerReducer from "./reducers/CustomerReducer";
import CartReducer from "./reducers/CartReducer";
import TranscReducer from "./reducers/TranscReducer";
import SellerReducer from "./reducers/SellerReducer";




const root = combineReducers({
  ProductsReducer,
  CustomerReducer,
  CartReducer,
  TranscReducer,
  SellerReducer
});

const store = createStore(root);
export default store;
