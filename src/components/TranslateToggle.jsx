import React from 'react';
import { FaLanguage, FaSpinner, FaTimes } from 'react-icons/fa';
import { useTranslation } from '../context/TranslationContext';
import './TranslateToggle.css';

const TranslateToggle = () => {
  const { 
    openLanguagePopup, 
    closeLanguagePopup,
    isPopupOpen, 
    changeLanguage, 
    currentLanguage, 
    isTranslating 
  } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  ];

  return (
    <div className="translate-toggle-container">
      <button 
        onClick={openLanguagePopup} 
        className="translate-toggle-btn"
        aria-label="Open Language Selection"
        disabled={isTranslating}
      >
        {isTranslating ? <FaSpinner className="spinner" /> : <FaLanguage />}
      </button>

      {isPopupOpen && (
        <div className="language-popup">
          <div className="language-popup-content">
            <div className="language-popup-header">
              <h3>Select Language</h3>
              <button 
                className="language-popup-close" 
                onClick={closeLanguagePopup}
                aria-label="Close Language Selection"
              >
                <FaTimes />
              </button>
            </div>
            <div className="language-list">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`language-option ${currentLanguage === lang.code ? 'active' : ''} ${isTranslating ? 'disabled' : ''}`}
                  disabled={isTranslating}
                >
                  <span className="language-flag">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslateToggle;
