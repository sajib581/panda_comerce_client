import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./CartItem.css";

const CartItem = ({ product }) => {
  return (
    <div className="cart-item d-flex align-items-center ">
      <div className="d-flex ml-2">
        <div className="cart-item-img">
          <img
            className="img-fluid"
            src={product.image}
            alt="cart Item image"
          />
        </div>
        <div className="ml-2">
          <small style={{ fontWeight: 600 }}>{product.name}</small>
          <h6>
            <strong>{Number(product.price).toLocaleString("en")}</strong>
          </h6>
          <div style={{width : "170px"}} className="d-flex justify-content-between">
            <div>
              <span>Qty: </span>
              <input
                className="form-control input-qty  ml-1 px-1 py-1 mr-1"
                placeholder={product.cartQuantity}
                type="text"
              />
              <small className="p-1 rounded" style={{backgroundColor : "lightgray"}} >update</small>
            </div>
            <div className="">
            <FontAwesomeIcon className="text-secondary mr-1" icon={faPencilAlt} />
            <FontAwesomeIcon className="text-secondary" icon={faTrashAlt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
