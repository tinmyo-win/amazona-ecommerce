import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {detailsOrder} from '../actions/orderActions'

const OrderScreen = () => {
  const orderId = useParams('/order/:id').id;
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error} = orderDetails;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detailsOrder(orderId))
  }, [dispatch, orderId])

  return loading ? (<LoadingBox />) : error? (<MessageBox variant="error" />) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city}, {order.shippingAddress.postalcode}
                  ,{order.shippingAddress.country}
                </p>
                {order.isDelivered ? <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox> : <MessageBox variant="error">Not Delivered</MessageBox>}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong> {order.paymentMethod} <br />
                </p>
                {order.isPaid ? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox> : <MessageBox variant="error">Not Paid</MessageBox>}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} * ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total </strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
