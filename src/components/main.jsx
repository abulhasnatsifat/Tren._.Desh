import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredProducts] = useState([
    {
      id: 3,
      title: "Mens Cotton Jacket",
      category: "Men's Clothing",
      price: 89.99,
      description: "Comfortable and stylish cotton jacket for men. Perfect for casual and semi-formal occasions.",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
    },
    {
      id: 14,
      title: "Acer SB220Q bi Monitor",
      category: "Electronics",
      price: 129.99,
      description: "21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin Monitor with Zero Frame Design",
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
    },
    {
      id: 7,
      title: "White Gold Plated Princess Necklace",
      category: "Jewelry",
      price: 199.50,
      description: "Elegant white gold plated princess cut necklace with intricate detailing and sparkling finish",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
    }
  ]);

  const heroSections = [
    {
      title: "New Season Arrivals",
      description: "Discover the latest trends and elevate your style with our newest collection.",
      backgroundImage: "./assets/main.png.jpg",
      buttonText: "Shop Now",
      link: "/product"
    },
    {
      title: "Summer Sale",
      description: "Up to 50% off on selected items. Limited time offer!",
      backgroundImage: "https://images.unsplash.com/photo-1483985988355-763728e1935e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      buttonText: "View Sale",
      link: "/sale"
    }
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSections.length);
    }, 5000);

    return () => clearInterval(heroInterval);
  }, [heroSections.length]);

  return (
    <div className="page-content">
      {/* Hero Section with Carousel */}
      <div className="hero position-relative overflow-hidden">
        {heroSections.map((hero, index) => (
          <div 
            key={index} 
            className={`hero-slide position-absolute w-100 h-100 ${index === currentHero ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${hero.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentHero ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              zIndex: index === currentHero ? 1 : 0
            }}
          >
            <div className="container h-100 d-flex align-items-center">
              <div className="row w-100">
                <div className="col-md-6 text-white">
                  <h1 className="display-4 fw-bold">{hero.title}</h1>
                  <p className="lead mb-4">{hero.description}</p>
                  <Link 
                    to={hero.link} 
                    className="btn btn-primary btn-lg"
                  >
                    {hero.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Find Your Perfect Style Section */}
      <section className="find-your-style bg-light position-relative overflow-hidden py-0">
        <div className="container position-relative z-2">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h2 className="display-4 fw-bold mb-4 text-dark">
                Find Your Perfect Style
              </h2>
              <p className="lead text-muted mb-4">
                Explore our diverse collections and express yourself through fashion. 
                From timeless classics to cutting-edge trends, we have something 
                unique for every personality and occasion.
              </p>
              <div className="d-flex align-items-center">
                <Link 
                  to="/product" 
                  className="btn btn-primary btn-lg px-5 me-3 shadow-sm"
                >
                  Explore Collections
                </Link>
                <Link 
                  to="/category" 
                  className="btn btn-outline-secondary btn-lg px-4"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="style-showcase position-relative">
                <div className="style-card card1 position-absolute shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
                    alt="Modern Casual Style" 
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="style-card card2 position-absolute shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1611510338559-2f463335092c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Formal Style" 
                    className="img-fluid rounded-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="style-background-overlay position-absolute top-0 start-0 w-100 h-100 bg-light opacity-75"></div>
      </section>

      {/* Additional Styling for the Section */}
      <style jsx>{`
        .find-your-style {
          position: relative;
          overflow: hidden;
        }

        .style-showcase {
          height: 400px;
        }

        .style-card {
          width: 250px;
          transition: all 0.3s ease;
        }

        .style-card.card1 {
          top: 0;
          left: 0;
          transform: rotate(-8deg);
        }

        .style-card.card2 {
          bottom: 0;
          right: 0;
          transform: rotate(8deg);
        }

        .style-card:hover {
          transform: scale(1.05);
          z-index: 10;
        }

        .style-background-overlay {
          background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(240,240,240,0.6) 100%);
          z-index: 1;
        }
      `}</style>

      {/* Product Categories Section */}
      <section className="product-categories py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 display-6 fw-bold">Explore Our Product Categories</h2>
          <div className="row g-4">
            {[
              {
                name: "Electronics",
                description: "Explore electronics products",
                icon: "fas fa-laptop",
                link: "/category/electronics"
              },
              {
                name: "Jewelery",
                description: "Explore jewelery products",
                icon: "fas fa-gem",
                link: "/category/jewelery"
              },
              {
                name: "Men's Clothing",
                description: "Explore men's clothing products",
                icon: "fas fa-tshirt",
                link: "/category/mens-clothing"
              },
              {
                name: "Women's Clothing",
                description: "Explore women's clothing products",
                icon: "fas fa-female",
                link: "/category/womens-clothing"
              }
            ].map((category, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="card category-card h-100 text-center border-0 shadow-sm">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <div className="category-icon mb-3">
                      <i className={`${category.icon} fa-3x text-primary`}></i>
                    </div>
                    <h4 className="card-title mb-3">{category.name}</h4>
                    <p className="card-text text-muted mb-3">{category.description}</p>
                    <Link 
                      to={category.link} 
                      className="btn btn-outline-primary mt-auto"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-6 fw-bold">Our Trusted Brands</h2>
          <div className="row g-4">
            {[
              {
                name: "Nike",
                description: "Innovative sportswear and athletic gear",
                icon: "fab fa-nike",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
                link: "/brand/nike"
              },
              {
                name: "Apple",
                description: "Cutting-edge technology and design",
                icon: "fab fa-apple",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png",
                link: "/brand/apple"
              },
              {
                name: "Samsung",
                description: "Leading electronics and home appliances",
                icon: "fab fa-samsung",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1200px-Samsung_Logo.svg.png",
                link: "/brand/samsung"
              },
              {
                name: "Adidas",
                description: "Performance and style in sportswear",
                icon: "fab fa-adidas",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png",
                link: "/brand/adidas"
              }
            ].map((brand, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="card brand-card h-100 text-center border-0 shadow-sm">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <div className="brand-logo mb-3">
                      <img 
                        src={brand.logo} 
                        alt={`${brand.name} logo`} 
                        className="img-fluid" 
                        style={{ maxHeight: '100px', maxWidth: '150px' }}
                      />
                    </div>
                    <h4 className="card-title mb-2">{brand.name}</h4>
                    <p className="card-text text-muted mb-3 text-center">{brand.description}</p>
                    <Link 
                      to={brand.link} 
                      className="btn btn-outline-primary mt-auto"
                    >
                      View Brand
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products py-5 bg-white">
        <div className="container">
          <div className="row mb-4 align-items-center">
            <div className="col-md-8">
              <h2 className="display-6 fw-bold mb-0">Featured Products</h2>
              <p className="text-muted lead mb-0">Discover our top-rated and most popular items</p>
            </div>
            <div className="col-md-4 text-end">
              <Link 
                to="/product" 
                className="btn btn-outline-primary"
              >
                View All Products
              </Link>
            </div>
          </div>
          <div className="row g-4">
            {featuredProducts.map((product) => (
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
                          className="btn btn-light btn-sm w-100 shadow-sm"
                        >
                          Quick View
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="card-title mb-1 fw-bold">{product.title}</h5>
                        <p className="card-text text-muted small mb-2">{product.category}</p>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="card-text text-muted small flex-grow-1">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <Link 
                        to={`/product/${product.id}`} 
                        className="btn btn-outline-primary w-100"
                      >
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CSS for Featured Products */}
      <style jsx>{`
        .featured-product-card {
          transition: all 0.3s ease;
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
      `}</style>
    </div>
  );
};

export default Home;
