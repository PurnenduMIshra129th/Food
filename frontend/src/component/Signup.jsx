import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useState ,useContext} from "react"
import { UserContext } from '../App';
import BASE_URL from './config';

function Signup() {
  const navigate=useNavigate();
  const {dispatch} = useContext(UserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [hostel, setHostel] = useState("");
    const [regNo, setRegNo] = useState("");
    const [roomNO, setRoomNO] = useState("");
    const [mobileNO, setMobileNO] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // Display an error toast if passwords do not match
           console.log("passwords Not match");
            return;
          }
        try {
          const { data } = await Axios.post(`${BASE_URL}/api/users/signup`, {
            name,
            email,
            hostel,
            regNo,
            roomNO,
            mobileNO,
            password,
            confirmPassword
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          dispatch({type:"USER",payload:true});
          console.log("user sucessfully signed up")
          navigate('/home');
          
        } catch (err) {
          console.log(err.response.data);
        }
      };
  return (
    <div className="text-center">   
    <div className="form-signin w-50 m-auto">
      <form onSubmit={submitHandler}>
        <h1 className="h3 mb-3 fw-normal">Please Sign up</h1>
    
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} required/>
          <label htmlFor="floatingInput">Enter Your Name</label>
        </div>
    
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput1" placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} required/>
          <label htmlFor="floatingInput1">Enter Your Email</label>
        </div>
    
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInput2" placeholder="Enter Your Hostel IF Any" onChange={(e)=>setHostel(e.target.value)} required/>
          <label htmlFor="floatingInput2">Enter Your Hostel </label>
        </div>
    
        <div className="form-floating">
          <input type="number" className="form-control" id="floatingInput3" placeholder="Enter Your Registration Number if any" onChange={(e)=>setRegNo(e.target.value)} required/>
          <label htmlFor="floatingInput3">Enter Your Registration Number</label>
        </div>
    
        <div className="form-floating">
          <input type="number" className="form-control" id="floatingInput4" placeholder="Enter Your Room Number" onChange={(e)=>setRoomNO(e.target.value)} required/>
          <label htmlFor="floatingInput4">Enter Your Room Number</label>
        </div>
    
        <div className="form-floating">
          <input type="number" className="form-control" id="floatingInput5" placeholder="Enter Your Mobile Number" onChange={(e)=>setMobileNO(e.target.value)} required/>
          <label htmlFor="floatingInput5">Enter Your Mobile Number</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} required />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword1" placeholder="Confirm Your Password"  onChange={(e)=>setConfirmPassword(e.target.value)} required />
          <label htmlFor="floatingPassword1">Confirm Your Password</label>
        </div>
    
        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign in</button>
        
      </form>
      <p style={{marginTop: "10%"}}>Already have an account? <Link to="/" style={{textDecoration: "underline"}}>Login</Link> </p>
    </div> 
    </div>
  )
}

export default Signup