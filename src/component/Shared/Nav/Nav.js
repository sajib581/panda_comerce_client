import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { LoggedInContext, ProductContext } from "../../../App";
import { discountCalculation } from '../../../utilities/commonFunction';
import Cart from '../../Cart/Cart';
import "./Nav.css";

const Nav = () => {
  let history = useHistory();
  const [,, cart, setCart, showCart, setShowCart] = useContext(ProductContext)
  const [logedInUser, setlogedInUser] = useContext(LoggedInContext);
  const jwtToken = localStorage.getItem("jwtToken");
  // const totalCartNumber = cart.reduce()
  const totalNumberCart = cart.reduce((total, product) => total + product.cartQuantity , 0)
  const totalCartAmount = cart.reduce((total, product) => total + product.cartQuantity * discountCalculation(product.price, product.discount) , 0)
  useEffect(() => {
    fetch("http://localhost:5000/isLoggedIn/" + jwtToken)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setlogedInUser({ ...data.userData });
        }
      });
  }, []);

  const logOutHandeler = () => {
    localStorage.removeItem("jwtToken");
    setlogedInUser({
      userId: "",
      username: "",
      mobile: "",
      email: "",
      role: "",
      avatar: "",
    });
  };
  return (
    <div className="px-4">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <Link className="navbar-brand" to="/">
          <img
            height="50"
            src="https://w7.pngwing.com/pngs/985/991/png-transparent-foodpanda-online-food-ordering-food-delivery-restaurant-others-miscellaneous-white-face.png"
            alt=""
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ml-4">
              <NavLink
                exact
                activeStyle={{
                  borderTop: "1px solid red",
                }}
                className="nav-link"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item ml-4">
              <NavLink
                activeStyle={{
                  borderTop: "1px solid red",
                }}
                className="nav-link"
                to="/shop"
              >
                Shop
              </NavLink>
            </li>
            
            <li className="nav-item  ml-4">
              <NavLink
                activeStyle={{
                  borderTop: "1px solid red",
                }}
                className="nav-link"
                to="/contact"
              >
                Contacts
              </NavLink>
            </li>
            {logedInUser.role === "admin" && (
              <li className="nav-item  ml-4">
                <NavLink
                  activeStyle={{
                    borderTop: "1px solid red",
                  }}
                  className="nav-link"
                  to="/admin"
                >
                  Admin
                </NavLink>
              </li>
            )}
            <li style={{display : ""}} className="nav-item ml-4 d-flex">
              <div>
              <div className="d-flex">
              <h2 onClick={()=>setShowCart(!showCart)} style={{cursor:"pointer"}}className="mr-2"><FontAwesomeIcon  className="text-danger" icon={faShoppingCart} />({totalNumberCart})</h2> <div>
              <span className="m-0 p-0">My Cart</span> <br /> <span className="m-0 p-0">BDT {Number(totalCartAmount).toLocaleString('en')} tk</span>
              </div>
              </div>
                <div >{showCart && <Cart ></Cart>}</div>
              </div>              
            </li>
            {["admin", "user"].includes(logedInUser.role) ? (
              <li onClick={logOutHandeler} className="nav-item  ml-4">
                <NavLink
                  activeStyle={{
                    borderTop: "1px solid red",
                  }}
                  className="nav-link"
                  to="/login"
                >
                  LogOut
                </NavLink>
              </li>
            ) : (
              <li className="nav-item pr-4">
                <NavLink
                  activeStyle={{
                    borderTop: "1px solid red",
                  }}
                  className="nav-link"
                  to="/login"
                >
                  LogIn
                </NavLink>
              </li>

            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
