import React, { useState, useRef } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdbreact";

export default function OrderForm() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [offer, setOffer] = useState("");

  //Error State

  const [usernameErr, setUserNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [amountErr, setAmountErr] = useState("");
  const [quantityErr, setQuantityErr] = useState("");
  const [sizeErr, setSizeErr] = useState("");
  const [offerErr, setOfferErr] = useState("");

  if (size.value === "large") {
    setAmount({
      amount: "299.99",
    });
  }

  function valid() {
    if (!username.value === "") {
      setUserNameErr("username required");
    } else if (!email.includes("@")) {
      setEmailErr("email is in invalid format");
    } else if (!amount.value === "") {
      setAmountErr("amount is required");
    } else if (!quantity.value === "") {
      setQuantityErr("quantity is required");
    } else if (!size.value === "") {
      setSizeErr("please select your order pizza size");
    } else if (!offer.value === "") {
      setOfferErr("please select offer");
    } else {
      return true;
    }
  }

  function submitForm() {
    if (valid()) {
      fetch("https://add-cart.herokuapp.com/order", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, email, amount, quantity, size, offer}),
      }).then((result) => {
        result.json().then((resp) => {
          console.log(resp);
          alert("Order Place Successfully");
          myFormRef.current.reset();
        });
      });
    }
    console.warn({username, email, amount, quantity, size, offer});
  }

  const myFormRef = useRef();

  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form ref={myFormRef}>
              <MDBCard className="mt-5">
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Pizza App Order Form</strong>
                    </h3>
                  </div>
                  <MDBInput
                    label="User Name"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                  />
                  <p className="text-danger">{usernameErr}</p>
                  <MDBInput
                    label="Your email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <p className="text-danger">{emailErr}</p>
                  <MDBInput
                    label="Amount"
                    group
                    type="text"
                    validate
                    containerClass="mb-0"
                    onChange={(event) => {
                      setAmount(event.target.value);
                    }}
                  />
                  <p className="text-danger">{amountErr}</p>
                  <MDBInput
                    label="Quantity"
                    group
                    type="text"
                    validate
                    containerClass="mb-0"
                    onChange={(event) => {
                      setQuantity(event.target.value);
                    }}
                  />
                  <p className="text-danger">{quantityErr}</p>
                  <label>Select Pizza Size</label>
                  <select
                    selected="Select User Type"
                    label="Select Benfits Term"
                    className="form-control mb-3"
                    onChange={(event) => {
                      setSize(event.target.value);
                    }}
                  >
                    <option value="">Select Option</option>
                    <option value="small">Small</option>
                    <option value="large">Large</option>
                    <option value="medium">Medium</option>
                  </select>
                  <p className="text-danger">{sizeErr}</p>
                  <label>Select Offer</label>
                  <select
                    selected="Select User Type"
                    label="Select Benfits Term"
                    className="form-control mb-3"
                    onChange={(event) => {
                      setOffer(event.target.value);
                    }}
                  >
                    <option value="">Select Option</option>
                    <option value="facebook">Facebook</option>
                    <option value="amazon">Amazon</option>
                    <option value="infosys">Infosys</option>
                    <option value="no">No Special Offer i Have</option>
                  </select>
                  <p className="text-danger">{offerErr}</p>
                </MDBCardBody>
              </MDBCard>
            </form>
          </MDBCol>
          <MDBCol md="6">
            <MDBCard className="mt-5">
              <MDBCardBody className="mx-4">
                <table className="table table-responsive">
                  <tr>
                    <td>Customer Name :</td>
                    <td>
                      <b>{username}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Email :</td>
                    <td>
                      <b>{email}</b>
                    </td>
                  </tr>

                  <tr>
                    <td>Qauntity :</td>
                    <td>
                      <b>{quantity}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Package Name :</td>
                    <td>
                      <b>{offer}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Pizza Size :</td>
                    <td>
                      <b>{size}</b>
                    </td>
                  </tr>

                  <tr>
                    <td>Total Amount :</td>
                    <td>
                      <b>{amount}</b>
                    </td>
                  </tr>
                </table>
                <div className="text-center mb-3">
                  <MDBBtn
                    type="button"
                    gradient="blue"
                    rounded
                    className="btn-block z-depth-1a"
                    onClick={() => {
                      submitForm();
                    }}
                  >
                    Confirm Order Now
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
