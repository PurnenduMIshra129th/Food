import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useContext, useEffect } from "react";
import { UserContext } from "../App";
// import BASE_URL from './config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const getUser = () => {
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);
    navigate(`/profile/${userInfo._id}`);
  };

  const cheackISLoggedIn = () => {
    const x = localStorage.getItem("myState");
    return x;
  };
  useEffect(() => {
    cheackISLoggedIn();
  }, [state]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: "USER", payload: false });
    console.log("logout");
    navigate('/')
    toast.success('user successfully Logged Out');
  };
  const Sidenav = () => {
    const x = cheackISLoggedIn();
    console.log("x main",x);
    if(x=='true'){
      const userInfoString = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(userInfoString);
      const y = userInfo.isAdmin;
      // console.log("x2",x," ",y);
      if (y==true) {
        console.log("y if",y);
        return (
          <>
               <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Manage
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/manageUser">
                      Manage Users
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/manageProduct">
                      Manage Products
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/manageOrder">
                      Manage Orders
                    </Link>
                  </li>
                </ul>
              </li>
  
  
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {JSON.parse(localStorage.getItem("userInfo")).name}
                </Link>
                <ul className="dropdown-menu">
                  <li className="nav-item" onClick={getUser}>
                    <Link className="nav-link">User Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/userOrders">
                      Your Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Cart">
                  Cart
                </Link>
              </li>
          </>
        )
      }else{
        return(
        <>            
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {JSON.parse(localStorage.getItem("userInfo")).name}
                </Link>
                <ul className="dropdown-menu">
                  <li className="nav-item" onClick={getUser}>
                    <Link className="nav-link">User Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/userOrders">
                      Your Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Cart">
                  Cart
                </Link>
              </li>
        </>
      )
      }
    }
     else {
      return (
        <>
          <Link to="/"></Link>
        </>
      );
    }
  };
  // Sidenav();
  return (
    <nav className="navbar navbar-expand-lg bg-light m-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">   
            <Sidenav/>     
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
