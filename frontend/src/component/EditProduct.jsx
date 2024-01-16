import { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from './config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditProduct() {
    const navigate = useNavigate();
    const params = useParams(); // /product/:id
    const { id: productId } = params;

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setNumReviews] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          const userInfoString = localStorage.getItem('userInfo');
          const userInfo = JSON.parse(userInfoString);
          try {
            const { data } = await axios.get(`${BASE_URL}/api/products/getProduct/${productId}`,{
              headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            setName(data.name);
            setCategory(data.category);
            setDescription(data.description);
            setPrice(data.price);
            setStatus(data.status);
            setRating(data.rating);
            setNumReviews(data.numReviews);
            setImage(data.image);
            // console.log('image:',data.image);
          } catch (err) {
           console.log(err);
           toast.error("Error in fetching product details")
          }
        };
        fetchData();
      }, [productId]);

      const submitHandler = async (e) => {
        e.preventDefault();
        const userInfoString = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoString);
        try {
          await axios.put(
            `${BASE_URL}/api/products/updateProduct/${productId}`,
            {
              _id: productId,
              name,
              category,
              description,
              price,
              status,
              rating,
              numReviews,
              image,
            },
            {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }
          );
          console.log('Product Update Successfully');
          toast.success("Product Update Successfully")
          navigate('/manageProduct');
        } catch (err) {
         console.log(err.response.data);
         toast.error("Error in updating product details")
        }
      };
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        try {
          const { data } = await axios.post(`${BASE_URL}/api/uploads/upload`, bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          });
            setImage(data.secure_url);
          console.log('Image uploaded successfully. click Update to apply it');
          toast.success('Image uploaded successfully. click Update to apply it')
        } catch (err) {
          console.log(err);
          toast.error("error in uploading image")
        }
      };
  return (
    
    <div className="text-center">
  <div className="form-signin w-50 m-auto">
    <form onSubmit={submitHandler}>
      <h1 className="h3 mb-3 fw-normal">Update Product </h1>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter Item"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="name">Name Of Item</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="category"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="category">Enter Category</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="description">Enter Description</label>
      </div>
      <div className="form-floating">
        <input
          type="number"
          className="form-control"
          id="price"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="price">Enter Price</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="status"
          placeholder="Enter if Item is Available or Not?"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <label htmlFor="status">Enter if Item is Available or Not?</label>
      </div>
      <div className="form-floating">
        <input
          type="number"
          className="form-control"
          id="rating"
          placeholder="Enter Initial Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <label htmlFor="rating">Enter Initial Rating</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="numReviews"
          placeholder="Enter Number Of Reviews"
          value={numReviews}
          onChange={(e) => setNumReviews(e.target.value)}
        />
        <label htmlFor="numReviews">Enter Number Of Reviews</label>
      </div>
      <div className="form-floating">
        <input
          className="form-control"
          type="file"
          id="formFile"
          placeholder="Upload Any Image Of The Item"
          onChange={uploadFileHandler}
        />
        <label htmlFor="formFile">Upload Any Image Of The Item</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
        Update Product
      </button>
    </form>
  </div>
</div>
  )
}

export default EditProduct