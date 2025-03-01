import React, { useState, useCallback, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
    FaHome, 
    FaShoppingBag, 
    FaList, 
    FaTag, 
    FaInfoCircle, 
    FaEnvelope, 
    FaSignInAlt, 
    FaUserPlus, 
    FaShoppingCart, 
    FaUser,
    FaBars,
    FaTimes
} from 'react-icons/fa'

const navItems = [
    { to: '/', icon: FaHome, label: 'Home', ariaLabel: 'Home Page' },
    { to: '/product', icon: FaShoppingBag, label: 'Products', ariaLabel: 'Product Catalog' },
    { to: '/category', icon: FaList, label: 'Categories', ariaLabel: 'Product Categories' },
    { to: '/brands', icon: FaTag, label: 'Brands', ariaLabel: 'Brand Collection' },
    { to: '/about', icon: FaInfoCircle, label: 'About', ariaLabel: 'About Us Page' },
    { to: '/contact', icon: FaEnvelope, label: 'Contact', ariaLabel: 'Contact Page' }
]

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const state = useSelector(state => state.handleCart)

    const toggleNavbar = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    const handleScroll = useCallback(() => {
        const offset = window.scrollY;
        setScrolled(offset > 50);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setIsExpanded(false);
    }, [location]);

    return (
        <nav 
            className={`navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top ${scrolled ? 'navbar-scrolled' : ''}`}
            role="navigation"
        >
            <div className="container">
                <NavLink 
                    className="navbar-brand fw-bold fs-4 px-2 logo" 
                    to="/"
                    aria-label="Home"
                >
                    <img 
                        src="/assets/logo.svg" 
                        alt="Tren._.Desh Logo" 
                        style={{ height: '40px', marginRight: '10px' }} 
                    />
                    <span className="logo-main">Tren._.</span>
                    <span className="logo-secondary">Desh</span>
                </NavLink>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded={isExpanded} 
                    aria-label="Toggle navigation"
                    onClick={toggleNavbar}
                >
                    {isExpanded ? <FaTimes /> : <FaBars />}
                </button>

                <div 
                    className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} 
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto my-2 text-center">
                        {navItems.map(({ to, icon: Icon, label, ariaLabel }) => (
                            <li key={to} className="nav-item">
                                <NavLink 
                                    className="nav-link" 
                                    activeClassName="active" 
                                    to={to} 
                                    aria-label={ariaLabel}
                                >
                                    <Icon className="nav-icon" /> {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="buttons text-center d-flex align-items-center">
                        <NavLink 
                            to="/login" 
                            className="btn btn-outline-primary m-2 nav-button"
                            aria-label="Login"
                        >
                            <FaSignInAlt className="button-icon" /> Login
                        </NavLink>
                        <NavLink 
                            to="/register" 
                            className="btn btn-outline-success m-2 nav-button"
                            aria-label="Register"
                        >
                            <FaUserPlus className="button-icon" /> Register
                        </NavLink>
                        <NavLink 
                            to="/cart" 
                            className="btn btn-outline-warning m-2 position-relative nav-button"
                            aria-label="Shopping Cart"
                        >
                            <FaShoppingCart className="button-icon" />
                            {state.length > 0 && (
                                <span 
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    aria-label={`${state.length} items in cart`}
                                >
                                    {state.length}
                                </span>
                            )}
                        </NavLink>
                        <div className="ms-auto">
                            <NavLink 
                                to="/profile" 
                                className="btn btn-circle btn-profile m-2"
                                aria-label="User Profile"
                                style={{
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    padding: 0,
                                    backgroundColor: '#007bff',
                                    color: 'white'
                                }}
                            >
                                <FaUser className="button-icon" />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default React.memo(Navbar)