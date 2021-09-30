import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { ProductContext } from "../../App";
import CartItem from "./CartItem/CartItem";

const Cart = () => {
  const [,, cart, setCart, showCart, setShowCart] = useContext(ProductContext);
  return (
    <div
      style={{
        minHeight: "400px",
        width: "290px",
        position: "absolute",
        zIndex: 1,
        backgroundColor: "white", 
        border : "1px solid lightGrey"
      }}
    >
      <div className="px-3 pt-2 d-flex justify-content-between">
      <h6 >Recently added item(s)</h6> 
      <h5 onClick={()=>setShowCart(!showCart)}><FontAwesomeIcon className="text-danger" icon={faTimes} /></h5>
      </div>
      <div>
            {
                cart.map((product) => <CartItem product={product}></CartItem> )
            }
      </div>
    </div>
  );
};

export default Cart;
