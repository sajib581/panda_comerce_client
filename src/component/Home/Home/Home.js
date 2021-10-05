import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../App';
import Nav from '../../Shared/Nav/Nav';
import AllProducts from '../AllProducts/AllProducts';

const Home = () => {
    const [products, setProducts] = useState([])
    const [,,,, showCart, setShowCart] = useContext(ProductContext)
    useEffect(() => {
        fetch("https://panda-commerce.herokuapp.com/user/allProduct")
        .then(response => response.json())
        .then((result) =>{
            setProducts(result.data)
        } )
    }, [])

    return (
        <div  >
            <Nav />
            <AllProducts />
        </div>
    );
};

export default Home;