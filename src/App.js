import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
  
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import CartPage from './components/CartPage';
import NewUser from './components/NewUser';
import AdminProdsDisp from './components/AdminProdsDisp';
import UpdateAdminProd from './components/UpdateAdminProd';
import AddItems from './components/AddItems';

const AdminLayout = () => {
  // You can include any layout specific to the admin section here
  return (
    <div>
      <h1>Admin Layout</h1>
      <Outlet />
    </div>
  );
};
function App() {
  return (
    
    <div>
      <Router>
        <Navbar/>
        <Routes>
        <Route exact path='/about' element={<About/>} />
          <Route exact path='/' element={ <Home/>}/>
          <Route path='/userlogin' element={<UserLogin/>}/>
          <Route exact path='/cart' element={<CartPage/>}/>
          <Route exact path='/newuser' element={<NewUser/>}/>
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          <Route path='/prodsadmin' element={<AdminProdsDisp/>}/>
          <Route path='/updateprod' element={<UpdateAdminProd/>}/>
          <Route path='/addnewprod' element={<AddItems/>}/>
        </Routes>
        </Router>
        
    </div>
  );
}

export default App;
