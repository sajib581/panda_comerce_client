import React, { useState } from 'react';
import './ProductDetailsFooter.css';

const ProductDetailsFooter = ({product}) => {
    const [choise , setChoise] = useState("details")
    return (
        <div className="mt-3 mb-5 pb-5">
            <div className="d-flex m-0">
                <span className={choise==="details" && "info rounded-top"}><h5 className="px-3 py-2 " style={{cursor:"pointer"}} onClick={()=>setChoise("details")}>Details</h5></span>
                <span className={choise==="moreInfo" && "info rounded-top"}><h5 className="px-3 py-2" style={{cursor:"pointer"}} onClick={()=>setChoise("moreInfo")}>More Information</h5></span>
                <span className={choise==="reviews" && "info rounded-top"}><h5 className="px-3 py-2" style={{cursor:"pointer"}} onClick={()=>setChoise("reviews")}>Reviews</h5></span>                
            </div>
                {
                    choise === "details" && <div className="info m-0">
                        <h5>Features</h5>
                        <ul>
                        {
                            product.details && product.details.map(pd => <li>{pd.key} : {pd.value}</li> )
                        }
                        </ul>
                    </div>
                }
                {
                    choise === "moreInfo" && <div className="info">
                        <h5>More Features</h5>
                        <ul>
                            <li>abc</li>
                            <li>def</li>
                        </ul>
                    </div>
                }
                {
                    choise === "reviews" && <div className="info">
                        <h5>Users Reviews</h5>
                        <ul>
                            <li>abc</li>
                            <li>def</li>
                        </ul>
                    </div>
                }
        </div>
    );
};

export default ProductDetailsFooter;