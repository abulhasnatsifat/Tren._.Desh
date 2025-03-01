import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

class TranslationService {
  static async translateText(text, targetLanguage, sourceLanguage = 'auto') {
    try {
      // Use a free translation API (Note: Replace with your preferred translation service)
      const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
        params: {
          client: 'gtx',
          sl: sourceLanguage,
          tl: targetLanguage,
          dt: 't',
          q: text
        }
      });

      // Extract translated text from Google Translate's response format
      const translatedText = response.data[0][0][0];
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text if translation fails
    }
  }

  static async translatePage(targetLanguage) {
    // Select all translatable elements
    const elementsToTranslate = document.querySelectorAll('[data-translate], [data-translate-placeholder], [data-translate-aria-label]');
    
    for (const element of elementsToTranslate) {
      try {
        // Determine the translation key and attribute type
        let key, originalText, attributeType;
        
        if (element.hasAttribute('data-translate')) {
          key = element.getAttribute('data-translate');
          originalText = element.textContent;
          attributeType = 'textContent';
        } else if (element.hasAttribute('data-translate-placeholder')) {
          key = element.getAttribute('data-translate-placeholder');
          originalText = element.getAttribute('placeholder');
          attributeType = 'placeholder';
        } else if (element.hasAttribute('data-translate-aria-label')) {


          // eslint-disable-next-line no-unused-vars
          key = element.getAttribute('data-translate-aria-label');
          originalText = element.getAttribute('aria-label');
          attributeType = 'aria-label';
        }

        // Translate the text
        const translatedText = await this.translateText(originalText, targetLanguage);

        // Update the element with translated text
        if (attributeType === 'textContent') {
          element.textContent = translatedText;
        } else {
          element.setAttribute(attributeType, translatedText);
        }
      } catch (error) {
        console.error('Error translating element:', error);
      }
    }
  }
}

// Comprehensive translation dictionary

// Create a context for translation
const TranslationContext = createContext();

// Translation Provider Component
export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  // Function to change language with automatic translation
  const changeLanguage = async (lang) => {
    setIsTranslating(true);
    try {
      // Translate the entire page
      await TranslationService.translatePage(lang);
      
      // Update language state
      setCurrentLanguage(lang);
      setIsPopupOpen(false);
      
      // Persist language choice
      localStorage.setItem('appLanguage', lang);
    } catch (error) {
      console.error('Language change error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Function to translate a specific text
  const translate = async (text, targetLanguage = currentLanguage) => {
    return await TranslationService.translateText(text, targetLanguage);
  };

  // Open language selection popup
  const openLanguagePopup = () => {
    setIsPopupOpen(true);
  };

  // Close language selection popup
  const closeLanguagePopup = () => {
    setIsPopupOpen(false);
  };

  // Load saved language on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      translate,
      changeLanguage,
      openLanguagePopup,
      closeLanguagePopup,
      isPopupOpen,
      isTranslating
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook for using translation
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
