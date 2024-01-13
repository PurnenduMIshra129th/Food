import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
 
function ManageProduct() {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchData = async () => {
      const userInfoString = localStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);
      try {
        const result = await axios.get("/api/products/getProduct",{
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.response.data });
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); // Run the fetchData function when the component mounts
    const deleteHandler = async (product) => {
      const userInfoString = localStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);
      // console.log('id',product);
      if (window.confirm('Are you sure to delete?')) {
        try {
          await axios.delete(`/api/products/deleteProduct/${product}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          location.reload();
          console.log('product deleted successfully');
        } catch (err) {
          console.log(err);
        }
      }
    };
  return (
    <div className="list-group w-auto">
        <div className='d-flex justify-content-between flex-wrap'>
        <h2 className='text-start m-3'>Product Page Managed By Admin</h2>
        <button type="button" className="btn btn-success btn-sm m-4" onClick={()=>navigate('/addProduct')}>Create Product</button>
        </div>
{state.loading && <p>Loading...</p>}
{state.error && <p>Error: {state.error}</p>}
{state.data.length > 0 && (
        <div className=''>
          {state.data.map((item, index) => (
          <div key={index} className="list-group-item list-group-item-action d-flex gap-3 py-3  flex-wrap " aria-current="true">
          <div className='rounded-circle flex-shrink-0 border border-primary p-2' style={{width:'32',height:'32'}}>{item.rating}  &#9733;</div>
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 className="mb-0">{item.name}</h6>
              <p className="mb-0 opacity-75 text-break">{item.description}</p>
              <p className="mb-0 text-break text-dark ">Status:{item.status}</p>
            </div>
            <p className="opacity-50 text-nowrap me-5 text-primary">{item.price}&#8377;</p>
          </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={() => navigate(`/updateProduct/${item._id}`)}>Edit</button>
  <button className="btn btn-danger btn-sm" type="button" onClick={() => deleteHandler(item._id)}>Delete</button>
</div>
        </div>
          ))}
        </div>
      )}

</div>
  )
}

export default ManageProduct