import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoadAnimation from '../components/PageLoadAnimation';
import ScrollToggle from '../components/ScrollToggle';
import TranslateToggle from '../components/TranslateToggle';
import ThemeToggle from '../components/ThemeToggle';
import CustomerSupportToggle from '../components/CustomerSupportToggle';
import { TranslationProvider } from '../context/TranslationContext';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Address",
      description: "123 Fashion Street, Silicon Valley, CA 94000"
    },
    {
      icon: "fas fa-phone",
      title: "Phone",
      description: "+1 (555) 123-4567"
    },
    {
      icon: "fas fa-envelope",
      title: "Email",
      description: "support@trendesh.com"
    }
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: "fab fa-facebook", 
      url: "https://www.facebook.com/abulhasnatsifat2004" 
    },
    { 
      name: "Twitter", 
      icon: "fab fa-twitter", 
      url: "https://x.com/Hasnatsifatofc" 
    },
    { 
      name: "Instagram", 
      icon: "fab fa-instagram", 
      url: "https://www.instagram.com/hasnatsifatofc" 
    },
    { 
      name: "LinkedIn", 
      icon: "fab fa-linkedin", 
      url: "https://www.linkedin.com/in/hasnatsifatofc" 
    }
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation (optional, but if provided must be valid)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulating form submission
      console.log('Form submitted:', formData);
      
      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ success: false, message: '' });
      }, 5000);
    }
  };

  return (
    <TranslationProvider>
      <Navbar />
      <PageLoadAnimation />
      <ScrollToggle />
      <TranslateToggle />
      <ThemeToggle />
      <CustomerSupportToggle />
      
      {/* Hero Section */}
      <section className="contact-hero position-relative overflow-hidden bg-light py-5">
        <div className="container position-relative z-2">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="display-4 fw-bold mb-4 text-dark">
                Get In Touch With Us
              </h1>
              <p className="lead text-muted mb-4">
                We're here to help and answer any questions you might have. 
                We look forward to hearing from you and providing the best possible service.
              </p>
              <div className="d-flex align-items-center">
                <Link 
                  to="/product" 
                  className="btn btn-primary btn-lg px-5 me-3 shadow-sm"
                >
                  Shop Now
                </Link>
                <Link 
                  to="/about" 
                  className="btn btn-outline-secondary btn-lg px-4"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="contact-showcase position-relative">
                <div className="contact-card card1 position-absolute shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
                    alt="Customer Support" 
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="contact-card card2 position-absolute shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1611510338559-2f463335092c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Customer Communication" 
                    className="img-fluid rounded-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Sections */}
      <section className="contact-sections py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="contact-info-card card h-100 shadow-sm border-0 py-4 px-4 transition-all hover-lift">
                <div className="card-body">
                  <h3 className="card-title mb-4 text-center">Contact Information</h3>
                  {contactInfo.map((info, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div className="contact-icon me-3">
                        <i className={`${info.icon} fa-2x text-primary`}></i>
                      </div>
                      <div>
                        <h6 className="mb-1">{info.title}</h6>
                        <p className="text-muted small mb-0">{info.description}</p>
                      </div>
                    </div>
                  ))}

                  <hr className="my-4" />

                  <h5 className="text-center mb-3">Follow Us</h5>
                  <div className="social-links d-flex justify-content-center">
                    {socialLinks.map((social, index) => (
                      <a 
                        key={index} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline-secondary btn-sm me-2 mb-2"
                      >
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form-card card shadow-sm border-0 py-4 px-4 transition-all hover-lift">
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">Send Us a Message</h2>
                  
                  {submitStatus.success && (
                    <div className="alert alert-success" role="alert">
                      {submitStatus.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input 
                            type="text" 
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                            id="name" 
                            placeholder="Your Name" 
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="name">Name</label>
                          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input 
                            type="email" 
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                            id="email" 
                            placeholder="Your Email" 
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="email">Email</label>
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input 
                            type="tel" 
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`} 
                            id="phone" 
                            placeholder="Phone Number (Optional)" 
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="phone">Phone (Optional)</label>
                          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input 
                            type="text" 
                            className={`form-control ${errors.subject ? 'is-invalid' : ''}`} 
                            id="subject" 
                            placeholder="Subject" 
                            value={formData.subject}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="subject">Subject</label>
                          {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <textarea 
                            className={`form-control ${errors.message ? 'is-invalid' : ''}`} 
                            id="message" 
                            placeholder="Your Message" 
                            style={{ height: '150px' }}
                            value={formData.message}
                            onChange={handleInputChange}
                          ></textarea>
                          <label htmlFor="message">Your Message</label>
                          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                        </div>
                      </div>
                      <div className="col-12">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg w-100"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .contact-hero {
          background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(240,240,240,0.6) 100%);
        }

        .contact-showcase {
          height: 400px;
        }

        .contact-card {
          width: 250px;
          transition: all 0.3s ease;
        }

        .contact-card.card1 {
          top: 0;
          left: 0;
          transform: rotate(-8deg);
        }

        .contact-card.card2 {
          bottom: 0;
          right: 0;
          transform: rotate(8deg);
        }

        .contact-card:hover {
          transform: scale(1.05);
          z-index: 10;
        }

        .contact-info-card, .contact-form-card {
          transition: all 0.3s ease;
        }

        .contact-info-card:hover, .contact-form-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
        }

        .contact-icon {
          width: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      
      <Footer />
    </TranslationProvider>
  )
}

export default ContactPage;
