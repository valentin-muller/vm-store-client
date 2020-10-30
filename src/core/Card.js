import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./showImage";
import moment from "moment";
import { addItem } from "./cartHelpers";

const Card = ({ product, showViewProductButton = true }) => {
  const [redirect, setRedirect] = useState(false);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button>View Product</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartButton = () => {
    return <button onClick={addToCart}>Add to card</button>;
  };

  const showStock = (quantity) => {
    return quantity > 0 ? <span>In Stock</span> : <span>Out of Stock</span>;
  };

  return (
    <div>
      <div>
        <div>{product.name}</div>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p>{product.description.substring(0, 100)}</p>
        <p>{product.price}</p>
        <p>Category: {product.category && product.category.name}</p>
        <p>Added on {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showAddToCartButton()}
      </div>
    </div>
  );
};

export default Card;
