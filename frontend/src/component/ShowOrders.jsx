import "./css/home.css";
import { useReducer, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ERROR":
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
function ShowOrders() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  const { id: orderId } = params;
  const fetchData = async () => {
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);
    try {
      const result = await axios.get(
        `${BASE_URL}/api/orders/getParticularOrder/${orderId}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "FETCH_SUCCESS", payload: result.data.orderItems });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.response.data });
      console.log(err.response.data);
      toast.error("Error in fetching order items")
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run the fetchData function when the component mounts
  return (
    <div className="list-group w-auto">
      <div className="d-flex justify-content-between flex-wrap">
        <h2 className="text-start m-3">Your Order Items</h2>
      </div>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {state.data.length > 0 ? (
            state.data.map((order, index) => (
              <tr key={index} style={{ color: "white" }}>
                <th scope="row" data-label="No">
                  {index + 1}
                </th>
                <td data-label="Name" style={{ wordWrap: "break-word" }}>
                  {order.name}
                </td>
                <td data-label="Description" style={{ wordWrap: "break-word" }}>
                  {order.description}
                </td>
                <td data-label="Category" style={{ wordWrap: "break-word" }}>
                  {order.category}
                </td>
                <td data-label="Price" style={{ wordWrap: "break-word" }}>
                  {order.price}
                </td>
                <td data-label="Quantity" style={{ wordWrap: "break-word" }}>
                  {order.quantity}
                </td>
                <td data-label="Total Price" style={{ wordWrap: "break-word" }}>
                  {order.quantity * order.price}
                </td>
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
  );
}

export default ShowOrders;
