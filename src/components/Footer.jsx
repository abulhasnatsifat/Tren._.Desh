import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaCreditCard, 
  FaPaypal, 
  FaCcVisa, 
  FaCcMastercard, 
  FaHome, 
  FaShoppingCart, 
  FaList, 
  FaInfoCircle, 
  FaEnvelope 
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter signup logic here
    console.log('Newsletter signup:', email);
    setEmail('');
    setEmailSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="bg-dark text-white py-3" style={{ background: 'linear-gradient(to right, #1e3c72, #2a5298)' }}>
        <Container fluid>
          <Row>
            {/* Company Info Column */}
            <Col md={3}>
              <div className="d-flex align-items-center">
                <img 
                  src="/assets/logo.svg" 
                  alt="Tren._.Desh Logo" 
                  style={{ height: '40px', marginRight: '10px' }} 
                />
           
                <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Tren._.Desh</h5>
              </div>
          
              <div className="social-icons mt-3">
                <a href="https://www.facebook.com/abulhasnatsifat2004" className="text-white me-3" title="Facebook"><FaFacebook size={24} /></a>
                <a href="https://x.com/Hasnatsifatofc" className="text-white me-3" title="Twitter"><FaTwitter size={24} /></a>
                <a href="https://www.instagram.com/hasnatsifatofc" className="text-white me-3" title="Instagram"><FaInstagram size={24} /></a>
                <a href="https://www.linkedin.com/in/hasnatsifatofc" className="text-white" title="LinkedIn"><FaLinkedin size={24} /></a>
              </div>
            </Col>

            {/* Quick Links Column */}
            <Col md={3}>
              <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Navigate</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-white d-flex align-items-center gap-2"><FaHome /> Home</a></li>
                <li><a href="product" className="text-white d-flex align-items-center gap-2"><FaShoppingCart /> Shop</a></li>
                <li><a href="category " className="text-white d-flex align-items-center gap-2"><FaList /> Categories</a></li>
                <li><a href="about" className="text-white d-flex align-items-center gap-2"><FaInfoCircle /> About Us</a></li>
                <li><a href="contact" className="text-white d-flex align-items-center gap-2"><FaEnvelope /> Contact</a></li>
              </ul>
            </Col>

            {/* Popular Categories Column */}
            <Col md={3}>
              <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Popular Categories</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/category/electronics" className="text-white d-flex align-items-center gap-2">
                    <i className="fa fa-laptop"></i>
                    Electronics
                  </a>
                </li>
                <li>
                  <a href="/category/jewelery" className="text-white d-flex align-items-center gap-2">
                    <i className="fa fa-gem"></i>
                    Jewelery
                  </a>
                </li>
                <li>
                  <a href="/category/men's clothing" className="text-white d-flex align-items-center gap-2">
                    <i className="fa fa-tshirt"></i>
                    Men's Clothing
                  </a>
                </li>
                <li>
                  <a href="/category/women's clothing" className="text-white d-flex align-items-center gap-2">
                    <i className="fa fa-female"></i>
                    Women's Clothing
                  </a>
                </li>
              </ul>
            </Col>

            {/* Newsletter Column */}
            <Col md={3}>
              <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Stay Updated</h5>
              <Form onSubmit={handleNewsletterSubmit}>
                <Form.Group>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="mb-2"
                  />
                  <Button variant="primary" type="submit" className="w-100" style={{ transition: 'all 0.3s ease' }}>
                    Subscribe
                  </Button>
                  {emailSubmitted && (
                    <div className="mt-2 text-success">
                      Thank you for subscribing!
                    </div>
                  )}
                </Form.Group>
              </Form>
            </Col>
          </Row>

          {/* Payment Methods and Copyright */}
          <Row className="mt-4 border-top pt-3">
            <Col className="text-center">
              <div className="payment-icons">
                <FaCreditCard size={32} className="me-2" title="Credit Card" />
                <FaPaypal size={32} className="me-2" title="PayPal" />
                <FaCcVisa size={32} className="me-2" title="Visa" />
                <FaCcMastercard size={32} title="Mastercard" />
              </div>
              <p className="mt-2">
                &copy; {new Date().getFullYear()} Tren._.Desh . All Rights Reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
      <div className="scroll-to-top" onClick={scrollToTop} title="Scroll to top">
        <i className="fa fa-arrow-up"></i>
      </div>
    </>
  );
};

export default Footer;
