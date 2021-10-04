import React, { useState } from "react";
import { discountCalculation } from "../../../utilities/commonFunction";

const ReviewItem = ({ cartProduct, deleteHandeler, inputCartHandeler}) => {
  const { image, price, cartQuantity, name, _id, discount } = cartProduct;
  const [cartInputNum, setCartInputNum] = useState(cartQuantity);
  const inputHandel= (e) => {
    e.target.value = e.target.value.replace('-', '')
    setCartInputNum(e.target.value > 0 ? e.target.value : 0)
  }

  return (
    <div className="review-item row ml-3  mb-3" style={{ height: "250px", borderBottom:"1px solid lightGrey"}}>
      
      <div  className="col-md-4 d-flex justify-content-center">
        <img style={{height: "240px" }} className="img-fluid" src={image} alt="" />
      </div>
 
      <div className="col-md-8">
      <h4 className="mb-4">{name}</h4>
      <h5 className="mb-4"> BDT{Number(
                discountCalculation(price, discount)
              ).toLocaleString("en")} tk</h5>
        
        <h6 style={{display : "inline"}} className="mb-4 ">Quantity : </h6>
        <input
                className="form-control mr-2 input-qty  ml-1 px-1 py-1 mr-1"
                placeholder={cartQuantity}
                type="number"
                name="price"
                min="1"
                onChange={inputHandel }
              />
              {
                Number(cartQuantity) !== Number(cartInputNum)  && <button onClick={()=> inputCartHandeler(Number(cartInputNum), cartProduct)} className="update p-1 rounded ml-2" style={{border : "none"}}>Update</button>
              }
        <br />
        <button style={{backgroundColor : "#d70f64", color : "white"}}onClick={()=>deleteHandeler(_id)} className="btn  py-1 mt-4">Remove Item</button>
      </div>

    </div>
  );
};

export default ReviewItem;
