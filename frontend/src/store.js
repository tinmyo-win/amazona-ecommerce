import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducer";

import {
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userSigninReducer";

import {
  orderCreateReducer, orderDetailsReducer
} from "./reducers/orderReducer";

import { cartReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
