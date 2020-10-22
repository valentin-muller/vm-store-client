import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div>
        <label>Name</label>
        <input type="text" onChange={handleChange} value={name} autoFocus required />
      </div>
      <button>Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if(success) {
      return <h3>{name} is created!</h3>
    }
  }

  const showError = () => {
    if(error) {
      return <h3>{name} category already exist!</h3>
    }
  }

  const goBack = () => (
    <div>
      <Link to="/admin/dashboard">Back to Dashboard</Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={`Hi ${user.name}! Are you ready to create a new Category?`}
    >
      <div>
        <div>
        {newCategoryForm()}
        {showSuccess()}
        {showError()}
        {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
