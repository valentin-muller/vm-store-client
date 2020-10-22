import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "asdsda@gmail.com",
    password: "Asdsda99",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div>
        <label>Email</label>
        <input onChange={handleChange("email")} type="email" value={email} />
      </div>

      <div>
        <label>Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          value={password}
        />
      </div>
      <button onClick={clickSubmit}>Submit</button>
    </form>
  );

  const showError = () => <div>{error}</div>;

  const showLoading = () =>
    loading && (
      <div>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if(isAuthenticated()) {
    return <Redirect to="/home" />
    }
  };

  return (
    <Layout title="Signin" description="Signup to Node React E-commerce App">
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
 