import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoadAnimation from '../components/PageLoadAnimation';
import ScrollToggle from '../components/ScrollToggle';
import TranslateToggle from '../components/TranslateToggle';
import ThemeToggle from '../components/ThemeToggle';
import CustomerSupportToggle from '../components/CustomerSupportToggle';
import { TranslationProvider } from '../context/TranslationContext';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addProductToCart = () => {
    if (product) {
      dispatch(addCart(product));
    }
  };

  if (loading) {
    return (
      <TranslationProvider>
        <Navbar />
        <PageLoadAnimation />
        <ScrollToggle />
        <TranslateToggle />
        <ThemeToggle />
        <CustomerSupportToggle />
        
        <div className="container my-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        
        <Footer />
      </TranslationProvider>
    );
  }

  if (!product) {
    return (
      <TranslationProvider>
        <Navbar />
        <PageLoadAnimation />
        <ScrollToggle />
        <TranslateToggle />
        <ThemeToggle />
        <CustomerSupportToggle />
        
        <div className="container my-5">
          <div className="alert alert-danger" role="alert">
            Product not found
          </div>
        </div>
        
        <Footer />
      </TranslationProvider>
    );
  }

  return (
    <TranslationProvider>
      <Navbar />
      <PageLoadAnimation />
      <ScrollToggle />
      <TranslateToggle />
      <ThemeToggle />
      <CustomerSupportToggle />
      
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.title} 
                className="img-fluid shadow-sm rounded" 
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-details">
              <h1 className="display-6 fw-bold mb-3">{product.title}</h1>
              <p className="text-muted mb-3">{product.category}</p>
              
              <div className="product-rating text-warning mb-3">
                {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
                <span className="text-muted ms-2 small">
                  ({product.rating.count} reviews)
                </span>
              </div>
              
              <p className="lead fw-bold text-primary mb-4">
                ${product.price.toFixed(2)}
              </p>
              
              <p className="mb-4">{product.description}</p>
              
              <div className="d-flex">
                <button 
                  className="btn btn-primary btn-lg me-3" 
                  onClick={addProductToCart}
                >
                  Add to Cart
                </button>
                <button 
                  className="btn btn-outline-secondary btn-lg"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </TranslationProvider>
  );
};

export default ProductDetail;
