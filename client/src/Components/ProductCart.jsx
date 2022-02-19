import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function ProductCart({ cartItems, handleAddProduct, handleRemoveProduct, handleProceedToCheckout }) {
    const UNIQUE_PROMO_CODE="20%OFF";
    const [input, setInput] = useState("");
    const POSSIBLE_PROMO_CODES = [UNIQUE_PROMO_CODE, "5%OFF", "20EUROFF"];
    const [promoCodes, setPromoCodes] = useState([]);

    const totalPrice=cartItems.reduce((price, item) => price + item.quantity * item.price, 0);
    
    const totalPriceWithQuantityDiscounts=cartItems.reduce((price,item)=>{
        if(item.key===4)return price=price-Math.floor(item.quantity/2)*5;
        if(item.key===2)return price=price-Math.floor(item.quantity/3)*10;
        return price;
    },totalPrice); 
    
    const totalPriceWithDiscounts= promoCodes.reduce((price, discountName) => {
        if(discountName===UNIQUE_PROMO_CODE)return price*0.8;
        if(discountName==="5%OFF")return price*0.95;
        return price-20;
    } , totalPriceWithQuantityDiscounts)
    
    const totalPriceDisplay=totalPriceWithDiscounts.toFixed(2)
    
    function handleChange(event) {
        setInput(event.target.value);
    }
    function addPromoCode(input) {
        if (promoCodes.includes(input) || (promoCodes.length && input === UNIQUE_PROMO_CODE) 
          || !POSSIBLE_PROMO_CODES.includes(input)){
            alert("Invalid promotion code or the code was already entered!");   
            return;
          }
        if(!promoCodes.includes(UNIQUE_PROMO_CODE)){
            let newPromoCodes=[...promoCodes, input]
            setPromoCodes(newPromoCodes);
            
        }
    }

    return (
        <div className="cart">
            <h1>My cart</h1>
            <div className="cart-box">
                {cartItems.length === 0 && <h1>Your cart is empty!</h1>}
                {cartItems.map((item) =>
                    <div className="cart-item">
                        <img src={item.imageSource} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.price} EUR</p>
                        <div className="add-quantity">
                            <button onClick={() => handleRemoveProduct(item)}>-</button>
                            <input readOnly type="number" placeholder="quantity" value={item.quantity} />
                            <button onClick={() => handleAddProduct(item)}>+</button>
                            <div>
                                {(item.quantity * item.price).toFixed(2)} EUR
                            </div>
                        </div>
                    </div>
                
                )}
                <div className="total-price-div">
                    {cartItems.length !== 0 && (
                        <div>
                        <p>Promo code 20%OFF can not be used in conjuction with other codes</p>
                            <form>
                                <p>Add promotive code</p>
                                <input onChange={handleChange} value={input} name="promoCode" type="text" />
                                <div>
                                    <button onClick={() => addPromoCode(input)} type="button">Add code</button>
                                </div>
                            </form>
                            <p>Total price: {totalPriceDisplay} EUR</p>
                            <NavLink to="/checkout" >
                                <button onClick={() => handleProceedToCheckout(cartItems, totalPrice)}>Proceed to Checkout</button>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCart;