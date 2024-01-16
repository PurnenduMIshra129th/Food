import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  './css/manageUser.css'
import BASE_URL from './config';
const initialState = {
    data: [],
    error: null,
    loading: true,
  }; 
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      case 'FETCH_ERROR':
        return {
          ...state,
          data: [],
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
function ManageUser() {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchData = async () => {
        const userInfoString = localStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);
      try {
        const result = await axios.get(`${BASE_URL}/api/users/getUsers`,{
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.response.data });
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); 
    const deleteHandler = async (user) => {
        const userInfoString = localStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);
        // console.log('id',product);
        if (window.confirm('Are you sure to delete?')) {
          try {
            await axios.delete(`${BASE_URL}/api/users/deleteUser/${user}`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            location.reload();
            console.log('user deleted successfully');
          } catch (err) {
            console.log(err.response.data);
          }
        }
      };
  return (
    <div className="list-group w-auto">
        <div className='d-flex justify-content-between flex-wrap'>
        <h2 className='text-start m-3'>User Page Managed By Admin</h2>
        </div>
{state.loading && <p>Loading...</p>}
{state.error && <p>Error: {state.error}</p>}

<table className="table">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Hostel</th>
      <th scope="col">Registration Number</th>
      <th scope="col">Room Number</th>
      <th scope="col">Mobile Number</th>
      <th scope="col">Is Admin</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {state.data.length > 0 ? (
      state.data.map((user, index) => (
        <tr
          key={index}
          style={{ color: "white" }}
        >
          <th scope="row" data-label="No">
            {index + 1}
          </th>
          <td data-label="Name" style={{wordWrap:'break-word'}}>{user.name}</td>
          <td data-label="Email" style={{wordWrap:'break-word'}}>{user.email}</td>
          <td data-label="Hostel" style={{wordWrap:'break-word'}}>{user.hostel}</td>
          <td data-label="Registration Number" style={{wordWrap:'break-word'}}>{user.regNo}</td>
          <td data-label="Room Number" style={{wordWrap:'break-word'}}>{user.roomNO}</td>
          <td data-label="Mobile Number" style={{wordWrap:'break-word'}}>{user.mobileNO}</td>
          <td data-label="Is Admin" style={{wordWrap:'break-word'}}>{user.isAdmin==true?'True':'False'}</td>
          {/* {console.log('admin',user.isAdmin)} */}
          <td data-label="Edit" style={{wordWrap:'break-word'}}> <button className="btn btn-primary  btn-sm" type="button" onClick={() => navigate(`/updateUser/${user._id}`)}>Edit</button></td>
          <td data-label="Delete" style={{wordWrap:'break-word'}}><button className="btn btn-danger btn-sm" type="button" onClick={() => deleteHandler(user._id)}>Delete</button></td>
        </tr>
      ))
    ) : (
      <tr style={{ color: "white" }}>
        <td colSpan="7">No results found</td>
      </tr>
    )}
  </tbody>
</table>
</div>
  )
}

export default ManageUser
