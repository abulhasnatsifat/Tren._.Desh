import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoadAnimation from '../components/PageLoadAnimation';
import ScrollToggle from '../components/ScrollToggle';
import TranslateToggle from '../components/TranslateToggle';
import ThemeToggle from '../components/ThemeToggle';
import CustomerSupportToggle from '../components/CustomerSupportToggle';
import { TranslationProvider } from '../context/TranslationContext';
import adminphoto from '../assets/adminpanel/admin.jpg';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Hasnat Sifat",
      role: "Founder & CEO",
      image: adminphoto,
      description: "A visionary entrepreneur with 15 years of experience in Tren._.Desh and retail innovation."
    }
  ];

  const companyValues = [
    {
      title: "Quality First",
      description: "We meticulously curate products that meet the highest standards of quality and craftsmanship.",
      icon: "🏆"
    },
    {
      title: "Sustainable Fashion",
      description: "Committed to environmentally responsible practices and ethical sourcing.",
      icon: "🌍"
    },
    {
      title: "Customer Empowerment",
      description: "Providing personalized shopping experiences that inspire and delight.",
      icon: "💡"
    }
  ];

  return (
    <TranslationProvider>
      <Navbar />
      <PageLoadAnimation />
      <ScrollToggle />
      <TranslateToggle />
      <ThemeToggle />
      <CustomerSupportToggle />
      
      {/* Hero Section */}
      <section className="hero position-relative overflow-hidden bg-light py-5">
        <div className="container position-relative z-2">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="display-4 fw-bold mb-4 text-dark">
                More Than Just an Online Store
              </h1>
              <p className="lead text-muted mb-4">
                We are a community of fashion enthusiasts, tech innovators, 
                and style creators dedicated to bringing you exceptional products 
                from around the globe. Our mission is to make shopping an inspiring 
                and seamless experience.
              </p>
              <div className="d-flex align-items-center">
                <Link 
                  to="/product" 
                  className="btn btn-primary btn-lg px-5 me-3 shadow-sm"
                >
                  Shop Now
                </Link>
                <Link 
                  to="/contact" 
                  className="btn btn-outline-secondary btn-lg px-4"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="about-showcase position-relative">
                <div className="about-card card1 position-absolute shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
                    alt="Modern Shopping Experience" 
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="about-card card2 position-absolute shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1611510338559-2f463335092c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Curated Collections" 
                    className="img-fluid rounded-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="product-categories py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 display-6 fw-bold">Our Product Universe</h2>
          <div className="row g-4">
            {[
              { 
                title: "Men's Clothing", 
                icon: "fa-tshirt",
                description: "Sophisticated styles for the modern man."
              },
              { 
                title: "Women's Clothing", 
                icon: "fa-female",
                description: "Trendsetting fashion for every occasion."
              },
              { 
                title: "Jewelery", 
                icon: "fa-gem",
                description: "Exquisite pieces that tell your story."
              },
              { 
                title: "Electronics", 
                icon: "fa-laptop",
                description: "Cutting-edge tech for your lifestyle."
              }
            ].map((category, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="category-card card h-100 shadow-sm border-0 text-center py-4 px-3 transition-all hover-lift">
                  <div className="category-icon mb-3">
                    <i className={`fas ${category.icon} fa-3x text-primary`}></i>
                  </div>
                  <h5 className="card-title text-capitalize mb-2">
                    {category.title}
                  </h5>
                  <p className="card-text text-muted small">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-6 fw-bold">Our Core Values</h2>
          <div className="row g-4">
            {companyValues.map((value, index) => (
              <div key={index} className="col-md-4">
                <div className="value-card card h-100 shadow-sm border-0 text-center py-4 px-3 transition-all hover-lift">
                  <div className="value-icon mb-3">
                    <span className="display-4 text-primary">{value.icon}</span>
                  </div>
                  <h4 className="card-title mb-2">{value.title}</h4>
                  <p className="card-text text-muted small">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 display-6 fw-bold">Meet Our Leadership</h2>
          <div className="row g-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-4">
                <div className="team-card card h-100 shadow-sm border-0 text-center py-4 px-3 transition-all hover-lift">
                  <div className="team-member-image mb-3">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="rounded-circle" 
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                    />
                  </div>
                  <h5 className="card-title mb-1">{member.name}</h5>
                  <p className="card-text text-muted small mb-2">{member.role}</p>
                  <p className="card-text text-muted small">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(240,240,240,0.6) 100%);
        }

        .about-showcase {
          height: 400px;
        }

        .about-card {
          width: 250px;
          transition: all 0.3s ease;
        }

        .about-card.card1 {
          top: 0;
          left: 0;
          transform: rotate(-8deg);
        }

        .about-card.card2 {
          bottom: 0;
          right: 0;
          transform: rotate(8deg);
        }

        .about-card:hover {
          transform: scale(1.05);
          z-index: 10;
        }

        .category-card, .value-card, .team-card {
          transition: all 0.3s ease;
        }

        .category-card:hover, .value-card:hover, .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
        }
      `}</style>
      
      <Footer />
    </TranslationProvider>
  )
}

export default AboutPage;
