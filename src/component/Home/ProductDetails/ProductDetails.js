import {
    faBox,
    faExchangeAlt,
    faHeadset,
    faLock,
    faMapMarkerAlt,
    faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductContext } from "../../../App";
import { addToDatabaseCart } from "../../../utilities/cartManager";
import Nav from "../../Shared/Nav/Nav";
import image from "./page-payme.jpg";
import "./productDetails.css";
import ProductDetailsFooter from "./ProductDetailsFooter/ProductDetailsFooter";

const ProductDetails = () => {
  const [, , cart, setCart] = useContext(ProductContext);

  const [product, setProduct] = useState({});
  const { key } = useParams();

  useEffect(() => {
    fetch("https://panda-commerce.herokuapp.com/user/getOneProduct/" + key)
      .then((response) => response.json())
      .then((result) => {
        setProduct(result.data);
      });
  }, []);

  const [cartInputNum, setCartInputNum] = useState(false);
  const inputHandel = (e) => {
    e.target.value = e.target.value.replace("-", "");
    setCartInputNum(e.target.value > 0 ? e.target.value : 0);
  };

  const addToCartHandeler = (product) => {
    if (cartInputNum) {
      console.log("cartInputNum", cartInputNum);
      inputCartHandeler(Number(cartInputNum), product)
    } else {
      const toBeAdded = product._id;
      const sameProduct = cart.find((pd) => pd._id === toBeAdded);
      let count = 1;
      if (sameProduct) {
        const updatedCart = cart.map((product) => {
          if (product._id === toBeAdded) {
            product.cartQuantity += 1;
          }
          return product;
        });
        setCart(updatedCart);
        count = sameProduct.cartQuantity;
      } else {
        product.cartQuantity = count;
        const newCart = [...cart, product];
        setCart(newCart);
      }
      addToDatabaseCart(product._id, count);
    }
  };

  const inputCartHandeler = (quantity, product) => {
    console.log(quantity, product);
    const toBeAdded = product._id
    const sameProduct = cart.find(pd => pd._id === toBeAdded)
    let count = 1;
    if (sameProduct) {
      const updatedCart = cart.map(product => {
          if(product._id === toBeAdded){
            product.cartQuantity = quantity ;
          }
          return product
        })
        setCart(updatedCart)
        count = product.cartQuantity
        addToDatabaseCart (product._id, count)
    }else{
      product.cartQuantity = quantity ;
      const newCart = [...cart, product]
      setCart(newCart)
      addToDatabaseCart (product._id, quantity)
    }
  };
  return (
    <div>
      <Nav />
      <div className="row px-3">
        <div className="col-md-4">
          <img className="img-fluid border" src={product.image} alt="" />
        </div>
        <div className="col-md-5 ">
          <h5 className="my-3">{product.name}</h5>
          <h6>Product ID : #{product._id}</h6>
          <FontAwesomeIcon className="text-danger" icon={faMapMarkerAlt} />{" "}
          <small className="my-3">{product.star}</small>
          <ul className="my-3">
            {product.short_description &&
              product.short_description.map((pd) => (
                <li>
                  {pd.key} : {pd.value}
                </li>
              ))}
          </ul>
          <small>
            {" "}
            <strong className="text-success my-3">IN STOCK</strong>
          </small>
          <h4 className="text-danger my-3 fw-bold">BDT {product.price}</h4>
          <span>Qty</span>
          <input onChange={inputHandel} className="form-control input-qty" type="number" />
          <button
            onClick={() => addToCartHandeler(product)}
            className="btn btn-dark"
          >
            Add To Cart
          </button>
          <div className="px-3 mt-4 shop-des">
            <span className="px-2 text-danger fw-bold">Sold By</span>
            <span className="px-2 fw-bold">
              {product.seller === "self" ? "Panda Commerce" : product.seller}
            </span>
            <span className="px-2 fw-bold">
              <FontAwesomeIcon className="text-danger" icon={faMapMarkerAlt} />{" "}
              Bangladesh
            </span>
            <span className="px-2 fw-bold">
              {" "}
              <FontAwesomeIcon
                className="text-danger"
                icon={faBox}
              ></FontAwesomeIcon>{" "}
              {product.quantity}
            </span>
          </div>
        </div>
        <div className="col-md-3 ">
          <div className="border px-3 py-3">
            <h6 className="fw-bold">
              <FontAwesomeIcon
                className="text-danger"
                icon={faExchangeAlt}
              ></FontAwesomeIcon>{" "}
              3 Days Return
            </h6>
            <p>If goods have problems</p>

            <h6 className="fw-bold">
              <FontAwesomeIcon
                className="text-danger"
                icon={faThumbsUp}
              ></FontAwesomeIcon>{" "}
              Authentic Product
            </h6>
            <p>100% authentic products</p>

            <h6 className="fw-bold">
              <FontAwesomeIcon
                className="text-danger"
                icon={faLock}
              ></FontAwesomeIcon>{" "}
              Secure Payment
            </h6>
            <p>100% secure payment</p>

            <h6 className="fw-bold">
              <FontAwesomeIcon
                className="text-danger"
                icon={faHeadset}
              ></FontAwesomeIcon>{" "}
              Dedicated support
            </h6>
            <p>From 10am-10pm Sat-Thu</p>
          </div>
          <img width="100%" src={image} alt="" />
        </div>
        <div>
          <ProductDetailsFooter product={product}></ProductDetailsFooter>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
