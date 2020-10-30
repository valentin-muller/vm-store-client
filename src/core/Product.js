import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, []);

  return (
    <Layout
      title={product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
    >
      <div>{product && product.description && <Card product={product} showViewProductButton={false} />}</div>
    </Layout>
  );
};

export default Product;
