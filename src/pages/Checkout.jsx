import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoadAnimation from '../components/PageLoadAnimation';
import ScrollToggle from '../components/ScrollToggle';
import TranslateToggle from '../components/TranslateToggle';
import ThemeToggle from '../components/ThemeToggle';
import CustomerSupportToggle from '../components/CustomerSupportToggle';
import { TranslationProvider } from '../context/TranslationContext';

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    address2: '',
    country: '',
    state: '',
    zip: '',
    paymentMethod: '',
    cardName: '',
    cardNumber: '',
    cardExpiration: '',
    cardCVV: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!formData.zip.trim()) {
      newErrors.zip = 'Zip code is required';
    } else if (!zipRegex.test(formData.zip)) {
      newErrors.zip = 'Invalid zip code format';
    }

    // Payment validation
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    
    if (formData.paymentMethod === 'credit') {
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      
      const cardNumberRegex = /^\d{16}$/;
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!cardNumberRegex.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number';
      }
      
      const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!formData.cardExpiration.trim()) {
        newErrors.cardExpiration = 'Expiration date is required';
      } else if (!expirationRegex.test(formData.cardExpiration)) {
        newErrors.cardExpiration = 'Invalid expiration format (MM/YY)';
      }
      
      const cvvRegex = /^\d{3,4}$/;
      if (!formData.cardCVV.trim()) {
        newErrors.cardCVV = 'CVV is required';
      } else if (!cvvRegex.test(formData.cardCVV)) {
        newErrors.cardCVV = 'Invalid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the order to a backend service
      alert('Order placed successfully!');
      navigate('/confirmation');
    }
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No items in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left me-2"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const total = subtotal + shipping;

    return (
      <div className="container py-5">
        <div className="row my-4">
          {/* Order Summary Section */}
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="order-items mb-3">
                  {state.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <div>
                        <span>{item.title}</span>
                        <small className="text-muted d-block">Qty: {item.qty}</small>
                      </div>
                      <span>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
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
                      <strong>${total.toFixed(2)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Checkout Form Section */}
          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing & Shipping Details</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    {/* Name Fields */}
                    <div className="col-sm-6">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>

                    <div className="col-sm-6">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>

                    {/* Email */}
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Address */}
                    <div className="col-12">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input
                        type="text"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        id="address"
                        placeholder="1234 Main St"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="address2" className="form-label">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Apartment, suite, etc."
                        value={formData.address2}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Location */}
                    <div className="col-md-5">
                      <label htmlFor="country" className="form-label">Country</label>
                      <select
                        className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                        id="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Choose...</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="IN">India</option>
                      </select>
                      {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="state" className="form-label">State</label>
                      <select
                        className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                        id="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Choose...</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                      </select>
                      {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="zip" className="form-label">Zip</label>
                      <input
                        type="text"
                        className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                        id="zip"
                        placeholder="12345"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                    </div>

                    {/* Payment Method */}
                    <div className="col-12">
                      <h4 className="mb-3">Payment Method</h4>
                      <div className="my-3">
                        <div className="form-check">
                          <input
                            id="credit"
                            name="paymentMethod"
                            type="radio"
                            className={`form-check-input ${errors.paymentMethod ? 'is-invalid' : ''}`}
                            value="credit"
                            checked={formData.paymentMethod === 'credit'}
                            onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                            required
                          />
                          <label className="form-check-label" htmlFor="credit">Credit card</label>
                        </div>
                        <div className="form-check">
                          <input
                            id="paypal"
                            name="paymentMethod"
                            type="radio"
                            className={`form-check-input ${errors.paymentMethod ? 'is-invalid' : ''}`}
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                            required
                          />
                          <label className="form-check-label" htmlFor="paypal">PayPal</label>
                        </div>
                        {errors.paymentMethod && <div className="invalid-feedback d-block">{errors.paymentMethod}</div>}
                      </div>
                    </div>

                    {/* Credit Card Details (if credit card is selected) */}
                    {formData.paymentMethod === 'credit' && (
                      <div className="row gy-3">
                        <div className="col-md-6">
                          <label htmlFor="cardName" className="form-label">Name on card</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                            id="cardName"
                            placeholder=""
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="cardNumber" className="form-label">Credit card number</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                        </div>

                        <div className="col-md-4">
                          <label htmlFor="cardExpiration" className="form-label">Expiration</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cardExpiration ? 'is-invalid' : ''}`}
                            id="cardExpiration"
                            placeholder="MM/YY"
                            value={formData.cardExpiration}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.cardExpiration && <div className="invalid-feedback">{errors.cardExpiration}</div>}
                        </div>

                        <div className="col-md-3">
                          <label htmlFor="cardCVV" className="form-label">CVV</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cardCVV ? 'is-invalid' : ''}`}
                            id="cardCVV"
                            placeholder="123"
                            value={formData.cardCVV}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.cardCVV && <div className="invalid-feedback">{errors.cardCVV}</div>}
                        </div>
                      </div>
                    )}
                  </div>

                  <hr className="my-4" />

                  <button 
                    className="w-100 btn btn-primary btn-lg" 
                    type="submit"
                    disabled={state.length === 0}
                  >
                    Complete Order
                  </button>
                </form>
              </div>
            </div>
          </div>
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
        <h1 className="text-center mb-4">Checkout</h1>
        <hr />
        {state.length > 0 ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </TranslationProvider>
  );
};

export default Checkout;
