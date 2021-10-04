import React from "react";
import ShipmentItem from "../ShipmentItem/ShipmentItem";
import "./ShipmentCard.css";

const ShipmentCard = ({totalCartAmount, deliveryFee, totalDiscount, total, cart}) => {
  
  return (
    <div>
      <div className="showName d-flex align-items-center justify-content-center">
        <div>
          <h5>Show Your orders </h5>
          <h5 className="text-center">finally</h5>
        </div>
      </div>
      <div className="showProduct">
        <table class="table">
          <tbody>
            {cart.map((pd) => (
              <ShipmentItem key={pd._id} cartProduct={pd}></ShipmentItem>
            ))}
          </tbody>
        </table>
      </div>
      <div className="showTotal">
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
            <small>TK {Number(totalCartAmount).toLocaleString("en")}</small>{" "}
            <br />
            <small>TK {deliveryFee}</small> <br />
            <small>TK {Number(totalDiscount).toLocaleString("en")}</small>{" "}
            <br />
            <p className="my-3">
              <strong>Tk {Number(total).toLocaleString("en")}</strong>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;
