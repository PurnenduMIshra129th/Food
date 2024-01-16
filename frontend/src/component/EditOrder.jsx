import { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from './config';
function EditOrder() {
    const navigate = useNavigate();
    const params = useParams();
    const { id: orderId } = params;

      const submitHandler = async (e) => {
        e.preventDefault();
        const userInfoString = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoString);
        try {
          await axios.put(
            `${BASE_URL}/api/orders/updateOrders/${orderId}`,
            {
              _id: orderId,
              paidConfirmed,
              paidConfirmedByAdmin,
              isDelivered,
              deliveredAt,
            },
            {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }
          );
          console.log('Order Update Successfully');
          navigate('/manageOrder');
        } catch (err) {
         console.log(err.response.data);
        }
      };
   
      const [paidConfirmed, setPaidConfirmed] = useState(false);
      const [paidConfirmedByAdmin, setPaidConfirmedByAdmin] = useState(null);
      const [isDelivered, setIsDelivered] = useState(false);
      const [deliveredAt, setDeliveredAt] = useState(null);
    
      const getConfirmed = (checked) => {
        setPaidConfirmed(() => {
          return checked;
        });
      };
      useEffect(() => {      
        if (paidConfirmed) {
            setPaidConfirmedByAdmin(new Date().toISOString());
        }
      }, [paidConfirmed, paidConfirmedByAdmin]);
      const getDelivered = (checked) => {
        setIsDelivered(() => {
          return checked;
        });
      };
      useEffect(() => {      
        if (isDelivered) {
            setDeliveredAt(new Date().toISOString());
        }
      }, [isDelivered, deliveredAt]);
  return (
    <div className="container">
    <form className="row gy-2 gx-3 align-items-center" onSubmit={submitHandler}>
  <div className="col-auto">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="autoSizingCheck1" checked={paidConfirmed} onChange={(e) => getConfirmed(e.target.checked)}/>
      <label className="form-check-label" htmlFor="autoSizingCheck">
        Paid Confirmed?
      </label>
    </div>
  </div>
  <div className="col-auto">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="autoSizingCheck2" checked={isDelivered} onChange={(e) => getDelivered(e.target.checked)}/>
      <label className="form-check-label" htmlFor="autoSizingCheck">
        Delivered?
      </label>
    </div>
  </div>
  <div className="col-auto">
    <button type="submit" className="btn btn-primary">Update</button>
  </div>
</form>
    </div>
  )
}

export default EditOrder