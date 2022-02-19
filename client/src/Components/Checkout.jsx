import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";

function Checkout(props) {
    const [userInfo, setUserInfo] = useState({
        fname: "",
        lname: "",
        streetName: "",
        streetNumber: "",
        email: "",
        phone: "",
        creditCardNumber: "",
        creditCardCCV: "",
        creditCardValidTrou: ""
    });
    const navigate = useNavigate();
    function handleChange(event) {
        const { name, value } = event.target;
        setUserInfo((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        props.submitUserInfo(userInfo);
        navigate("/successpage");
    }

    return (
        <div className="data-container">
            <h1>Please fullfil so we can take your order</h1>
            <div className="form-div">
                <form onSubmit={handleSubmit}>
                    <div className="form-separator">
                        <div>
                            <label>First name</label>
                            <input onChange={handleChange} value={userInfo.fname} name="fname" className="control control-text" type="text" placeholder="First name" required />
                        </div>
                        <div>
                            <label>Last name</label>
                            <input onChange={handleChange} value={userInfo.lname} name="lname" className="control control-text" type="text" placeholder="Last name" required />
                        </div>
                        <div>
                            <label>Street name</label>
                            <input onChange={handleChange} value={userInfo.streetName} name="streetName" className="control control-text" type="text" placeholder="Street name" required />
                        </div>
                        <div>
                            <label>Street number</label>
                            <input onChange={handleChange} value={userInfo.streetNumber} name="streetNumber" className="control control-text" type="text" placeholder="Street number" required />
                        </div>
                    </div>
                    <div className="form-separator">
                        <div>
                            <label>Email</label>
                            <input onChange={handleChange} value={userInfo.email} name="email" className="control control-text" type="email" placeholder="Email" required />
                        </div>
                        <div>
                            <label>Phone number</label>
                            <input onChange={handleChange} value={userInfo.phone} name="phone" className="control control-text" type="text" placeholder="Phone number" required />
                        </div>
                        <div>
                            <label>Credit card number</label>
                            <input onChange={handleChange} value={userInfo.creditCardNumber} name="creditCardNumber" className="control control-text" type="text" placeholder="Credit card number" required />
                        </div>
                        <div className="credit-card-info">
                            <label>CCV</label>
                            <input onChange={handleChange} value={userInfo.creditCardCCV} name="creditCardCCV" className="control control-text" type="text" placeholder="CCV" required />
                        </div>
                        <div className="credit-card-info">
                            <label>Date of expiery</label>
                            <input onChange={handleChange} value={userInfo.creditCardValidTrou} name="creditCardValidTrou" className="control control-text" type="month" placeholder="Date of expiery" required />
                        </div>
                    </div>
                    <button type="submit">Confirm order</button>
                </form>
            </div>
        </div>
    );
}
export default Checkout;