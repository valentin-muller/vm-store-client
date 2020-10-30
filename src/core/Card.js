import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./showImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = true
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

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

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && <button onClick={addToCart}>Add to cart</button>
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && <button onClick={() => removeItem(product._id)}>Remove Product</button>
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? <span>In Stock</span> : <span>Out of Stock</span>;
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if(event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }
  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && <div>
      <div>
        <span>Adjust Quantity</span>
      </div>
      <input type="number" value={count} onChange={handleChange(product._id)}/>
    </div>
  }

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
        {showAddToCart(showAddToCartButton)}

        {showRemoveButton(showRemoveButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
