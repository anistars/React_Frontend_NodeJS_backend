import axios from 'axios';
import React ,{useState,useEffect}from 'react'
import { useNavigate  } from 'react-router-dom';

const AddItems = () => {
    const navigate = useNavigate ();
    const [updatedProductName, setUpdatedProductName] = useState("");
    const [updatedProductPrice, setUpdatedProductPrice] = useState("");
    const [updatedProductImage, setUpdatedProductImage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const addProd=async()=>{
        try {
          console.log(updatedProductName,updatedProductImage,updatedProductPrice);
            const response=await axios.post(`http://localhost:5000/api/prodauth/newproduct`,{
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
  return (
    <div style={{ backgroundColor: '#f3b5bf', minHeight: '100vh' }}>
      {isSuccess === true  && <div className="alert alert-success" role="alert">
            Product Added Successfully
          </div>}
          {isSuccess === false  && <div className="alert alert-danger" role="alert">
            Failed To Add Product
          </div>}
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh"}}>
        <div className="card" style={{width:"40rem",backgroundColor:'#e5f2ed',border:'3px solid black'}}>
          <form>
              <div className="mb-3 mx-auto p-2">
                  <label className="form-label" style={{color:'green'}}>Product Name</label>
                  <input type="text" 
                  className="form-control" 
                  id="exampleInputProdName"
                  placeholder="Enter Product Name"
                  onChange={(e) => setUpdatedProductName(e.target.value)}/>
              </div>
              <div className="mb-3 mx-auto p-2">
                  <label className="form-label" style={{color:'green'}}>Product Image</label>
                  <input type="text" 
                  className="form-control" 
                  id="exampleInputProdImage" 
                  placeholder="Enter Product ImageURL"
                  onChange={(e) => setUpdatedProductImage(e.target.value)}/>
              </div>
              <div className="mb-3 mx-auto p-2">
                  <label className="form-label" style={{color:'green'}}>Product Price</label>
                  <input type="number" 
                  className="form-control" 
                  id="exampleInputProdPrice" 
                  placeholder="Enter Product Price"
                  onChange={(e) => setUpdatedProductPrice(e.target.value)}/>
              </div>
              <div className="d-grid col-2 mx-auto">
                <button type="button" className="btn btn-outline-success my-3" onClick={addProd}>Add</button>
              </div>
              
          </form>
          </div>
          </div>
    </div>
  )
}

export default AddItems