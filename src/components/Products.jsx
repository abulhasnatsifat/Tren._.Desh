import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Navbar from './Navbar';
import Footer from './Footer';
import PageLoadAnimation from './PageLoadAnimation';
import ScrollToggle from './ScrollToggle';
import TranslateToggle from './TranslateToggle';
import ThemeToggle from './ThemeToggle';
import CustomerSupportToggle from './CustomerSupportToggle';
import { TranslationProvider } from '../context/TranslationContext';

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(products);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setFilter(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProduct = (category) => {
    setCategoryFilter(category);
    const updatedList = products.filter((x) => x.category === category);
    setFilter(updatedList);
  };

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const categories = [...new Set(products.map(product => product.category))];

  const Loading = () => {
    return (
      <div className="row g-4">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="col-md-4">
            <div className="card featured-product-card h-100 border-0 shadow-sm overflow-hidden">
              <div className="card-img-top position-relative overflow-hidden">
                <Skeleton 
                  height={300} 
                  width="100%" 
                  containerClassName="product-image-skeleton" 
                />
              </div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <Skeleton 
                      height={20} 
                      width={150} 
                      containerClassName="product-title-skeleton mb-2" 
                    />
                    <Skeleton 
                      height={15} 
                      width={100} 
                      containerClassName="product-category-skeleton" 
                    />
                  </div>
                  <Skeleton 
                    height={25} 
                    width={60} 
                    containerClassName="product-price-skeleton" 
                  />
                </div>
                <div className="mt-auto">
                  <Skeleton 
                    height={20} 
                    width={120} 
                    containerClassName="product-rating-skeleton" 
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="row mb-4 align-items-center">
          <div className="col-md-8">
            <h1 className="display-6 fw-bold mb-2">
              All Products
            </h1>
            <p className="text-muted lead mb-0">
              Discover our complete collection of high-quality products
            </p>
          </div>
          <div className="col-md-4 text-end">
            <div className="dropdown">
              <button 
                className="btn btn-outline-primary dropdown-toggle" 
                type="button" 
                id="categoryDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {categoryFilter ? `Filter: ${categoryFilter}` : 'Filter by Category'}
              </button>
              <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                <li>
                  <button 
                    className="dropdown-item" 
                    onClick={() => setFilter(products)}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button 
                      className="dropdown-item" 
                      onClick={() => filterProduct(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {filter.map((product) => (
            <div key={product.id} className="col-md-4">
              <div className="card featured-product-card h-100 border-0 shadow-sm overflow-hidden">
                <div className="card-img-top position-relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="img-fluid w-100 product-image" 
                    style={{ 
                      height: '300px', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                  />
                  <div className="product-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3">
                    <div className="w-100 text-center">
                      <Link 
                        to={`/product/${product.id}`} 
                        className="btn btn-light btn-sm w-100 shadow-sm mb-2"
                      >
                        Quick View
                      </Link>
                      <button 
                        className="btn btn-primary btn-sm w-100 shadow-sm" 
                        onClick={() => addProduct(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="card-title mb-1 fw-bold">
                        {product.title.length > 20 
                          ? `${product.title.substring(0, 20)}...` 
                          : product.title}
                      </h5>
                      <p className="card-text text-muted small mb-2">
                        {product.category}
                      </p>
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="card-text text-muted small flex-grow-1">
                    {product.description.length > 100 
                      ? `${product.description.substring(0, 100)}...` 
                      : product.description}
                  </p>
                  <div className="mt-auto">
                    <div className="product-rating text-warning mb-2">
                      {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                      <span className="text-muted ms-2 small">
                        ({product.rating.count} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
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
      
      <div className="products-page bg-light py-5">
        <div className="container">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
      
      <Footer />

      {/* Custom CSS for Products Page */}
      <style jsx>{`
        .featured-product-card {
          transition: all 0.3s ease;
          border-radius: 10px;
        }

        .featured-product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
        }

        .product-image {
          transition: transform 0.3s ease;
        }

        .featured-product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-overlay {
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .featured-product-card:hover .product-overlay {
          opacity: 1;
        }

        .product-overlay .btn-light,
        .product-overlay .btn-primary {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }

        .featured-product-card:hover .product-overlay .btn-light,
        .featured-product-card:hover .product-overlay .btn-primary {
          opacity: 1;
          transform: translateY(0);
        }

        .product-rating .fa-star {
          color: #ffc107;
        }
      `}</style>
    </TranslationProvider>
  );
};

export default Products;
