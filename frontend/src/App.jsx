import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './component/Login'
import Navbar from './component/Navbar'
import Signup from './component/Signup';
import Home from './component/Home';
import AddProduct from './component/AddProduct';
import ManageProduct from './component/ManageProduct';
import EditProduct from './component/EditProduct';
import SingleProduct from './component/SingleProduct';
import ManageUser from './component/ManageUser';
import Profile from './component/Profile';
import { CartProvider } from './component/CartContext';
import ShoppingCart from './component/ShoppingCart';
import Cheackout from './component/Cheackout';
import ManageOrder from './component/ManageOrder';
import EditOrder from './component/EditOrder';
import EditUser from './component/EditUser';
import EditProfile from './component/EditProfile';
import UserOrders from './component/UserOrders';
import ShowOrders from './component/ShowOrders';
import { createContext,useReducer } from 'react';
import { intialState,reducer } from './reducer/useReducer';
import AfterOrder from './component/AfterOrder';

export const UserContext=createContext();
function App() {
  const [state, dispatch] = useReducer(reducer,intialState);
  return (
    <>
     <UserContext.Provider value={{state,dispatch}}>

     <CartProvider>
     <Router>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/addProduct" element={<AddProduct/>} />
    <Route path="/manageProduct" element={<ManageProduct/>} />
    <Route path="/updateProduct/:id" element={<EditProduct/>} />
    <Route path="/singleProduct/:id" element={<SingleProduct/>} />
    <Route path="/manageUser" element={<ManageUser/>} />
    <Route path="/profile/:id" element={<Profile/>} />
    <Route path="/Cart" element={<ShoppingCart/>} />
    <Route path="/cheackOut" element={<Cheackout/>} />
    <Route path="/manageOrder" element={<ManageOrder/>} />
    <Route path="/updateOrder/:id" element={<EditOrder/>} />
    <Route path="/updateUser/:id" element={<EditUser/>} />
    <Route path="/updateProfile/:id" element={<EditProfile/>} />
    <Route path="/userOrders" element={<UserOrders/>} />
    <Route path="/showOrders/:id" element={<ShowOrders/>} />
    <Route path="/afterOrder" element={<AfterOrder/>} />
    </Routes>
    </Router>
     </CartProvider>
     </UserContext.Provider>
 
    </>
  )
}

export default App
