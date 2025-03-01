import React, { useState } from 'react';
import { FaHeadset, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './CustomerSupportToggle.css';

const CustomerSupportToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual message sending logic
    if (message.trim()) {
      alert('Message sent! Our support team will get back to you soon.');
      setMessage('');
      setIsOpen(false);
    }
  };

  return (
    <div className="customer-support-toggle">
      {!isOpen && (
        <button 
          onClick={togglePopup} 
          className="support-button"
          aria-label="Open Customer Support"
        >
          <FaHeadset size={24} />
        </button>
      )}

      {isOpen && (
        <div className="support-popup">
          <div className="popup-header">
            <h3>Customer Support</h3>
            <button 
              onClick={togglePopup} 
              className="close-button"
              aria-label="Close Support Popup"
            >
              <FaTimes />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="support-form">
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="How can we help you today?"
              rows={4}
              required
            />
            <button type="submit" className="send-button">
              <FaPaperPlane /> Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomerSupportToggle;
