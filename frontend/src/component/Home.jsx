import "./css/home.css";
import { useReducer, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const fetchData = async () => {
    const userInfoString = localStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);
    try {
      const result = await axios.get("/api/products/getProduct",{
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log("data",result.data);
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.response.data });
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run the fetchData function when the component mounts
  return (
    <div>
      <h2 className="text-start m-3">Available Food Items</h2>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}

      {state.data.length > 0 && (
        <div className="d-flex flex-row justify-content-center flex-wrap">
          {state.data.map((item, index) => (
            <div
              key={index}
              className="card1 position-relative"
              onClick={() => navigate(`/singleProduct/${item._id}`)}
            >
              <span
                style={{
                  position:'absolute',
                  backgroundColor: "blue",
                  color: "white",
                  padding: "4px 8px",
                  textAlign: "center",
                  borderRadius: "5px",
                  top: "0px",
                  right: "0px",
                }}
              >
                {item.status}
              </span>
              {item.image == "" ? (
                <img src="/public/food.jpg" alt="" style={{ width: "100%" }} />
              ) : (
                <img src={item.image} alt="" style={{ width: "100%" }} />
              )}
              <div className="container1">
                <h4 className="text-sm font-medium text-gray-900 text-wrap text-break">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500 mb-5 text-wrap text-break">
                  {item.description}
                </p>
                <h5 className="text-sm font-medium text-gray-900 position-absolute bottom-0 start-0 p-1 mt-2">
                  {item.price}&#8377;
                </h5>
                <h6 className="text-sm font-medium text-gray-900 position-absolute bottom-0 end-0 p-1">
                  {item.rating} &#9733;
                </h6>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
