import React, { useEffect, useState } from 'react';
import Nav from '../../Shared/Nav/Nav';
import AllProducts from '../AllProducts/AllProducts';

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/user/allProduct")
        .then(response => response.json())
        .then((result) =>{
            setProducts(result.data)
        } )
    }, [])

console.log(products);
    return (
        <div>
            <Nav />
            <AllProducts />
        </div>
    );
};

export default Home;