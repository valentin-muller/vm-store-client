import React, { useState, useEffect } from "react";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
} from "./apiCore";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";
import {emptyCart} from './cartHelpers';

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button>Sign in to checkout</button>
      </Link>
    );
  };

  const buy = () => {

    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data, 'data');
        nonce = data.nonce;
        console.log(
            "send nonce and total to process: ",
            nonce,
            getTotal(products)
        );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            setData({ ...data, success: response.success });
            emptyCart(() => {
              console.log('payment success, cart emptied');
              
            })
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {

        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy}>
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div>
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div>
      Thanks! Your payment was successful!
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
