import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div>
        <label>
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          ></input>
        </label>
      </div>

      <div>
        <label>Description</label>
        <input onChange={handleChange("name")} type="text" value={name} />
      </div>

      <div>
        <label>Name</label>
        <textarea
          onChange={handleChange("description")}
          type="text"
          value={description}
        />
      </div>

      <div>
        <label>Price</label>
        <input onChange={handleChange("price")} type="number" value={price} />
      </div>

      <div>
        <label>Category</label>
        <select onChange={handleChange("category")}>
        <option>Please select</option>
        {categories && categories.map((c, i) => (
            <option key={i} value={c._id}>
                {c.name}
            </option>
        ))}
        </select>
      </div>

      <div>
        <label>Shipping</label>
        <select onChange={handleChange("shipping")}>
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div>
        <label>Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          value={quantity}
        />
      </div>

      <button>Create Product</button>
    </form>
  );


const showError = () => (
    <div>{error}</div>
)

const showSuccess = () => (
    <div>{`${createdProduct}is created!`}</div>
)

const showLoading = () => (
    loading && (<div>Loading...</div>)
);
  return (
    <Layout
      title="Add a new product"
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div>
        <div>
        {showLoading()}
        {showSuccess()} 
        {showError()} 
        {newPostForm()} 
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
