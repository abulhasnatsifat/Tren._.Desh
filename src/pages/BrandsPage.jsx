import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoadAnimation from '../components/PageLoadAnimation';
import ScrollToggle from '../components/ScrollToggle';
import TranslateToggle from '../components/TranslateToggle';
import ThemeToggle from '../components/ThemeToggle';
import CustomerSupportToggle from '../components/CustomerSupportToggle';
import { TranslationProvider } from '../context/TranslationContext';

import { Link } from 'react-router-dom';

// Curated list of brands mapped to categories
const BRAND_MAPPINGS = {
  "men's clothing": [
    "Levi's",
    "Nike",
    "Adidas",
    "Zara",
    "H&M",
    "Uniqlo"
  ],
  "women's clothing": [
    "Gucci",
    "Chanel",
    "Prada",
    "Zara",
    "Forever 21",
    "Calvin Klein"
  ],
  "jewelery": [
    "Tiffany & Co.",
    "Cartier",
    "Swarovski",
    "Pandora",
    "Harry Winston",
    "Bulgari"
  ],
  "electronics": [
    "Apple",
    "Samsung",
    "Sony",
    "LG",
    "Dell",
    "HP"
  ]
};

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        
        // Collect brands from all categories
        const allBrands = categories.flatMap(category => 
          BRAND_MAPPINGS[category] || []
        );

        // Remove duplicates
        const uniqueBrands = [...new Set(allBrands)];

        setBrands(uniqueBrands);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching brands:', error);
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

  function getBrandIcon(brand) {
    switch(brand) {
      case 'Apple': return 'fa-apple';
      case 'Samsung': return 'fa-mobile';
      case 'Nike': return 'fa-running';
      case 'Adidas': return 'fa-tshirt';
      case 'Zara': return 'fa-shopping-bag';
      case 'Levi\'s': return 'fa-tshirt';
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
      
      <section className="product-brands py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 display-6 fw-bold">Explore Popular Brands</h2>
          <div className="row g-4">
            {brands.map((brand, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <Link 
                  to={`/brand/${brand}`} 
                  className="text-decoration-none"
                >
                  <div className="brand-card card h-100 shadow-sm border-0 text-center py-4 px-3 transition-all hover-lift">
                    <div className="brand-icon mb-3">
                      <i className={`fas ${getBrandIcon(brand)} fa-3x text-primary`}></i>
                    </div>
                    <h5 className="card-title text-capitalize mb-2">
                      {brand}
                    </h5>
                    <p className="card-text text-muted small">
                      Explore our {brand} collection
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
        .brand-card {
          transition: all 0.3s ease;
        }
        .brand-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
        }
        .brand-icon {
          color: #6c757d;
        }
      `}</style>
    </TranslationProvider>
  );
};

export default BrandsPage;
