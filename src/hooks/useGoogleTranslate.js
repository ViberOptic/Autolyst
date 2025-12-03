// src/hooks/useGoogleTranslate.js
import { useEffect, useState, useCallback } from 'react';

export function useGoogleTranslate() {
  const [currentLang, setCurrentLang] = useState('id');

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'id',
          includedLanguages: 'id,en,ja,ko,zh-CN',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
      }
    };

    const scriptId = 'google-translate-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    if (match && match[2]) {
      const lang = match[2].split('/')[2];
      if (lang) setCurrentLang(lang);
    }

    const observer = new MutationObserver(() => {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.setProperty('top', '0px', 'important');
        document.body.style.setProperty('position', 'static', 'important');
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

  const changeLanguage = useCallback((langCode) => {
    const domain = window.location.hostname;
    
    document.cookie = `googtrans=;path=/;domain=${domain};expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    document.cookie = `googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    
    const value = `/auto/${langCode}`;
    document.cookie = `googtrans=${value};path=/;domain=${domain}`;
    document.cookie = `googtrans=${value};path=/;`;

    setCurrentLang(langCode);
    
    window.location.reload();
  }, []);

  return { currentLang, changeLanguage };
}