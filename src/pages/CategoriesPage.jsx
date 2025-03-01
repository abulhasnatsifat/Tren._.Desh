import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoadAnimation from '../components/PageLoadAnimation';
import ScrollToggle from '../components/ScrollToggle';
import TranslateToggle from '../components/TranslateToggle';
import ThemeToggle from '../components/ThemeToggle';
import CustomerSupportToggle from '../components/CustomerSupportToggle';
import { TranslationProvider } from '../context/TranslationContext';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  function getCategoryIcon(category) {
    switch(category) {
      case 'electronics': return 'fa-laptop';
      case 'jewelery': return 'fa-gem';
      case "men's clothing": return 'fa-tshirt';
      case "women's clothing": return 'fa-female';
      default: return 'fa-shopping-bag';
    }
  }

  return (
    <TranslationProvider>
      <Navbar />
      <PageLoadAnimation />
      <ScrollToggle />
      <TranslateToggle />
      <ThemeToggle />
      <CustomerSupportToggle />
      
      <section className="product-categories py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 display-6 fw-bold">Explore Product Categories</h2>
          <div className="row g-4">
            {categories.map((category) => (
              <div key={category} className="col-md-3 col-sm-6">
                <Link 
                  to={`/Category/${category}`} 
                  className="text-decoration-none"
                >
                  <div className="category-card card h-100 shadow-sm border-0 text-center py-4 px-3 transition-all hover-lift">
                    <div className="category-icon mb-3">
                      <i className={`fas ${getCategoryIcon(category)} fa-3x text-primary`}></i>
                    </div>
                    <h5 className="card-title text-capitalize mb-2">
                      {category.replace('-', ' ')}
                    </h5>
                    <p className="card-text text-muted small">
                      Explore our {category.replace('-', ' ')} collection
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />

      <style jsx>{`
        .category-card {
          transition: all 0.3s ease;
        }
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
        }
        .category-icon {
          color: #6c757d;
        }
      `}</style>
    </TranslationProvider>
  );
};

export default CategoriesPage;
