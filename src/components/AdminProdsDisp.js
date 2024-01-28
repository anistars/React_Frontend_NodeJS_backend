import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { Link } from "react-router-dom";

const AdminProdsDisp = () => {
    const [items, setitems] = useState([])
    const navigate = useNavigate ();
    const [delSuc, setDelSuc] = useState(null);
    useEffect(() => {
      fetch('http://localhost:5000/api/prodauth/getallproducts')
      .then((response)=>response.json())
      .then((data)=>{
        setitems(data.items);
        if (delSuc === true) {
          setTimeout(() => {
            setDelSuc(null);
          }, 3000);
        }
      })
      .catch((error)=>console.log("Error Fetching products"));
    }, [delSuc])
    const updateProduct = async (productId,productImageUrl,productName,productPrice) => {
        navigate('/updateprod', {
            state: {
                productId,
                productImageUrl,
                productName,
                productPrice
            }
        });
    }
    const deleteCartProd=async(productId)=>{
      try {
        console.log(productId);
        const response=axios.delete(`http://localhost:5000/api/prodauth/deleteitem/${productId}`)
        if (response) {
          setDelSuc(true);
          setTimeout(() => {
            navigate('/prodsadmin');
          }, 3000);
        }
      } catch (error) {
        console.error('Error adding items to cart:', error.response.data);
          setDelSuc(false);
      }
    }
  return (
    <div>
        <div className='container my-3'>
        {delSuc === true  && <div className="alert alert-success" role="alert">
            Item deleted succesfully
          </div>}
          {delSuc === false  && <div className="alert alert-danger" role="alert">
            Error in deleteing item
          </div>}
          <div className="d-flex justify-content-center align-items-center">
            <button type="button" className="btn btn-info">
            <Link className="nav-link" to="/addnewprod"><i className="bi bi-plus">Add Item</i></Link>
            </button>
          </div>
          
                <h2 className='text-center' style={{ color: 'purple', fontWeight: 'bold',margin: "40px 0px",marginTop:"30px" }}>Product list</h2>
                <div className='row'>
                    {items.map((item) => (
                        <div className="col-md-3" key={item._id}>
                            <div className="card" style={{border:'2px solid black'}}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: '0'
                          }
                          }>
                            <span className="badge rounded-pill bg-danger my-1 mx-1"> <button type="button" className="btn btn-danger" onClick={() => deleteCartProd(item._id)}><span className="bi-trash"></span></button> </span>
                          </div>
                            <img src={!item.productImageUrl?"https://m.media-amazon.com/images/I/31-mRNtq6QL._SX300_SY300_QL70_FMwebp_.jpg":item.productImageUrl} className="card-img-top" alt="No Preview Available"/>
                            <div className="card-body">
                                <h5 className="card-title" style={{color:'lightseagreen'}}>{item.productName}</h5>
                                <p className="card-text"style={{color:'lightcoral',fontWeight: 'bold'}}>Rs{item.productPrice}</p>         
                                <button className='btn btn-primary my-2' onClick={()=>updateProduct(item._id,item.productImageUrl,item.productName,item.productPrice)}>
                                  Update Product
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

export default AdminProdsDisp