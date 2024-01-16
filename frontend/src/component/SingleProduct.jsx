import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import BASE_URL from './config';
import "./css/singleProduct.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from "./CartContext";
function SingleProduct() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  // const history = useHistory();
  const { id: productId } = params;
  const [data, setData] = useState([]);
  const [qty, setQty] = useState(1);

  const { dispatch, state } = useCart();

  const addToCart = () => {
    // Check if the item is already in the cart
    const existingItem = state.cart.find((item) => item.id === data._id);

    if (existingItem) {
      // If it exists, update the quantity
      const updatedCart = state.cart.map((item) =>
        item.id === data._id ? { ...item, qty: item.qty + parseInt(qty) } : item
      );

      dispatch({ type: "UPDATE_CART", payload: updatedCart });
    } else {
      // If it doesn't exist, add a new item to the cart
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: data._id,
          name: data.name,
          qty: parseInt(qty),
          price: data.price,
          image: data.image,
          status: data.status,
          category: data.category,
          description: data.description,
        },
      });
    }
    navigate('/home')
  };

  const handleBuyNow = (item) => {
    const orderItem = {
      id: item.id,
      name: item.name,
      qty: item.qty,
      price: item.price ,
      image: item.image,
      status: item.status,
      category: item.category,
      description: item.description,
      bool: item.bool,
    };
    // console.log("bool",orderItem.bool);

    // Navigate to the checkout page and pass the orderItem as state
    navigate('/cheackOut',  { state: { orderItem: [orderItem] } });
  };
  useEffect(() => {
    const fetchData = async () => {
      const userInfoString = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoString);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/products/getProduct/${productId}`,{
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        console.log(data);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [productId]);

  // Load cart data from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(storedCart) });
    }
  }, [dispatch]);

  // Save cart data to localStorage whenever cart is updated
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <div className="super_container">
      <header className="header" style={{ display: "none" }}>
        <div className="header_main">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
                <div className="header_search">
                  <div className="header_search_content">
                    <div className="header_search_form_container">
                      <form action="#" className="header_search_form clearfix">
                        <div className="custom_dropdown">
                          <div className="custom_dropdown_list">
                            {" "}
                            <span className="custom_dropdown_placeholder clc">
                              All Categories
                            </span>{" "}
                            <i className="fas fa-chevron-down"></i>
                            <ul className="custom_list clc">
                              <li>
                                <a className="clc" href="#">
                                  All Categories
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="single_product">
        <div
          className="container-fluid"
          style={{ backgroundColor: "#fff", padding: "11px" }}
        >
          <div className="row">
            <div className="col-lg-4 order-lg-2 order-1">
              <div className="image_selected">
                <img src={data.image} alt="" />
              </div>
            </div>
            <div className="col-lg-6 order-3">
              <div className="product_description">
                <div className="product_name">
                  Food Name:{data.name} ({data.description})
                </div>
                <div className="product-rating">
                  <span className="badge1 badge-success">
                    <i className="fa fa-star"></i>{" "}
                  </span>{" "}
                  <span className="rating-review">
                    {data.rating}Ratings & {data.numReviews} Reviews
                  </span>
                </div>
                <div>
                  {" "}
                  <span className="product_price">
                    ₹ {data.price - (data.price * 10) / 100}
                  </span>{" "}
                  <strike className="product_discount">
                    {" "}
                    <span style={{ color: "black" }}>₹ {data.price}</span>{" "}
                  </strike>{" "}
                </div>
                <div>
                  {" "}
                  <span className="product_saved">You Saved:</span>{" "}
                  <span style={{ color: "black" }}>
                    ₹{(data.price * 10) / 100}
                  </span>{" "}
                </div>
                <hr className="singleline" />
                <div>
                  {" "}
                  <span className="product_info">
                    EMI starts at ₹ 2,000. No Cost EMI Available
                  </span>
                  <br />{" "}
                  <span className="product_info">
                    Warranty: 6 months warranty
                  </span>
                  <br />{" "}
                  <span className="product_info">
                    7 Days easy return policy
                  </span>
                  <br />{" "}
                  <span className="product_info">
                    7 Days easy return policy
                  </span>
                  <br />{" "}
                  <span className="product_info">
                    In Stock: 25 units sold this week
                  </span>{" "}
                </div>
                <div>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="br-dashed">
                        <div className="row">
                          <div className="col-md-3 col-xs-3">
                            {" "}
                            <img src="https://img.icons8.com/color/48/000000/price-tag.png" />{" "}
                          </div>
                          <div className="col-md-9 col-xs-9">
                            <div className="pr-info">
                              {" "}
                              <span className="break-all">
                                Get 10% instant discount if you are a Hosteler
                              </span>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7"> </div>
                  </div>
                </div>
                <hr className="singleline" />
                <div className="order_info d-flex flex-row"></div>
                <div className="row">
                  <div className="col-xs-6 p-0">
                    <div className="form-floating m-3 w-50">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="quantity"
                        required
                        onChange={(e) => setQty(e.target.value)}
                        value={qty}
                      />
                      <label htmlFor="floatingInput">Quantity</label>
                    </div>
                  </div>
                  {console.log(data.price)}
                  <div className="col-xs-6">
                    {" "}
                    <button
                      type="button"
                      className="btn btn-primary shop-button"
                      onClick={() =>
                        addToCart({
                          id: data._id,
                          name: data.name,
                          qty: qty,
                          price: data.price,
                          image: data.image,
                          status: data.status,
                          category: data.category,
                          description: data.description,
                        })
                      }
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      className="btn btn-success shop-button" onClick={() => handleBuyNow({
                        id: data._id,
                        name: data.name,
                        qty: qty,
                        price: data.price ,
                        image: data.image,
                        status: data.status,
                        category: data.category,
                        description: data.description,
                        bool:true
                      })}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
