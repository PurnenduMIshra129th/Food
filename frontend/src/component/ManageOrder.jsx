import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  './css/manageUser.css'
import BASE_URL from './config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function ManageOrder() {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchData = async () => {
      const userInfoString = localStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);
      try {
        const result = await axios.get(`${BASE_URL}/api/orders/getOrders`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
    
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        // console.log("data", result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.response.data });
        toast.error("Error in fetching order items")
      }
    };
    
  
    useEffect(() => {
      fetchData();
    }, []); 
    const deleteHandler = async (order) => {
        const userInfoString = localStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);
        // console.log('id',order);
        if (window.confirm('Are you sure to delete?')) {
          try {
            await axios.delete(`${BASE_URL}/api/orders/deleteOrder/${order}`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            location.reload();
            console.log('Order deleted successfully');
            toast.success("Order deleted successfully")
          } catch (err) {
            console.log(err.response.data);
            toast.error("Error in deleting order item")
          }
        }
      };
  return (
    <div className="list-group w-auto">
    <div className='d-flex justify-content-between flex-wrap'>
    <h2 className='text-start m-3'>Order Page Managed By Admin</h2>
    </div>
{state.loading && <p>Loading...</p>}
{state.error && <p>Error: {state.error}</p>}

<table className="table">
<thead>
<tr>
  <th scope="col">No.</th>
  <th scope="col">Name</th>
  <th scope="col">Address</th>
  <th scope="col">Phone</th>
  <th scope="col">Payment Method</th>
  <th scope="col">Total Price</th>
  <th scope="col">Paid By User</th>
  <th scope="col">Paid At</th>
  <th scope="col">Paid Confirmed</th>
  <th scope="col">Paid Confirmed At</th>
  <th scope="col">Is Delivered?</th>
  <th scope="col">Delivered At</th>
  <th scope="col">Show</th>
  <th scope="col">Edit</th>
  <th scope="col">Delete</th>
</tr>
</thead>
<tbody>
{state.data.length > 0 ? (
  state.data.map((order, index) => (
    <tr
      key={index}
      style={{ color: "white" }}
    >
      <th scope="row" data-label="No">
        {index + 1}
      </th>
      <td data-label="Name" style={{wordWrap:'break-word'}}>{order.shippingAddress.fullName}</td>
      <td data-label="Address" style={{wordWrap:'break-word'}}>{order.shippingAddress.address}</td>
      <td data-label="Phone" style={{wordWrap:'break-word'}}>{order.shippingAddress.phone}</td>
      <td data-label="Payment Method" style={{wordWrap:'break-word'}}>{order.paymentMethod}</td>
      <td data-label="Total Price" style={{wordWrap:'break-word'}}>{order.totalPrice}</td>
      <td data-label="Paid By User" style={{wordWrap:'break-word'}}>{order.paymentMethod === 'Cash on Delivery'
  ? (order.paidConfirmed ? 'Paid' : 'Not Paid')
  : (order.isPaidUser ? 'Paid' : (order.paidConfirmed ? 'Paid' : 'Not Paid'))}</td>
      {/* {console.log("ispaiduser:",user.isPaidUser)} */}
      <td data-label="Paid At" style={{wordWrap:'break-word'}}>{order.paymentMethod === 'Cash On Delivery' ?(order.paidConfirmedByAdmin==null?'Not Confirmed Yet':new Date(order.paidConfirmedByAdmin).toLocaleString()) :(order.paidAt== null?(order.paidConfirmedByAdmin==null?'Not Confirmed Yet':new Date(order.paidConfirmedByAdmin).toLocaleString()):new Date(order.paidAt).toLocaleString())}</td>
      <td data-label="Paid Confirmed" style={{wordWrap:'break-word'}}>{order.paidConfirmed == true?'Paid':'Not Paid'}</td>
      <td data-label="Paid Confirmed At" style={{wordWrap:'break-word'}}>{order.paidConfirmedByAdmin==null?'Not Confirmed Yet':new Date(order.paidConfirmedByAdmin).toLocaleString()}</td>
      <td data-label="Is Delivered?" style={{wordWrap:'break-word'}}>{order.isDelivered == true ? 'Dellivered':'Not Delivered'}</td>
      <td data-label="Delivered At" style={{wordWrap:'break-word'}}>{order.deliveredAt==null?'Not Delivered Yet': new Date(order.deliveredAt ).toLocaleString()}</td>
      <td data-label="Show" style={{wordWrap:'break-word'}}> <button className="btn btn-primary  btn-sm" type="button" onClick={() => navigate(`/showOrders/${order._id}`)}>Show</button></td>
      <td data-label="Edit" style={{wordWrap:'break-word'}}> <button className="btn btn-primary  btn-sm" type="button" onClick={() => navigate(`/updateOrder/${order._id}`)}>Edit</button></td>
      <td data-label="Delete" style={{wordWrap:'break-word'}}><button className="btn btn-danger btn-sm" type="button" onClick={() => deleteHandler(order._id)}>Delete</button></td>
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

export default ManageOrder