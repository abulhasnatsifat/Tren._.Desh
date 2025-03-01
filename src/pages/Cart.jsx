import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoadAnimation from '../components/PageLoadAnimation';
import ScrollToggle from '../components/ScrollToggle';
import TranslateToggle from '../components/TranslateToggle';
import ThemeToggle from '../components/ThemeToggle';
import CustomerSupportToggle from '../components/CustomerSupportToggle';
import { TranslationProvider } from '../context/TranslationContext';

import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart, removeFromCart } from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left me-2"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    dispatch(addCart(product));
  };

  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  const removeItemCompletely = (product) => {
    dispatch(removeFromCart(product));
  };

  const CartItems = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    // Safely calculate subtotal and total items
    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <>
        {state.map((product) => {
          return (
            <div key={product.id} className="px-4 my-5 bg-light rounded-3">
              <div className="container py-4">
                <div className="row justify-content-center">
                  <div className="col-md-4">
                    <img src={product.image} alt={product.title} height="200px" width="180px" />
                  </div>
                  <div className="col-md-4">
                    <h3>{product.title}</h3>
                    <p className="lead fw-bold">${product.price}</p>
                    <div className="d-flex">
                      <button
                        className="btn btn-outline-dark me-4"
                        onClick={() => removeItem(product)}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <button
                        className="btn btn-outline-dark me-4"
                        onClick={() => addItem(product)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => removeItemCompletely(product)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Order Summary</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products ({totalItems})
                  <span>${subtotal.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>${shipping.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                  </div>
                  <span>
                    <strong>${(subtotal + shipping).toFixed(2)}</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  const buttons = () => {
    return (
      <div className="container">
        <div className="row">
          <Link
            to="/checkout"
            className="btn btn-outline-dark btn-lg w-100 mt-5"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    );
  };

  return (
    <TranslationProvider>
      <Navbar />
      <PageLoadAnimation />
      <ScrollToggle />
      <TranslateToggle />
      <ThemeToggle />
      <CustomerSupportToggle />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.length > 0 ? (
          <>
            <CartItems />
            {buttons()}
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </TranslationProvider>
  );
};

export default Cart;
