import React, { useState } from "react";
import Product from "../Product/Product";

const AllProducts = () => {
  const [products, setAllProducts] = useState([]);
  fetch('http://localhost:5000/user/allProduct')
    .then((response)=> response.json())
    .then(data => setAllProducts(data.data) )

    console.log(products);
  return (
    <div>
      <div className="px-5">
        <h1>All Product</h1>
        <div className="row">
          {
              products.map((product, index)=> <Product  key={index} product={product}/>)
          }
          {
              products.map((product, index)=> <Product  key={index} product={product}/>)
          }
          {
              products.map((product, index)=> <Product  key={index} product={product}/>)
          }
          {
              products.map((product, index)=> <Product  key={index} product={product}/>)
          }
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
