import React, { useContext } from "react";
import { ProductContext } from "../../../App";
import { addToDatabaseCart } from "../../../utilities/cartManager";
import Product from "../Product/Product";

const AllProducts = () => {
  const [products, setAllProducts, cart, setCart] = useContext (ProductContext)
  
  const handelAddProduct = (product) => {
    const toBeAdded = product._id
    const sameProduct = cart.find(pd => pd._id === toBeAdded)
    let count = 1;
    if (sameProduct) {
      const updatedCart = cart.map(product => {
          if(product._id === toBeAdded){
            product.cartQuantity+=1 ;
          }
          return product
        })
        setCart(updatedCart)
        count = product.cartQuantity
    } else {
        product.cartQuantity = count
        const newCart = [...cart, product]
        setCart(newCart)
    }
    addToDatabaseCart (product._id, count)
  }

  return (
    <div>
      <div className="px-5">
        <h1>All Product</h1>
        <div className="row">
          {
              products.map((product, index)=> <Product  
                key={index} 
                product={product} 
                handelAddProduct={handelAddProduct}
                />)
          }
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
