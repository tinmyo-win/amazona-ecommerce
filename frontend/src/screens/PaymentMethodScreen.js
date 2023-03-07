import { useEffect, useState } from "react";
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {savePaymentMethod} from '../actions/cartActions'

const PaymentMethodScreen = () => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect (() => {
    if(!shippingAddress || shippingAddress === {}) {
      navigate('/shipping')
    }
  }, [navigate, shippingAddress])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return(
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <div>
            <input type='radio' id='paypal' value='PayPal' name='paymentMethod'
              required checked onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paypal">PayPal</label>
          </div>
          <div>
            <input type='radio' id='stripe' value='Stripe' name='paymentMethod'
              required onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}

export default PaymentMethodScreen;