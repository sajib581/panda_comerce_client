import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { ProductContext } from "../../App";
import {
  addToDatabaseCart,
  removeFromDatabaseCart
} from "../../utilities/cartManager";
import { discountCalculation } from "../../utilities/commonFunction";
import CartItem from "./CartItem/CartItem";

const Cart = () => {
  const [, , cart, setCart, showCart, setShowCart] = useContext(ProductContext);
  const history = useHistory()
  const inputCartHandeler = (quantity, product) => {
    const toBeAdded = product._id;
    const sameProduct = cart.find((pd) => pd._id === toBeAdded);
    let count = 1;
    if (sameProduct) {
      const updatedCart = cart.map((product) => {
        if (product._id === toBeAdded) {
          product.cartQuantity = quantity;
        }
        return product;
      });
      setCart(updatedCart);
      count = product.cartQuantity;
      addToDatabaseCart(product._id, count);
    }
  };

  const deleteHandeler = (id) => {
    removeFromDatabaseCart(id);
    const otherCartsItem = cart.filter((pd) => pd._id !== id);
    setCart(otherCartsItem);
  };

  const totalNumberCart = cart.reduce(
    (total, product) => total + product.cartQuantity,
    0
  );
  const totalCartAmount = cart.reduce(
    (total, product) =>
      total +
      product.cartQuantity *
        discountCalculation(product.price, product.discount),
    0
  );

  return (
    <div
      style={{
        height: "550px",
        position: "absolute",
        zIndex: 100,
        backgroundColor: "white",
        border: "1px solid lightGrey",
      }}
    >
      <div className="px-3 pt-2 d-flex justify-content-between">
        <h6>Recently added item(s)</h6>
        <h5 onClick={() => setShowCart(!showCart)}>
          <FontAwesomeIcon className="text-danger" icon={faTimes} />
        </h5>
      </div>
      <div
        style={{
          height: "360px",
          borderBottom: "2px solid lightGrey",
          overflow: "auto",
        }}
      >
        {cart.map((product) => (
          <CartItem
            key={product._id}
            inputCartHandeler={inputCartHandeler}
            product={product}
            deleteHandeler={deleteHandeler}
          ></CartItem>
        ))}
      </div>
      <div className="cart-footer px-3 pt-2">
        <h6>
          <strong>{totalNumberCart}</strong>{" "}
          <span className="text-secondary">items</span>
        </h6>
        <h6>
          <span className="text-secondary">Subtotal : </span>{" "}
          <span className="fw-bold">
            BDT {Number(totalCartAmount).toLocaleString("en")}
          </span>
        </h6>
        <button onClick={()=> history.push('/shipment') }>Go To Checkout</button>
        <p onClick={()=> history.push('/review') } style={{cursor:"pointer"}} className="text-secondary text-center mt-2">View and Edit Cart</p>
      </div>
    </div>
  );
};

export default Cart;
