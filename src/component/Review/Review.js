import React, { useContext } from 'react';
import { ProductContext } from '../../App';
import { addToDatabaseCart, removeFromDatabaseCart } from '../../utilities/cartManager';
import Nav from "../Shared/Nav/Nav";
import ReviewItem from './ReviewItem/ReviewItem';
import Summery from './Summery/Summery';

const Review = () => {
    const [, , cart, setCart, showCart, setShowCart] = useContext(ProductContext);
    
    const deleteHandeler = (id) => {
        removeFromDatabaseCart(id);
        const otherCartsItem = cart.filter((pd) => pd._id !== id);
        setCart(otherCartsItem);
      };
      const inputCartHandeler = (quantity, product) => {
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
        }
      };
    return (
        <div>
            <Nav />
            <div className="row mx-0" >
            <div className="col-md-9 mx-0" style={{borderRight : '1px solid lightGrey', height : "570px", overflow:"auto", }}>
            {
                cart.length > 0 ? cart.map((product) => <ReviewItem key={product._id} inputCartHandeler={inputCartHandeler} deleteHandeler={deleteHandeler} cartProduct={product} /> ) : <div className="text-center mt-5"><h1>Empty Cart</h1></div>
            }
            </div>
            <div className="col-md-3 mx-0 ">
                <Summery deleteHandeler={deleteHandeler} ></Summery>
            </div>
            </div>
        </div>
    );
};

export default Review;