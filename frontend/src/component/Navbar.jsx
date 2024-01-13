import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
  const getUser = () => {
    const userInfoString = localStorage.getItem('userInfo');
  const userInfo = JSON.parse(userInfoString);
  navigate(`/profile/${userInfo._id}`)
  };
  const handleLogout = () =>{
    localStorage.removeItem('userInfo');
    // dispatch({type:"USER",payload:false});
    console.log("logout");
    // toast.success('user successfully Logged Out');
  
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light m-0" >
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/manageProduct">Manage Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/manageUser">Manage User</Link>
        </li>
        <li className="nav-item" onClick={getUser}>
          <Link className="nav-link">Profile</Link>
            
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Cart">Cart</Link>           
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/manageOrder">Manage Order</Link>           
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link>           
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/userOrders" >Your Orders</Link>           
        </li>
       
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar