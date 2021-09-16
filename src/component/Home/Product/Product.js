import React from "react";
import "./Product.css";

const Product = ({ product }) => {
  return (
    <div className="col-md-3 my-3  text-center ">
      <div className="border  product">
        <img src={product.image} alt="" className="" />
        <div>
          <h5>Hero Hunk</h5>
          <h6>2,40,000 tk</h6>
          <button className="btn cartBtn btn-outline-success px-5 mb-3">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
