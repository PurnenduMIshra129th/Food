// import React from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Cheackout() {
  const location = useLocation();
  const { orderItem } = location.state !== null && location.state !== undefined ? location.state : { orderItem: null };
  const single_product_price=orderItem != null ?orderItem[0].price * orderItem[0].qty:0;
  const { state, dispatch } = useCart();
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const user = JSON.parse(localStorage.getItem('userInfo')) || {};
  
  // const totalQuantity = storedCart.reduce((total, item) => total + item.qty, 0);
  const itemsPrice = storedCart.reduce((total, item) => total + item.qty * item.price,single_product_price);
  const shippingPrice =0;
  const taxPrice = 0;

  const totalPrice = itemsPrice + shippingPrice;
  const orderItemsCart = storedCart.map(item => ({
    name: item.name,
    image: item.image ,
    category: item.category,
    description: item.description,
    price: item.price,
    quantity: item.qty ,
    product: item.id,
  }));
  const getItem=()=>{
    if(orderItem !== null){
      console.log("why");
      if(orderItem[0]?.bool === true){
        const directBuy = orderItem.map(item => ({
          name: item.name,
          image: item.image ,
          category: item.category,
          description: item.description,
          price: item.price,
          quantity: item.qty ,
          product: item.id,
        }));
        return directBuy;
      }
    }
    else
      return orderItemsCart;
  }

  const handlePlaceOrder = () => {
    event.preventDefault();
    const orderData = {
      // orderItems,
      orderItems:getItem() ,
      shippingAddress: { fullName, address, phone },
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isPaidUser,
      paidAt,
      paidConfirmed: false,
      isDelivered: false,
    };


    axios.post('/api/orders/newOrder', orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(response => {
        dispatch({ type: 'RESET_CART' });
        console.log('Order placed successfully:', response.data);
      })
      .catch(error => {
        console.error('Error placing order:', error.response.data.message);
      });
  };


  const [fullName, setFullName] = useState(user.name);
  const [address, setAddress] = useState(user.hostel);
  const [phone, setPhone] = useState(user.mobileNO);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [paidAt, setPaidAt] = useState(null);

  const getChecked = (checked) => {
    setIsPaidUser(() => {
      return checked;
    });
  };
  useEffect(() => {
    // Perform any actions that depend on the updated state here
  
    if (isPaidUser) {
      setPaidAt(new Date().toISOString());
      // console.log("Paid user:", isPaidUser, paidAt);
    }
  
    // console.log("is", isPaidUser);
  }, [isPaidUser, paidAt]);
  

  return (
    <div className="text-center">   
    <div className="form-signin w-50 m-auto">
      <form onSubmit={handlePlaceOrder}>
        <h1 className="h3 mb-3 fw-normal">Please Fill Out These Details</h1>
    
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="name" onChange={(e)=>setFullName(e.target.value)} required value={fullName}/>
          <label htmlFor="floatingInput">Enter Your Name</label>
        </div>
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingPassword" placeholder="address"  onChange={(e)=>setAddress(e.target.value)} required value={address}/>
          <label htmlFor="floatingPassword">Enter Your Address</label>
        </div>
        <div className="form-floating">
          <input type="number" className="form-control" id="floatingPassword" placeholder="number"  onChange={(e)=>setPhone(e.target.value)} required value={phone}/>
          <label htmlFor="floatingPassword">Enter Your Phone Number</label>
        </div>
      <div>
      <h4 className="h5 mb-3 fw-normal">Select Mode of Payment</h4>
        <div className="form-check">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Cash On Delivery"  checked={paymentMethod === "Cash On Delivery"} onChange={(e)=>setPaymentMethod(e.target.value)}/>
  <label className="form-check-label" htmlFor="exampleRadios1">
    Cash On Delivery
  </label>
</div>

<div className="form-check">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Online Payment" onChange={(e)=>setPaymentMethod(e.target.value)} checked={paymentMethod === "Online Payment"}/>
  <label className="form-check-label" htmlFor="exampleRadios2">
   Online Payment
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Takeaway" onChange={(e)=>setPaymentMethod(e.target.value)} checked={paymentMethod === "Takeaway"}/>
  <label className="form-check-label" htmlFor="exampleRadios2">
  Takeaway
  </label>
</div>
{paymentMethod == 'Online Payment'?<>
<div>
  <img src="/public/pay1.jpeg" alt="" style={{width:'12rem',height:'12rem'}}/>
  Please Pay to 8144746685 or 8144746685@ybl 
  <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"  checked={isPaidUser} onChange={(e) => getChecked(e.target.checked)}/>
      <label className="form-check-label" htmlFor="gridCheck">
        Paid ?
      </label>
    </div>
</div>
</>:
<>

</>
}
      </div>
    
        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Place Order</button> 
      </form>
    </div> 
    </div>
  );
}

export default Cheackout;
