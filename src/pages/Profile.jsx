import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoadAnimation from '../components/PageLoadAnimation';
import ScrollToggle from '../components/ScrollToggle';
import TranslateToggle from '../components/TranslateToggle';
import ThemeToggle from '../components/ThemeToggle';
import CustomerSupportToggle from '../components/CustomerSupportToggle';
import { TranslationProvider } from '../context/TranslationContext';

import DefaultProfileImage from '../assets/profile/default-profile.png';
import DefaultCoverImage from '../assets/cover/default-cover.png';

// Social media icons (you can replace with actual icon library import)
const SocialIcons = {
    facebook: 'fab fa-facebook-f',
    twitter: 'fab fa-twitter',
    instagram: 'fab fa-instagram',
    linkedin: 'fab fa-linkedin-in',
    github: 'fab fa-github',

    pinterest: 'fab fa-pinterest-p',
    tiktok: 'fab fa-tiktok'
};

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    
    // State for profile details with social media links
    const [profileData, setProfileData] = useState({
        name: 'Hasnat Sifat',
        email: 'abulhasnatsifat@gmail.com',
        phone: '+1 (555) 123-4567',
        registrationDate: 'January 15, 2023',
        bio: 'Passionate tech enthusiast and online shopper',
        gender: 'Male',
        dateOfBirth: '1990-05-15',
        profilePhoto: DefaultProfileImage,
        coverPhoto: DefaultCoverImage,
        socialLinks: {
            facebook: 'https://www.facebook.com/abulhasnatsifat2004/',
            twitter: 'https://x.com/Hasnatsifatofc',
            instagram: 'https://www.instagram.com/hasnatsifatofc/',
            linkedin: 'linkedin.com/in/hasnatsifatofc/',
            github: 'https://github.com/abulhasnatsifat', // Replaced the GitHub URL with the new URL
      
        }
    });

    // Refs for file inputs
    const profilePhotoInputRef = useRef(null);
    const coverPhotoInputRef = useRef(null);

    // State to manage edit mode and form validation
    const [isEditing, setIsEditing] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [editedProfile, setEditedProfile] = useState({...profileData});

    // Social media link validation
    const validateSocialLink = (platform, url) => {
        if (!url) return true; // Empty is allowed

        const platformValidators = {
            facebook: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/,
            twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/,
            instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/,
            linkedin: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/,
            github: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/,
            youtube: /^https?:\/\/(www\.)?youtube\.com\/(c\/|channel\/|user\/)?[a-zA-Z0-9-]+\/?$/,
            pinterest: /^https?:\/\/(www\.)?pinterest\.com\/[a-zA-Z0-9-]+\/?$/,
            tiktok: /^https?:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9_]+\/?$/
        };

        return platformValidators[platform].test(url);
    };

    // Update social link in edit mode
    const handleSocialLinkChange = (platform, value) => {
        setEditedProfile(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    // Render social media links
    const renderSocialLinks = (links, editable = false) => {
        return Object.entries(links)
            .filter(([_, url]) => editable || url) // Show all in edit mode, only non-empty in view mode
            .map(([platform, url]) => {
                if (editable) {
                    return (
                        <div key={platform} className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className={`${SocialIcons[platform]} text-muted`}></i>
                                </span>
                                <input 
                                    type="text" 
                                    className={`form-control ${
                                        url && !validateSocialLink(platform, url) 
                                        ? 'is-invalid' 
                                        : ''
                                    }`}
                                    placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Profile URL`}
                                    value={url}
                                    onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                                />
                                {url && !validateSocialLink(platform, url) && (
                                    <div className="invalid-feedback">
                                        Invalid {platform} profile URL
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }

                return (
                    <a 
                        key={platform} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-sm me-2 mb-2"
                    >
                        <i className={`${SocialIcons[platform]} me-1`}></i>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                );
            });
    };

    // Handle profile photo change
    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid image (JPEG, PNG, or GIF)');
                return;
            }

            if (file.size > maxSize) {
                alert('File size should be less than 5MB');
                return;
            }

            // Create a URL for the uploaded image
            const reader = new FileReader();
            reader.onloadend = () => {
                // Save the image to local storage or send to backend in a real app
                localStorage.setItem('userProfilePhoto', reader.result);
                
                setEditedProfile(prev => ({
                    ...prev,
                    profilePhoto: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle cover photo change
    const handleCoverPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 10 * 1024 * 1024; // 10MB for cover photo

            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid image (JPEG, PNG, or GIF)');
                return;
            }

            if (file.size > maxSize) {
                alert('File size should be less than 10MB');
                return;
            }

            // Create a URL for the uploaded image
            const reader = new FileReader();
            reader.onloadend = () => {
                // Save the image to local storage or send to backend in a real app
                localStorage.setItem('userCoverPhoto', reader.result);
                
                setEditedProfile(prev => ({
                    ...prev,
                    coverPhoto: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove profile photo

    // Remove cover photo
    const removeCoverPhoto = () => {
        localStorage.removeItem('userCoverPhoto');
        setEditedProfile(prev => ({
            ...prev,
            coverPhoto: DefaultCoverImage
        }));
    };

    // Trigger file input clicks
    const triggerProfilePhotoInput = () => {
        profilePhotoInputRef.current.click();
    };

    const triggerCoverPhotoInput = () => {
        coverPhotoInputRef.current.click();
    };

    // On component mount, check for saved photos
    useEffect(() => {
        const savedProfilePhoto = localStorage.getItem('userProfilePhoto');
        const savedCoverPhoto = localStorage.getItem('userCoverPhoto');

        setProfileData(prev => ({
            ...prev,
            ...(savedProfilePhoto && { profilePhoto: savedProfilePhoto }),
            ...(savedCoverPhoto && { coverPhoto: savedCoverPhoto })
        }));
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Save profile changes
    const handleSaveProfile = () => {
        if (validateForm()) {
            setProfileData({...editedProfile});
            setIsEditing(false);
        }
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditedProfile({...profileData});
        setIsEditing(false);
        setFormErrors({});
    };

    // Validation function
    const validateForm = () => {
        const errors = {};
        
        // Name validation
        if (!editedProfile.name.trim()) {
            errors.name = 'Name is required';
        } else if (editedProfile.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!editedProfile.email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(editedProfile.email)) {
            errors.email = 'Invalid email format';
        }

        // Phone validation
        const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
        if (!editedProfile.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(editedProfile.phone)) {
            errors.phone = 'Invalid phone format. Use +1 (555) 123-4567';
        }

        // Date of Birth validation
        if (!editedProfile.dateOfBirth) {
            errors.dateOfBirth = 'Date of Birth is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Enhanced saved addresses with more details and management
    const [savedAddresses, setSavedAddresses] = useState([
        {
            id: 'ADD-001',
            type: 'Home',
            fullName: 'John Doe',
            streetAddress: '123 Tech Innovation Lane',
            apartment: 'Apt 4B',
            city: 'Silicon Valley',
            state: 'CA',
            zipCode: '94000',
            country: 'United States',
            phoneNumber: '+1 (555) 123-4567',
            isDefault: true,
            coordinates: {
                latitude: 37.7749,
                longitude: -122.4194
            }
        },
        {
            id: 'ADD-002',
            type: 'Work',
            fullName: 'John Doe',
            streetAddress: '456 Corporate Plaza',
            apartment: 'Suite 200',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
            country: 'United States',
            phoneNumber: '+1 (555) 987-6543',
            isDefault: false,
            coordinates: {
                latitude: 37.7880,
                longitude: -122.4075
            }
        }
    ]);

    // Address management state
    const [addressModalMode, setAddressModalMode] = useState(null); // 'add', 'edit', or null
    const [selectedAddress, setSelectedAddress] = useState(null);

    // Address form validation
    const validateAddress = (address) => {
        const errors = {};
        
        if (!address.fullName || address.fullName.trim().length < 2) {
            errors.fullName = 'Full name is required and must be at least 2 characters';
        }
        
        if (!address.streetAddress || address.streetAddress.trim().length < 5) {
            errors.streetAddress = 'Street address is required and must be at least 5 characters';
        }
        
        if (!address.city || address.city.trim().length < 2) {
            errors.city = 'City is required';
        }
        
        if (!address.state || address.state.trim().length < 2) {
            errors.state = 'State is required';
        }
        
        if (!address.zipCode || !/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
            errors.zipCode = 'Valid ZIP code is required (e.g., 12345 or 12345-6789)';
        }
        
        if (!address.phoneNumber || !/^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(address.phoneNumber)) {
            errors.phoneNumber = 'Phone number must be in format: +1 (555) 123-4567';
        }
        
        return errors;
    };

    // Open address modal for adding or editing
    const openAddressModal = (mode, address = null) => {
        setAddressModalMode(mode);
        setSelectedAddress(address || {
            type: 'Home',
            fullName: '',
            streetAddress: '',
            apartment: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'United States',
            phoneNumber: '+1 (',
            isDefault: false
        });
    };

    // Save or update address
    const saveAddress = () => {
        const validationErrors = validateAddress(selectedAddress);
        
        if (Object.keys(validationErrors).length > 0) {
            // TODO: Display validation errors to user
            console.error('Address Validation Errors:', validationErrors);
            return;
        }

        if (addressModalMode === 'add') {
            // Generate a new unique ID
            const newAddress = {
                ...selectedAddress,
                id: `ADD-${Date.now()}`
            };
            setSavedAddresses(prev => [...prev, newAddress]);
        } else if (addressModalMode === 'edit') {
            setSavedAddresses(prev => 
                prev.map(addr => 
                    addr.id === selectedAddress.id ? selectedAddress : addr
                )
            );
        }

        // Close modal
        setAddressModalMode(null);
        setSelectedAddress(null);
    };

    // Delete an address
    const deleteAddress = (addressId) => {
        // Prevent deletion if it's the only or default address
        if (savedAddresses.length === 1 || 
            savedAddresses.find(addr => addr.id === addressId)?.isDefault) {
            // TODO: Show user-friendly error message
            console.error('Cannot delete the only or default address');
            return;
        }

        setSavedAddresses(prev => prev.filter(addr => addr.id !== addressId));
    };

    // Set default address
    const setDefaultAddress = (addressId) => {
        setSavedAddresses(prev => 
            prev.map(addr => ({
                ...addr,
                isDefault: addr.id === addressId
            }))
        );
    };

    // Render address modal
    const renderAddressModal = () => {
        if (!addressModalMode) return null;

        return (
            <div className="modal" tabIndex="-1" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {addressModalMode === 'add' ? 'Add New Address' : 'Edit Address'}
                            </h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={() => setAddressModalMode(null)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Address Type</label>
                                        <select 
                                            className="form-select"
                                            value={selectedAddress.type}
                                            onChange={(e) => setSelectedAddress(prev => ({
                                                ...prev, 
                                                type: e.target.value
                                            }))}
                                        >
                                            <option value="Home">Home</option>
                                            <option value="Work">Work</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={selectedAddress.fullName}
                                            onChange={(e) => setSelectedAddress(prev => ({
                                                ...prev, 
                                                fullName: e.target.value
                                            }))}
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 mb-3">
                                        <label className="form-label">Street Address</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={selectedAddress.streetAddress}
                                            onChange={(e) => setSelectedAddress(prev => ({
                                                ...prev, 
                                                streetAddress: e.target.value
                                            }))}
                                            placeholder="Street address"
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Apartment/Suite</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={selectedAddress.apartment}
                                            onChange={(e) => setSelectedAddress(prev => ({
                                                ...prev, 
                                                apartment: e.target.value
                                            }))}
                                            placeholder="Apt/Suite"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">City</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={selectedAddress.city}
                                            onChange={(e) => setSelectedAddress(prev => ({
                                                ...prev, 
                                                city: e.target.value
                                            }))}
                                            placeholder="City"
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">State</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={selectedAddress.state}
                                            onChange={(e) => setSelectedAddress(prev => ({
                                                ...prev, 
                                                state: e.target.value
                                            }))}
                                            placeholder="State"
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">ZIP Code</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={selectedAddress.zipCode}
                                            onChange={(e) => setSelectedAddress(prev => ({
                                                ...prev, 
                                                zipCode: e.target.value
                                            }))}
                                            placeholder="ZIP Code"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Country</label>
                                        <select 
                                            className="form-select"
                                            value={selectedAddress.country}
                                            onChange={(e) => setSelectedAddress(prev => ({
                                                ...prev, 
                                                country: e.target.value
                                            }))}
                                        >
                                            <option value="United States">United States</option>
                                            <option value="Canada">Canada</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            {/* Add more countries as needed */}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            className="form-control" 
                                            value={selectedAddress.phoneNumber}
                                            onChange={(e) => setSelectedAddress(prev => ({
                                                ...prev, 
                                                phoneNumber: e.target.value
                                            }))}
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                </div>
                                <div className="form-check mb-3">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id="defaultAddress"
                                        checked={selectedAddress.isDefault}
                                        onChange={(e) => setSelectedAddress(prev => ({
                                            ...prev, 
                                            isDefault: e.target.checked
                                        }))}
                                    />
                                    <label className="form-check-label" htmlFor="defaultAddress">
                                        Set as default address
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => setAddressModalMode(null)}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={saveAddress}
                            >
                                Save Address
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render saved addresses section
    const renderSavedAddresses = () => {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title">Saved Addresses</h5>
                        <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => openAddressModal('add')}
                        >
                            <i className="fas fa-plus me-1"></i> Add New Address
                        </button>
                    </div>

                    {savedAddresses.length === 0 ? (
                        <div className="alert alert-info text-center">
                            You have no saved addresses. Add your first address!
                        </div>
                    ) : (
                        <div className="row">
                            {savedAddresses.map((address) => (
                                <div key={address.id} className="col-md-6 mb-3">
                                    <div className={`card ${address.isDefault ? 'border-primary' : ''}`}>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h6 className="card-title">
                                                    {address.type} Address 
                                                    {address.isDefault && (
                                                        <span 
                                                            className="badge bg-primary ms-2"
                                                            title="Default Address"
                                                        >
                                                            Default
                                                        </span>
                                                    )}
                                                </h6>
                                                <div className="dropdown">
                                                    <button 
                                                        className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                                                        type="button" 
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        Actions
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button 
                                                                className="dropdown-item" 
                                                                onClick={() => openAddressModal('edit', address)}
                                                            >
                                                                <i className="fas fa-edit me-1"></i> Edit
                                                            </button>
                                                        </li>
                                                        {!address.isDefault && (
                                                            <>
                                                                <li>
                                                                    <button 
                                                                        className="dropdown-item" 
                                                                        onClick={() => setDefaultAddress(address.id)}
                                                                    >
                                                                        <i className="fas fa-star me-1"></i> Set as Default
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button 
                                                                        className="dropdown-item text-danger" 
                                                                        onClick={() => deleteAddress(address.id)}
                                                                    >
                                                                        <i className="fas fa-trash me-1"></i> Delete
                                                                    </button>
                                                                </li>
                                                            </>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                            <p className="card-text">
                                                {address.fullName}<br />
                                                {address.streetAddress} {address.apartment}<br />
                                                {address.city}, {address.state} {address.zipCode}<br />
                                                {address.country}<br />
                                                {address.phoneNumber}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Address Management Modal */}
                {renderAddressModal()}
            </div>
        );
    };

    // Modify renderProfileDetails to include social links
    const renderProfileDetails = () => {
        if (isEditing) {
            return (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Edit Profile</h5>
                        <form>
                            {/* Cover Photo Section */}
                            <div className="mb-4 position-relative">
                                <input 
                                    type="file" 
                                    ref={coverPhotoInputRef}
                                    style={{display: 'none'}}
                                    accept="image/jpeg,image/png,image/gif"
                                    onChange={handleCoverPhotoChange}
                                />
                                <img 
                                    src={editedProfile.coverPhoto} 
                                    alt="Cover" 
                                    className="img-fluid w-100"
                                    style={{
                                        height: '250px', 
                                        objectFit: 'cover', 
                                        borderRadius: '10px'
                                    }}
                                />
                                <div className="position-absolute top-0 end-0 m-3">
                                    <button 
                                        type="button"
                                        className="btn btn-sm btn-light me-2"
                                        onClick={triggerCoverPhotoInput}
                                    >
                                        <i className="fas fa-camera me-1"></i>Change Cover
                                    </button>
                                    {editedProfile.coverPhoto !== DefaultCoverImage && (
                                        <button 
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={removeCoverPhoto}
                                        >
                                            <i className="fas fa-trash me-1"></i>Remove
                                        </button>
                                    )}
                                </div>

                                {/* Profile Photo Section - Overlaid on Cover Photo */}
                                <div 
                                    className="position-absolute" 
                                    style={{
                                        bottom: '-50px', 
                                        left: '50px', 
                                        zIndex: 10
                                    }}
                                >
                                    <input 
                                        type="file" 
                                        ref={profilePhotoInputRef}
                                        style={{display: 'none'}}
                                        accept="image/jpeg,image/png,image/gif"
                                        onChange={handleProfilePhotoChange}
                                    />
                                    <img 
                                        src={editedProfile.profilePhoto} 
                                        alt="Profile" 
                                        className="rounded-circle border border-4 border-white"
                                        style={{
                                            width: '150px', 
                                            height: '150px', 
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <button 
                                        type="button"
                                        className="btn btn-sm btn-light position-absolute bottom-0 end-0"
                                        onClick={triggerProfilePhotoInput}
                                    >
                                        <i className="fas fa-camera"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Social Media Links Section */}
                            <div className="mt-4">
                                <h6 className="mb-3">Social Media Links</h6>
                                {renderSocialLinks(editedProfile.socialLinks, true)}
                            </div>

                            {/* Add extra top margin to account for overlaid profile photo */}
                            <div style={{marginTop: '80px'}}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        name="name"
                                        value={editedProfile.name}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.name && (
                                        <div className="invalid-feedback">{formErrors.name}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        value={editedProfile.email}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.email && (
                                        <div className="invalid-feedback">{formErrors.email}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                                        id="phone"
                                        name="phone"
                                        value={editedProfile.phone}
                                        onChange={handleInputChange}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                    {formErrors.phone && (
                                        <div className="invalid-feedback">{formErrors.phone}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                                    <input 
                                        type="date" 
                                        className={`form-control ${formErrors.dateOfBirth ? 'is-invalid' : ''}`}
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        value={editedProfile.dateOfBirth}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.dateOfBirth && (
                                        <div className="invalid-feedback">{formErrors.dateOfBirth}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="gender" className="form-label">Gender</label>
                                    <select 
                                        className="form-select" 
                                        id="gender"
                                        name="gender"
                                        value={editedProfile.gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer Not to Say">Prefer Not to Say</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="bio" className="form-label">Bio</label>
                                    <textarea 
                                        className="form-control" 
                                        id="bio"
                                        name="bio"
                                        value={editedProfile.bio}
                                        onChange={handleInputChange}
                                        rows="3"
                                        placeholder="Tell us a bit about yourself"
                                    ></textarea>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        onClick={handleSaveProfile}
                                    >
                                        Save Changes
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary" 
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }

        return (
            <div className="card">
                <div className="position-relative">
                    {/* Cover Photo */}
                    <img 
                        src={profileData.coverPhoto} 
                        alt="Cover" 
                        className="img-fluid w-100"
                        style={{
                            height: '250px', 
                            objectFit: 'cover', 
                            borderRadius: '10px 10px 0 0'
                        }}
                    />

                    {/* Profile Details Section */}
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex align-items-center">
                                {/* Profile Photo */}
                                <img 
                                    src={profileData.profilePhoto} 
                                    alt="Profile" 
                                    className="rounded-circle border border-3 border-white me-3"
                                    style={{
                                        width: '120px', 
                                        height: '120px', 
                                        objectFit: 'cover',
                                        marginTop: '-80px'
                                    }}
                                />
                                <div>
                                    <h4 className="mb-1">{profileData.name}</h4>
                                    <p className="text-muted mb-0">{profileData.email}</p>
                                </div>
                            </div>
                            <button 
                                className="btn btn-sm btn-outline-primary" 
                                onClick={() => setIsEditing(true)}
                            >
                                <i className="fas fa-edit me-1"></i>Edit Profile
                            </button>
                        </div>

                        {/* Social Media Links Section */}
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5>Social Media</h5>
                                <button 
                                    className="btn btn-sm btn-outline-primary" 
                                    onClick={() => setIsEditing(true)}
                                >
                                    <i className="fas fa-edit me-1"></i>Edit
                                </button>
                            </div>
                            <div className="d-flex flex-wrap">
                                {renderSocialLinks(profileData.socialLinks)}
                            </div>
                        </div>

                        {/* Rest of the profile details */}
                        <div className="row">
                            <div className="col-md-8">
                                <p className="mb-2">
                                    <strong>Bio:</strong> {profileData.bio}
                                </p>
                                <p className="mb-2">
                                    <strong>Gender:</strong> {profileData.gender}
                                </p>
                                <p className="mb-2">
                                    <strong>Date of Birth:</strong> {new Date(profileData.dateOfBirth).toLocaleDateString()}
                                </p>
                                <p className="mb-2">
                                    <strong>Member Since:</strong> {profileData.registrationDate}
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p className="mb-2">
                                    <strong>Phone:</strong> {profileData.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Enhanced order history with more details
    const [orderHistory] = useState([
        {
            id: 'ORD-001',
            date: '2023-02-10',
            total: 129.99,
            status: 'Delivered',
            items: [
                {
                    name: 'Wireless Noise-Cancelling Headphones',
                    quantity: 1,
                    price: 129.99,
                    image: 'https://example.com/headphones.jpg'
                }
            ],
            shippingAddress: {
                name: 'John Doe',
                street: '123 Tech Lane',
                city: 'Silicon Valley',
                state: 'CA',
                zipCode: '94000',
                country: 'USA'
            },
            paymentMethod: {
                type: 'Credit Card',
                last4: '4567'
            },
            trackingNumber: 'SHIP-12345-XYZ'
        },
        {
            id: 'ORD-002',
            date: '2023-03-05',
            total: 79.50,
            status: 'Shipped',
            items: [
                {
                    name: 'Smart Fitness Tracker',
                    quantity: 1,
                    price: 49.99,
                    image: 'https://example.com/fitness-tracker.jpg'
                },
                {
                    name: 'Wireless Earbuds',
                    quantity: 1,
                    price: 29.51,
                    image: 'https://example.com/earbuds.jpg'
                }
            ],
            shippingAddress: {
                name: 'John Doe',
                street: '456 Innovation Road',
                city: 'Tech City',
                state: 'CA',
                zipCode: '90210',
                country: 'USA'
            },
            paymentMethod: {
                type: 'PayPal',
                email: 'johndoe@example.com'
            },
            trackingNumber: 'SHIP-67890-ABC'
        }
    ]);

    // Order filtering and sorting state
    const [orderFilter, setOrderFilter] = useState({
        status: 'All',
        sortBy: 'date',
        sortOrder: 'desc'
    });

    // Order details modal state
    const [, setSelectedOrder] = useState(null);

    // Filter and sort orders
    const processedOrders = React.useMemo(() => {
        return orderHistory
            .filter(order => 
                orderFilter.status === 'All' || 
                order.status.toLowerCase() === orderFilter.status.toLowerCase()
            )
            .sort((a, b) => {
                const modifier = orderFilter.sortOrder === 'asc' ? 1 : -1;
                
                if (orderFilter.sortBy === 'date') {
                    return modifier * (new Date(a.date) - new Date(b.date));
                }
                
                if (orderFilter.sortBy === 'total') {
                    return modifier * (a.total - b.total);
                }
                
                return 0;
            });
    }, [orderHistory, orderFilter]);

    // Open order details modal
    const openOrderDetails = (order) => {
        setSelectedOrder(order);
    };

    // Render order details modal
    // eslint-disable-next-line no-unused-vars

    // Render order history section
    const renderOrderHistory = () => {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title">Order History</h5>
                        <div className="d-flex align-items-center">
                            {/* Status Filter */}
                            <select 
                                className="form-select form-select-sm me-2" 
                                style={{width: 'auto'}}
                                value={orderFilter.status}
                                onChange={(e) => setOrderFilter(prev => ({
                                    ...prev, 
                                    status: e.target.value
                                }))}
                            >
                                <option value="All">All Orders</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Processing">Processing</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                            {/* Sort Options */}
                            <select 
                                className="form-select form-select-sm me-2" 
                                style={{width: 'auto'}}
                                value={JSON.stringify({sortBy: orderFilter.sortBy, sortOrder: orderFilter.sortOrder})}
                                onChange={(e) => {
                                    const {sortBy, sortOrder} = JSON.parse(e.target.value);
                                    setOrderFilter(prev => ({...prev, sortBy, sortOrder}));
                                }}
                            >
                                <option value={JSON.stringify({sortBy: 'date', sortOrder: 'desc'})}>
                                    Newest First
                                </option>
                                <option value={JSON.stringify({sortBy: 'date', sortOrder: 'asc'})}>
                                    Oldest First
                                </option>
                                <option value={JSON.stringify({sortBy: 'total', sortOrder: 'desc'})}>
                                    Highest Total
                                </option>
                                <option value={JSON.stringify({sortBy: 'total', sortOrder: 'asc'})}>
                                    Lowest Total
                                </option>
                            </select>
                        </div>
                    </div>

                    {processedOrders.length === 0 ? (
                        <div className="alert alert-info text-center">
                            No orders found matching the current filter.
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {processedOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                            <td>${order.total.toFixed(2)}</td>
                                            <td>
                                                <span 
                                                    className={`badge ${
                                                        order.status === 'Delivered' ? 'bg-success' :
                                                        order.status === 'Shipped' ? 'bg-primary' :
                                                        order.status === 'Processing' ? 'bg-warning' :
                                                        'bg-danger'
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-outline-info"
                                                    onClick={() => openOrderDetails(order)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const wishlist = [
        {
            id: 'PROD-001',
            name: 'Wireless Noise-Cancelling Headphones',
            price: '$249.99',
            image: 'https://example.com/headphones.jpg'
        },
        {
            id: 'PROD-002',
            name: 'Smart Fitness Tracker',
            price: '$129.50',
            image: 'https://example.com/fitness-tracker.jpg'
        }
    ];

    const userReviews = [
        {
            id: 'REV-001',
            productName: 'Bluetooth Speaker',
            rating: 4.5,
            date: 'January 20, 2023',
            review: 'Great sound quality and battery life. Highly recommended!'
        },
        {
            id: 'REV-002',
            productName: 'Wireless Earbuds',
            rating: 4.0,
            date: 'February 15, 2023',
            review: 'Comfortable and good noise cancellation. Battery could be better.'
        }
    ];

    const accountSettings = {
        newsletter: true,
        twoFactorAuth: false,
        privacyPreferences: {
            marketingEmails: true,
            personalizedAds: false
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
            
            <div className="container my-3 py-3">
                <h1 className="text-center">User Profile</h1>
                <hr />
                <div className="row">
                    <div className="col-md-3">
                        <div className="nav flex-column nav-pills" role="tablist">
                            <button 
                                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('profile')}
                            >
                                Profile Details
                            </button>
                            <button 
                                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('orders')}
                            >
                                Order History
                            </button>
                            <button 
                                className={`nav-link ${activeTab === 'addresses' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('addresses')}
                            >
                                Saved Addresses
                            </button>
                            <button 
                                className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('payments')}
                            >
                                Payment Methods
                            </button>
                            <button 
                                className={`nav-link ${activeTab === 'wishlist' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('wishlist')}
                            >
                                Wishlist
                            </button>
                            <button 
                                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('reviews')}
                            >
                                My Reviews
                            </button>
                            <button 
                                className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('settings')}
                            >
                                Account Settings
                            </button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        {activeTab === 'profile' && renderProfileDetails()}
                        {activeTab === 'orders' && renderOrderHistory()}
                        {activeTab === 'addresses' && renderSavedAddresses()}
                        {activeTab === 'payments' && (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Payment Methods</h5>
                                    {/* TODO: Implement payment methods */}
                                </div>
                            </div>
                        )}
                        {activeTab === 'wishlist' && (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Wishlist</h5>
                                    <div className="row">
                                        {wishlist.map((item) => (
                                            <div key={item.id} className="col-md-4 mb-3">
                                                <div className="card">
                                                    <img 
                                                        src={item.image} 
                                                        className="card-img-top" 
                                                        alt={item.name} 
                                                        style={{height: '200px', objectFit: 'cover'}}
                                                    />
                                                    <div className="card-body">
                                                        <h6 className="card-title">{item.name}</h6>
                                                        <p className="card-text">{item.price}</p>
                                                        <div className="d-flex justify-content-between">
                                                            <button className="btn btn-sm btn-primary">Add to Cart</button>
                                                            <button className="btn btn-sm btn-outline-danger">Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">My Reviews</h5>
                                    {userReviews.map((review) => (
                                        <div key={review.id} className="mb-3 p-3 border rounded">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="mb-0">{review.productName}</h6>
                                                <div className="text-warning">
                                                    {[...Array(Math.floor(review.rating))].map((_, i) => (
                                                        <span key={i}>★</span>
                                                    ))}
                                                    {review.rating % 1 !== 0 && <span>½</span>}
                                                </div>
                                            </div>
                                            <p className="text-muted small mb-2">{review.date}</p>
                                            <p>{review.review}</p>
                                            <div>
                                                <button className="btn btn-sm btn-secondary me-2">Edit Review</button>
                                                <button className="btn btn-sm btn-outline-danger">Delete Review</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeTab === 'settings' && (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Account Settings</h5>
                                    <div className="mb-3">
                                        <h6>Communication Preferences</h6>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                checked={accountSettings.newsletter}
                                                id="newsletterCheck"
                                            />
                                            <label className="form-check-label" htmlFor="newsletterCheck">
                                                Subscribe to Newsletter
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                checked={accountSettings.privacyPreferences.marketingEmails}
                                                id="marketingEmailsCheck"
                                            />
                                            <label className="form-check-label" htmlFor="marketingEmailsCheck">
                                                Receive Marketing Emails
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <h6>Security</h6>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                checked={accountSettings.twoFactorAuth}
                                                id="twoFactorCheck"
                                            />
                                            <label className="form-check-label" htmlFor="twoFactorCheck">
                                                Enable Two-Factor Authentication
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <h6>Privacy</h6>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                checked={!accountSettings.privacyPreferences.personalizedAds}
                                                id="personalizedAdsCheck"
                                            />
                                            <label className="form-check-label" htmlFor="personalizedAdsCheck">
                                                Opt-out of Personalized Ads
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button className="btn btn-primary me-2">Save Changes</button>
                                        <button className="btn btn-outline-danger">Reset to Default</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <Footer />
        </TranslationProvider>
    );
};

export default Profile;
