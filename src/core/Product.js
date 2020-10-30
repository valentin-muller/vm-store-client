import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        listRelated(data._id).then(data => {
          if(data.error) {
            setError(data.error)
          } else {
            setRelatedProduct(data )
          }
        })
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
    >
      <div>
        <div>
          <div>
            {product && product.description && (
              <Card product={product} showViewProductButton={false} />
            )}
          </div>

          <div>
          <br />
            <h2>Related Products</h2>
          <br />
            {relatedProduct.map((p, i) => (
              <div>
                <Card key={i} product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
