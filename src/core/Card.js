import React from "react";
import { Link } from "react-router-dom";
import ShowImage from './showImage'
const Card = ({ product, showViewProductButton = true }) => {


  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button>
            View Product
          </button>
        </Link>
      )
      )
  }

  return (
    <div>
      <div>
        <div>{product.name}</div>
        <ShowImage item={ product } url="product" />
        <p>{product.description.substring(0, 100)}</p>
        <p>{product.price}</p>
        <Link to={`/product/${product._id}`}>
          {showViewButton(showViewProductButton)}
        </Link>
        <button>Add to card</button>
      </div>
    </div>
  );
};

export default Card;
