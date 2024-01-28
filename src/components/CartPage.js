import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Counter from './Counter';

const CartPage = () => {
    const [cart, setcart] = useState([]);
    const [counterValues, setCounterValues] = useState({});
    const [isSuccess, setIsSuccess] = useState(null);
    const [delSuc, setDelSuc] = useState(null);
    const authToken = localStorage.getItem('authToken');
    const navigate = useNavigate ();
    useEffect(() => {
      fetch(`http://localhost:5000/api/cartauth/fetchAllCartItems`,{
        method:"GET",
        headers:{
          "auth-token":authToken
        }
      })
      .then((response)=>response.json())
      .then((data)=>{
        setcart(data.cart);
        const initialCounterValues = {};
        data.cart.forEach((car) => {
          initialCounterValues[car._id] = car.totalItems;
        });
        setCounterValues(initialCounterValues)
        if (delSuc === true) {
          setTimeout(() => {
            setDelSuc(null);
          }, 3000);
        }
        if (isSuccess === true) {
          setTimeout(() => {
            setIsSuccess(null);
          }, 3000);
        }
      })
    }, [isSuccess,delSuc])

    const handleContinueShopping = async (productId,productImageUrl,productName,productPrice) => {
      
      // Redirect based on the availability of the authToken
      if (authToken) {
        console.log(counterValues[productId],productName,authToken);
        try {
          const response=await axios.put(
            `http://localhost:5000/api/cartauth/updateitemcart/${productName}`,
            {"totalItems":counterValues[productId]},
            {
              headers:{
                "auth-token":authToken,
              }
            }
          )
          console.log(response.data); 
          setIsSuccess(true);
          setTimeout(() => {
            navigate('/cart');
          }, 3000);
        } catch (error) {
          console.error('Error adding items to cart:', error.response.data);
          setIsSuccess(false);
        }
        
      } else {
        // navigate('/userlogin');
      }
    };
    const handleIncrement = (productId) => {
      setCounterValues((prevCounterValues) => ({
        ...prevCounterValues,
        [productId]: prevCounterValues[productId] + 1,
      }));
    };
  
    const handleDecrement = (productId) => {
      setCounterValues((prevCounterValues) => ({
        ...prevCounterValues,
        [productId]: Math.max(prevCounterValues[productId] - 1, 0),
      }));
    };
    const deleteCartProd=async (productName)=>{
      console.log(productName);
      if (authToken) {
        try {
          const response=await axios.delete(
            `http://localhost:5000/api/cartauth//deleteitemcart/${productName}`,
            { headers:{
              "auth-token":authToken,
              }
            }
          )
          console.log(response.data);
          setDelSuc(true);
          setTimeout(() => {
            navigate('/cart');
          }, 3000);
        } catch (error) {
          console.error('Error adding items to cart:', error.response.data);
          setDelSuc(false);
        }
      }
    }
  return (
    <div>
      <div className='container my-3'>
          {isSuccess === true  && <div className="alert alert-success" role="alert">
            Success in updating cart
          </div>}
          {isSuccess === false  && <div className="alert alert-danger" role="alert">
            Error in updating cart
          </div>}
          {delSuc === true  && <div className="alert alert-success" role="alert">
            Item deleted succesfully
          </div>}
          {delSuc === false  && <div className="alert alert-danger" role="alert">
            Error in deleteing item
          </div>}
      <div className='row'>
      {cart.map((car) => (
        <div className="col-md-3" key={car._id}>
          <div className="card">
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0'
            }
            }>
              <span className="badge rounded-pill bg-danger"> <button type="button" className="btn btn-danger" onClick={()=>deleteCartProd(car.productName)}><span className="bi-trash"></span></button> </span>
            </div>
          <img src={!car.productImageUrl?"https://m.media-amazon.com/images/I/31-mRNtq6QL._SX300_SY300_QL70_FMwebp_.jpg":car.productImageUrl} className="card-img-top" alt="No Preview Available"/>
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'lightseagreen' }}>{car.productName}</h5>
              <p className="card-text" style={{ color: 'lightcoral', fontWeight: 'bold' }}>Rs{car.productPrice}</p>
              <p className="card-text" style={{ color: 'lightcoral', fontWeight: 'bold' }}>Total Price:-Rs{car.totalPrice}</p>
              <Counter
                count={counterValues[car._id]}
                handleIncrement={() => handleIncrement(car._id)}
                handleDecrement={() => handleDecrement(car._id)}
              /><br/>
              <button className='btn btn-primary my-2' onClick={() => handleContinueShopping(car._id, car.productImageUrl, car.productName, car.productPrice)}>
               Update Cart
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  )
}

export default CartPage