import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL} from '../constants/userConstants';
import axios from 'axios'

export const signin = (email, password) => async(dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: {email, password }});
  try {
    const { data } = await axios.post('http://localhost:5000/api/users/signin', {email, password});
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message})
  }
}

export const register = (name, email, password) => async(dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: {email, password }});
  try {
    const { data } = await axios.post('http://localhost:5000/api/users/register', {name, email, password});
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message})
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({type: USER_SIGNOUT});

}
