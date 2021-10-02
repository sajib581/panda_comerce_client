import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { ProductContext } from "../../../App";
import { discountCalculation } from "../../../utilities/commonFunction";
import "./Product.css";

const Product = ({ product, handelAddProduct }) => {
  const [products, setAllProducts, cart, setCart] = useContext (ProductContext)
  const history = useHistory()

  
  return (
    <div className="col-md-3 my-3  text-center ">
      <div className="border  product pt-1">
        <div onClick={()=>history.push("/product/"+ product._id )} style={{cursor:"pointer"}} className="product-image d-flex align-items-center">
          <img src={product.image} alt="" className="" />
        </div>
        <div className="dot d-flex align-items-center justify-content-center">
            <div>
            <h5 className="mb-0 pb-0">{product.discount}%</h5>
            <h6><small>OFF</small> </h6>
            </div>
        </div>
        <div className="product-description">
          <small className="text-secondary">{product.name}</small>
          <h6>BDT {Number(discountCalculation(product.price, product.discount)).toLocaleString("en")}</h6>
          <small style={{textDecoration: "line-through"}} className="text-secondary">BDT {Number(product.price).toLocaleString("en")}</small>
          <button onClick={()=>handelAddProduct(product)} className="btn cartBtn btn-outline-success px-5 mb-3">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
