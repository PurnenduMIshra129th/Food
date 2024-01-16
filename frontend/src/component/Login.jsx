import { useState ,useContext} from "react";
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import BASE_URL from './config';

function Login() {
  const {dispatch} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const { data } = await Axios.post(`${BASE_URL}/api/users/signin`, {
            email,
            password,
          });
          dispatch({type:"USER",payload:true});
          localStorage.setItem("userInfo", JSON.stringify(data));
          console.log("user sucessfully logged in")
          navigate('/home')
        } catch (err) {
          console.log(err.response.data);
        }
      };
  return (
    <div className="text-center">   
    <div className="form-signin w-50 m-auto">
      <form onSubmit={submitHandler}>
        <h1 className="h3 mb-3 fw-normal">Please Log in</h1>
    
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} required/>
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} required />
          <label htmlFor="floatingPassword">Password</label>
        </div>
    
        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit" >Log in</button>
        
      </form>
      <p style={{marginTop: "10%"}}>Dont have an account? <Link to="/signup" style={{textDecoration: "underline"}}>Signup</Link> </p>
    </div> 
    </div>
  )
}

export default Login