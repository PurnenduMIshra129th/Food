import { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function EditUser() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: userId } = params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
 

  useEffect(() => {
      const fetchData = async () => {
        const userInfoString = localStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);
        try {
          const { data } = await axios.get(`/api/users/getUser/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          setName(data.name);
          setEmail(data.email);
          // console.log("data", data);
        } catch (err) {
          console.error(err);
          if (err.response.status === 404) {
            console.log("User not found");
          } else {
            console.log("An error occurred while fetching user data");
          }
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
          `/api/users/updateUser/${userId}`,
          {
            _id: userId,
            name,
            email,
            isAdmin
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        console.log('User Update Successfully');
        navigate('/manageUser');
      } catch (err) {
       console.log(err.response.data);
      }
    };
  return (
    <div className="text-center">
    <div className="form-signin w-50 m-auto">
      <form onSubmit={submitHandler}>
        <h1 className="h3 mb-3 fw-normal">Update User </h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e)=>setName(e.currentTarget.value)}
          />
          <label htmlFor="name">Name Of User</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label htmlFor="category">Email Of User</label>
        </div>

        <div className="form-floating">
        <div className="form-check">
      <input className="form-check-input" type="checkbox" id="autoSizingCheck2" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}/>
      <label className="form-check-label" htmlFor="autoSizingCheck">
       Make The User Admin
      </label>
    </div>
        </div>
       
  
        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
          Update User
        </button>
      </form>
    </div>
  </div>
  )
}

export default EditUser