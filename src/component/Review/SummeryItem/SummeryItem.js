import { faMinus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { discountCalculation } from "../../../utilities/commonFunction";

const SummeryItem = ({ cartProduct, plusMinusHandeler, deleteHandeler }) => {
  const {name, price, cartQuantity, _id, discount} = cartProduct;
  return (
    <div className="d-flex justify-content-between summery-item">
      <div className="pd-name">
        <h6>{name}</h6>
      </div>
      <div>
        <p className="text-secondary mb-2">
          Tk <small> {Number(discountCalculation(price, discount) * cartQuantity).toLocaleString('en')}</small>
        </p>
        <div className="d-flex p-1 sdw" >
          <small >
            {
              cartQuantity === 1 ?  <FontAwesomeIcon onClick={()=>deleteHandeler(_id)}  className="plusMinus" style={{ cursor: "pointer" }} icon={faTrashAlt} /> :
              <FontAwesomeIcon onClick={()=>plusMinusHandeler(Number(cartQuantity), cartProduct, "-")} className="plusMinus" style={{ cursor: "pointer" }} icon={faMinus} />
            }
          </small>
          <h6 className="mx-3">{cartQuantity}</h6>
          
          <small >
            <FontAwesomeIcon onClick={()=>plusMinusHandeler(Number(cartQuantity), cartProduct, "+")} style={{ cursor: "pointer"  }}  icon={faPlus}  className="plusMinus" />
          </small>
        </div>
      </div>
    </div>
  );
};

export default SummeryItem;
