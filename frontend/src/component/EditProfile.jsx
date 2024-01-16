import { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from './config';

function EditProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [hostel, setHostel] = useState("");
    const [regNo, setRegNo] = useState("");
    const [roomNO, setRoomNO] = useState("");
    const [mobileNO, setMobileNO] = useState("");

    const navigate = useNavigate();
    const params = useParams(); // /product/:id
    const { id: userId } = params; 
    useEffect(() => {
        const fetchData = async () => {
            const userInfoString = localStorage.getItem('userInfo');
            const userInfo = JSON.parse(userInfoString);
          try {
            const { data } = await axios.get(`${BASE_URL}/api/users/getUser/${userId}`,{
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            // console.log(data);
            // setData(data);
            setName(data.name);
            setEmail(data.email);
            setHostel(data.hostel);
            setRegNo(data.regNo);
            setRoomNO(data.roomNO);
            setMobileNO(data.mobileNO);
          } catch (err) {
           console.log(err.response.data);
          }
        };
        fetchData();
      }, [userId]);

      
      const submitHandler = async (e) => {
        e.preventDefault();
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoString);
        try {
          await axios.put(
            `${BASE_URL}/api/users/updateProfile/${userId}`,
            {
              _id: userId,
              name,
              email,
              hostel,
              regNo,
              roomNO,
              mobileNO,
            },
            {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }
          );
          console.log('Profile Update Successfully');
          navigate(`/profile/${userId}`);
        } catch (err) {
         console.log(err.response.data);
        }
      };
    
  return (
    <div className="text-center">   
    <div className="form-signin w-50 m-auto">
      <form onSubmit={submitHandler}>
        <h1 className="h3 mb-3 fw-normal">Update Your Profile</h1>
    
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
          <label htmlFor="floatingInput">Enter Your Name</label>
        </div>
    
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput1" placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          <label htmlFor="floatingInput1">Enter Your Email</label>
        </div>
    
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInput2" placeholder="Enter Your Hostel IF Any" onChange={(e)=>setHostel(e.target.value)} value={hostel} required/>
          <label htmlFor="floatingInput2">Enter Your Hostel </label>
        </div>
    
        <div className="form-floating">
          <input type="number" className="form-control" id="floatingInput3" placeholder="Enter Your Registration Number if any" onChange={(e)=>setRegNo(e.target.value)} value={regNo}  required/>
          <label htmlFor="floatingInput3">Enter Your Registration Number</label>
        </div>
    
        <div className="form-floating">
          <input type="number" className="form-control" id="floatingInput4" placeholder="Enter Your Room Number" onChange={(e)=>setRoomNO(e.target.value)} value={roomNO} required/>
          <label htmlFor="floatingInput4">Enter Your Room Number</label>
        </div>
    
        <div className="form-floating">
          <input type="number" className="form-control" id="floatingInput5" placeholder="Enter Your Mobile Number" onChange={(e)=>setMobileNO(e.target.value)} value={mobileNO} required/>
          <label htmlFor="floatingInput5">Enter Your Mobile Number</label>
        </div>
       
        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Update</button>
        
      </form>
    </div> 
    </div>
  )
}

export default EditProfile