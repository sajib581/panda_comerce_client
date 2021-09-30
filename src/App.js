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
import Shop from "./component/Shop/Shop";
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
    fetch("http://localhost:5000/user/allProduct")
      .then((response) => response.json())
      .then((data) => setAllProducts(data.data));
  }, []);

  useEffect(() => {
    console.log("Hitted here");
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
              <Route path="/shop">
                <Shop />
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
