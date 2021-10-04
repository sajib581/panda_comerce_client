import React from "react";

const ShipmentItem = ({cartProduct}) => {
    const {name, price, cartQuantity, _id, discount} = cartProduct
  return (
    <tr>
      <th scope="row">{cartQuantity}</th>
      <td className="text-secondary">X</td>
      <td className="text-secondary">{name}</td>
      <td className="text-secondary">BDT {price}</td>
    </tr>
  );
};

export default ShipmentItem;
