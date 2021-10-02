const discountCalculation = (main_price , discount) => {
    let result = main_price - main_price * (discount/100) ;

    return result
  }

  export { discountCalculation };

