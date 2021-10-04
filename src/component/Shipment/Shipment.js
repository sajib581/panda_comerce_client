import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { LoggedInContext, ProductContext } from "../../App";
import { processOrder } from "../../utilities/cartManager";
import { discountCalculation } from "../../utilities/commonFunction";
import Nav from "../Shared/Nav/Nav";
import "./Shipment.css";
import ShipmentCard from "./ShipmentCard/ShipmentCard";

const Shipment = () => {
  const [logedInUser, setlogedInUser] = useContext(LoggedInContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [, , cart, setCart, showCart, setShowCart] = useContext(ProductContext);

  const history = useHistory()
  const totalCartAmount = cart.reduce(
    (total, product) => total + product.cartQuantity * product.price,
    0
  );
  const deliveryFee = totalCartAmount ? 990 : 0;
  const totalDiscount = cart.reduce(
    (total, product) =>
      total + product.price * (product.discount / 100) * product.cartQuantity,
    0
  );
  const ordered_Products_sendTo_Server = cart.map((pd) => {
    const product = {};
    product._id = pd._id;
    product.quantity = pd.cartQuantity;
    product.currentQuantity = pd.quantity
    product.categories = pd.categories;
    product.discount = pd.discount;
    product.image = pd.image;
    product.productName = pd.name;
    product.price = pd.price;
    product.afterDiscountPrice = discountCalculation(
      Number(pd.price),
      Number(pd.discount)
    );
    product.seller = pd.seller;
    return product;
  });
  const total = totalCartAmount + deliveryFee - totalDiscount;
  const onSubmit = (data) => {
    data.email = logedInUser.email;
    data.name = logedInUser.username;
    data.subTotal = totalCartAmount;
    data.deliveryFee = deliveryFee;
    data.totalDiscount = totalDiscount;
    data.total = total;
    data.orderedProducts = ordered_Products_sendTo_Server;
    const jwtToken = localStorage.getItem('jwtToken');

    fetch(`http://localhost:5000/user/purchaseOrder/${jwtToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.errors) {
          processOrder();
          alert("Order Purchesed successfully");
          setCart([]);
          history.push('/')
        }
      });
  };
  return (
    <div>
      <Nav />
      <div className="row mx-0">
        <div className="col-md-1"></div>
        <div className="col-md-5 mt-md-5">
          <form className="shipmentForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              value={logedInUser.username}
              disabled
              className="form-control my-3"
            />

            <input
              type="email"
              disabled
              value={logedInUser.email}
              className="form-control my-3"
            />

            <input
              type="text"
              className="form-control my-3"
              {...register("address", { required: true })}
              placeholder="Enter Full Address"
            />
            {errors.address && (
              <span className="text-danger">This field is required</span>
            )}

            <input
              type="phone"
              className="form-control my-3"
              {...register("phone", { required: true })}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <span className="text-danger mb-3">This field is required</span>
            )}

            <input
              style={{ backgroundColor: "#d70f64", color: "white" }}
              className="rounded-0 btn  btn-lg btn-block"
              type="submit"
            />
          </form>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3 ">
          <ShipmentCard
            totalCartAmount={totalCartAmount}
            deliveryFee={deliveryFee}
            totalDiscount={totalDiscount}
            total={total}
            cart={cart}
          ></ShipmentCard>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default Shipment;
