import Rating from "../components/Rating";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductScreen = () => {
  const { id } = useParams("/products/:id");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1)

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => (
    navigate(`/cart/${id}?qty=${qty}`)
  )

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to Result</Link>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Price: ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {
                    product.countInStock > 0 && (
                      <>
                        <li>
                            <div className="row">
                                <div>Qty</div>
                                <div>
                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                        {
                                            [...Array(product.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x+1}>{x+1}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li>
                          <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                        </li>
                      </>

                    )
                  }

                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
