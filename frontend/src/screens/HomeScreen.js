import { useEffect } from 'react';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList);
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    },[dispatch])
    return(
        <div>
        {loading ? <LoadingBox />
            : error ? <MessageBox variant='error'>{error}</MessageBox>
            :(
                <div className="row center">
                {
                  products.map(product => (
                    <Product key={product._id} product={product} />
                  ))
                }
                
                </div>
            )}

        </div>
    )
}

export default HomeScreen;