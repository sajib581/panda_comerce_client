import React, { useContext } from "react";
import { useHistory } from "react-router";
import { ProductContext } from "../../../App";
import { addToDatabaseCart } from "../../../utilities/cartManager";
import SummeryItem from "../SummeryItem/SummeryItem";
import "./Summery.css";

const Summery = ({deleteHandeler}) => {
  const [, , cart, setCart, showCart, setShowCart] = useContext(ProductContext);
  const history = useHistory()

  const totalCartAmount = cart.reduce(
    (total, product) =>
      total +
      product.cartQuantity * product.price ,
    0
  );
 const deliveryFee = totalCartAmount?  990 : 0 ;
  const totalDiscount = cart.reduce((total, product) => total + product.price * (product.discount/100) * product.cartQuantity , 0 )
const total = totalCartAmount + deliveryFee - totalDiscount
  const plusMinusHandeler = (quantity, product, sign) => {
    const toBeAdded = product._id;
    const sameProduct = cart.find((pd) => pd._id === toBeAdded);
    let count = 1;
    if (sameProduct) {
      const updatedCart = cart.map((product) => {
        if (product._id === toBeAdded) {
        if(sign === "+" ){
            product.cartQuantity +=1 ;
        }else if(sign === '-'){
            product.cartQuantity -=1 
        }
        }
        return product;
      });
      setCart(updatedCart);
      count = product.cartQuantity;
      addToDatabaseCart(product._id, count);
    }
  };
  return (
    <div className="summery">
      <div className="product-view mt-5 px-3 py-2">
        {cart.map((pd) => (
          <SummeryItem 
                key={pd._id} 
                plusMinusHandeler={plusMinusHandeler} 
                cartProduct={pd}
                deleteHandeler={deleteHandeler}
            ></SummeryItem>
        ))}
      </div>
      <div className="balance-view d-flex justify-content-between">
        <div>
          <small>Subtotal</small> <br />
          <small>Delivery fee</small> <br />
          <small>Discount</small> <br />
          <p className="my-3">
            <strong>Total(Incl. VAT)</strong>{" "}
          </p>
        </div>
        <div>
          <small>TK {Number(totalCartAmount).toLocaleString('en')}</small> <br />
          <small>TK {deliveryFee}</small> <br />
          <small>TK {Number(totalDiscount).toLocaleString('en')}</small> <br />
          <p className="my-3">
            <strong>Tk {Number(total).toLocaleString('en')}</strong>{" "}
          </p>
        </div>
      </div>
      <button onClick={() => history.push('/shipment')} type="button" className="rounded-0 btn  btn-lg btn-block">
        Go To Checkout
      </button>
    </div>
  );
};

export default Summery;
