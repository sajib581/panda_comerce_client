import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Admin from "./component/Admin/Admin";
import Contact from "./component/Contact/Contact";
import Home from "./component/Home/Home/Home";
import ProductDetails from "./component/Home/ProductDetails/ProductDetails";
import LoginScreen from "./component/Login/LoginScreen";
import RegisterScreen from "./component/Login/RegisterScreen";
import AdminRoute from "./component/privateRoute/AdminRoute";
import UserRoute from "./component/privateRoute/UserRoute";
import Review from "./component/Review/Review";
import Shipment from "./component/Shipment/Shipment";
import { getDatabaseCart } from "./utilities/cartManager";

export const LoggedInContext = createContext();
export const ProductContext = createContext();

function App() {
  const [logedInUser, setlogedInUser] = useState({
    userId: "",
    username: "",
    mobile: "",
    email: "",
    role: "",
    avatar: "",
  });

  const [products, setAllProducts] = useState([]);
  const [showCart, setShowCart] = useState(false) 
  const [cart, setCart] = useState([])
  useEffect(() => {
    fetch("https://panda-commerce.herokuapp.com/user/allProduct")
      .then((response) => response.json())
      .then((data) => setAllProducts(data.data));
  }, []);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart)
    const counts = Object.values(savedCart)

    if (products.length > 0) {
        const cartProducts = productKeys.map(key => {
            const product = products.find(pd => pd._id === key)
            product.cartQuantity = savedCart[key]
            return product
        })
        setCart(cartProducts)
    }
}, [products])
  return (
    <ProductContext.Provider value={[products, setAllProducts, cart, setCart, showCart, setShowCart]}>
      <LoggedInContext.Provider value={[logedInUser, setlogedInUser]}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <AdminRoute path="/admin">
                <Admin />
              </AdminRoute>
              <Route path="/login">
                <LoginScreen />
              </Route>
              <UserRoute path="/shipment">
                <Shipment />
              </UserRoute>
              <UserRoute path="/review">
                <Review />
              </UserRoute>
              <Route path="/product/:key">
                <ProductDetails />
              </Route>
              <Route path="/register">
                <RegisterScreen />
              </Route>
              <Route path="*">
                <h1>404 not found</h1>
              </Route>
            </Switch>
          </div>
          <ToastContainer />
        </Router>
      </LoggedInContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
