import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_SUCCESS,
} from "../constants/orderContants";
import { CART_EMPTY } from "../constants/cartConstants";

import axios from "axios";

const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post(
      "http://localhost:5000/api/orders",
      order,
      {
        headers: {
          Authorization: `bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const detailsOrder = (orderId) => async(dispatch, getState) => {
  dispatch({ type: ORDER_DETAIL_REQUEST, payload: orderId });
  const {userSignin: {userInfo}} = getState()
  try {
    const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
      headers: {Authorization: `bearer ${userInfo.token}`},
    });
    dispatch({type: ORDER_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAIL_FAIL, payload: message });
  }
};

export { createOrder, detailsOrder };
