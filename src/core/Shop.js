import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from './Checkbox'

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init()
  }, [])

  return (
    <Layout
      title="Shop Page"
      description="Search and find items of your choice"
    >
      <div>
        <div>
        <h4>Filter By Categories</h4>
          <ul>
            <Checkbox categories={categories} />
          </ul>
        </div>
        <div>right sidebar</div>
      </div>
    </Layout>
  );
};

export default Shop;
