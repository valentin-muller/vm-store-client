import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import {Link} from 'react-router-dom'

const Dashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLinks = () => {
      return (
          <div>
              <h4>User Links</h4>
              <ul>
                  <li>
                      <Link to="/cart">My Cart</Link>
                  </li>
                  <li>
                      <Link to="/profile/update">Update Profile</Link>
                  </li>
              </ul>
          </div>
      )
  }

  const userInfo = () => {
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
  }

  const purchaseHistory = () => {
      return (
        <div>
          <h3>Purchase History</h3>
          <ul>
            <li>history</li>
          </ul>
        </div>
      );
  }

  return (
    <Layout title="Dashboard" description={`Hi ${name}!`}>
        <div>
            <div>{userLinks()}</div>
            <div>{userInfo()}</div>
            <div>{purchaseHistory()}</div>
        </div>
    </Layout>
  );
};

export default Dashboard;
