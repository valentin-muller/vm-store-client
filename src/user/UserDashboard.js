import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

const Dashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  return (
    <Layout title="Dashboard" description="User Dashboard">
      <div>
        <h3>User Information</h3>
        <ul>
          <li>{name}</li>
          <li>{email}</li>
          <li>{role === 1 ? "Admin" : "Registered User"}</li>
        </ul>
      </div>

      <div>
        <h3>Purchase History</h3>
        <ul>
          <li>history</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Dashboard;
