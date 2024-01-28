import axios from 'axios';
import React ,{useState,useEffect}from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
const UpdateAdminProd = () => {
    const location = useLocation();
    const navigate = useNavigate ();
    const { productId, productImageUrl, productName, productPrice } = location.state;
    const [updatedProductName, setUpdatedProductName] = useState(productName);
    const [updatedProductPrice, setUpdatedProductPrice] = useState(productPrice);
    const [updatedProductImage, setUpdatedProductImage] = useState(productImageUrl);
    const [isSuccess, setIsSuccess] = useState(null);
    const updateProd=async()=>{
      try {
        console.log(updatedProductName,updatedProductImage,updatedProductPrice,productId);
          const response=await axios.put(`http://localhost:5000/api/prodauth/updateproduct/${productId}`,{
          "productName":updatedProductName,
          "productPrice":updatedProductPrice,
          "productImageUrl":updatedProductImage
          })
          if(response){
            setIsSuccess(true);
            setTimeout(() => {
              navigate('/prodsadmin');
            }, 3000);
          }
      } catch (error) {
        console.log("Some error occured ",error);
        setIsSuccess(false);
      }
    }
    useEffect(() => {
      // Clear success message after navigation
      if (isSuccess === true) {
        setTimeout(() => {
          setIsSuccess(null);
        }, 3000);
      }
    }, [isSuccess]);
  return (
    <div style={{ backgroundColor: '#f3b5bf', minHeight: '100vh' }}>
      {isSuccess === true  && <div className="alert alert-success" role="alert">
            Product updated successfully
          </div>}
          {isSuccess === false  && <div className="alert alert-danger" role="alert">
            Product Updation Failed
          </div>}
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh"}}>
        <div className="card" style={{width:"40rem",backgroundColor:'#e5f2ed',border:'3px solid black'}}>
          <form>
          <p className="fw-bold text-center" style={{color:'lightcoral'}}>Product ID :-{productId}</p>
              <div className="mb-3 mx-auto p-2">
                  <label className="form-label" style={{color:'green'}}>Product Name</label>
                  <input type="text" 
                  className="form-control" 
                  id="exampleInputProdName"
                  placeholder={updatedProductName} 
                  onChange={(e) => setUpdatedProductName(e.target.value)}/>
              </div>
              <div className="mb-3 mx-auto p-2">
                  <label className="form-label" style={{color:'green'}}>Product Image</label>
                  <input type="text" 
                  className="form-control" 
                  id="exampleInputProdImage" 
                  placeholder={updatedProductImage}
                  onChange={(e) => setUpdatedProductImage(e.target.value)}/>
              </div>
              <div className="mb-3 mx-auto p-2">
                  <label className="form-label" style={{color:'green'}}>Product Price</label>
                  <input type="number" 
                  className="form-control" 
                  id="exampleInputProdPrice" 
                  placeholder={updatedProductPrice}
                  onChange={(e) => setUpdatedProductPrice(e.target.value)}/>
              </div>
              <div className="d-grid col-2 mx-auto">
                <button type="button" className="btn btn-outline-success my-3" onClick={updateProd}>Update</button>
              </div>
              
          </form>
          </div>
          </div>
    </div>
  )
}

export default UpdateAdminProd