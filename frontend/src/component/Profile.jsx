import { useState,useEffect } from 'react'
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BASE_URL from './config';
import { useContext} from "react"
import { UserContext } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Profile() {
  const {dispatch} = useContext(UserContext);
  const navigate = useNavigate();
    const params = useParams(); // /product/:id
    const { id: userId } = params; 
    const [data,setData]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const userInfoString = localStorage.getItem('userInfo');
            const userInfo = JSON.parse(userInfoString);
          try {
            const { data } = await axios.get(`${BASE_URL}/api/users/getUser/${userId}`,{
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            console.log(data);
            setData(data);
          } catch (err) {
            toast.error("Error in fetching user details!")
           console.log(err.response.data);
          }
        };
        fetchData();
      }, [userId]);
      const handleLogout = () =>{
        localStorage.removeItem('userInfo');
        dispatch({type:"USER",payload:false});
        console.log("logout");
        toast.success('user successfully Logged Out');
        navigate('/');
      };
    return (
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container py-5">
        
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4 py-3">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: '150px' }}
                  />
                  <h5 className="my-3">{data.name}</h5>
                  <p className="text-muted mb-1">{data.email}</p>
                  <p className="text-muted mb-4">{data.mobileNO}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn btn-primary" onClick={() => navigate(`/updateProfile/${data._id}`)}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-outline-primary ms-1" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.mobileNO}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Registration Number</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.regNo}</p>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Hostel</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.hostel}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Room Number</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.roomNO==''?'Border':data.roomNO}</p>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Type</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.isAdmin==true?'Admin':'User'}</p>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Profile;
  