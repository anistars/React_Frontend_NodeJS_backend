import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Counter from './Counter';
const Home = () => {
    const [items, setitems] = useState([])
    const [counterValues, setCounterValues] = useState({});
    const navigate = useNavigate ();
    const [isSuccess, setIsSuccess] = useState(null);
    const authToken = localStorage.getItem('authToken');
    useEffect(() => {
      fetch('http://localhost:5000/api/prodauth/getallproducts')
      .then((response)=>response.json())
      .then((data)=>{
        setitems(data.items);
        const initialCounterValues = {};
        data.items.forEach((item) => {
          initialCounterValues[item._id] = 1;
        });
        setCounterValues(initialCounterValues)
      })
      .catch((error)=>console.log("Error Fetching products"));
    }, [])
    
    const handleContinueShopping = async (productId,productImageUrl,productName,productPrice) => {
      
      // Redirect based on the availability of the authToken
      if (authToken) {
        const selectedProductData = {
          items: items.filter((item) => item._id === productId),
          counterValues: counterValues[productId],
          totalPrice:productPrice*counterValues[productId]
        };
        try {
          const response=await axios.post(
            `http://localhost:5000/api/cartauth/addItemsToCart/${productName}`,
            {"totalItems":counterValues[productId]},
            {
              headers:{
                "auth-token":authToken,
              }
            }
          )
          console.log(response.data); 
          setIsSuccess(true);
        } catch (error) {
          console.error('Error adding items to cart:', error.response.data);
          setIsSuccess(false);
        }
        // navigate('/adminlogin');
        console.log(selectedProductData);
      } else {
        navigate('/userlogin');
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
  return (
    <div>
        <div className='container my-3'>
        {isSuccess === true  && <div className="alert alert-success" role="alert">
            Item Added successfully to the cart
          </div>}
          {isSuccess === false  && <div className="alert alert-danger" role="alert">
            Item already in the cart
          </div>}
                <h2 className='text-center' style={{ color: 'lightblue', fontWeight: 'bold',margin: "40px 0px",marginTop:"30px" }}>Product list</h2>
                <div className='row'>
                    {items.map((item) => (
                        <div className="col-md-3" key={item._id}>
                            <div className="card" style={{border:'2px solid black'}}>
                            <img src={!item.productImageUrl?"https://m.media-amazon.com/images/I/31-mRNtq6QL._SX300_SY300_QL70_FMwebp_.jpg":item.productImageUrl} className="card-img-top" alt="No Preview Available"/>
                            <div className="card-body">
                                <h5 className="card-title" style={{color:'lightseagreen'}}>{item.productName}</h5>
                                <p className="card-text"style={{color:'lightcoral',fontWeight: 'bold'}}>Rs{item.productPrice}</p>
                                <Counter
                                count={counterValues[item._id]}
                                handleIncrement={() => handleIncrement(item._id)}
                                handleDecrement={() => handleDecrement(item._id)}
                              /> <br/>            
                                <button className='btn btn-primary my-2' onClick={()=>handleContinueShopping(item._id,item.productImageUrl,item.productName,item.productPrice)}>
                                  Add to Cart
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

export default Home
