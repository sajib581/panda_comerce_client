import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { discountCalculation } from "../../../utilities/commonFunction";
import "./CartItem.css";

const CartItem = ({ product, deleteHandeler, inputCartHandeler }) => {
  const [cartInputNum, setCartInputNum] = useState(product.cartQuantity);
  const inputHandel= (e) => {
    e.target.value = e.target.value.replace('-', '')
    setCartInputNum(e.target.value > 0 ? e.target.value : 0)
  }

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
            <strong>
              {Number(
                discountCalculation(product.price, product.discount)
              ).toLocaleString("en")}{" "}
              <span
                className="ml-5 text-secondary"
                style={{ textDecoration: "line-through" }}
              >
                {product.price}
              </span>
            </strong>
          </h6>
          <div
            style={{ width: "210px" }}
            className="d-flex justify-content-between"
          >
            <div>
              <span>Qty : </span>
              <input
                className="form-control input-qty  ml-1 px-1 py-1 mr-1"
                placeholder={product.cartQuantity}
                type="number"
                name="price"
                aria-describedby="emailHelp"
                min="1"
                onChange={inputHandel }
              />
              {
               product.cartQuantity !== Number(cartInputNum) &&   <span>
                <small
                  onClick={() =>
                    inputCartHandeler(Number(cartInputNum), product)
                  }
                  className="update p-1 rounded ml-2"
                >
                  update
                </small>
              </span>
              }
            </div>
            <div className="mt-1">
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                className="text-secondary  "
                icon={faPencilAlt}
              />
              <FontAwesomeIcon
                onClick={() => deleteHandeler(product._id)}
                style={{ cursor: "pointer" }}
                className="text-secondary ml-2 mr-3"
                icon={faTrashAlt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
