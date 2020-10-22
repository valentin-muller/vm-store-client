import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div>
        <h4>Admin Links</h4>
        <ul>
          <li>
            <Link to="/create/category">Create Category</Link>
          </li>
          <li>
            <Link to="/create/product">Create Product</Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div>
        <h3>User Information</h3>
        <ul>
          <li>{name}</li>
          <li>{email}</li>
          <li>{role === 1 ? "Admin" : "Registered User"}</li>
        </ul>
      </div>
    );
  };



  return (
    <Layout title="Dashboard" description={`Hi ${name}!`}>
      <div>
        <div>{adminLinks()}</div>
        <div>{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
