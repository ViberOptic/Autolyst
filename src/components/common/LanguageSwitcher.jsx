// src/components/common/LanguageSwitcher.jsx
import { useState } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { useGoogleTranslate } from '../../hooks/useGoogleTranslate';

const LANGUAGES = [
  { code: 'id', label: 'Indonesia', flag: 'https://flagcdn.com/w40/id.png' },
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/us.png' },
  { code: 'ja', label: '日本語 (Japan)', flag: 'https://flagcdn.com/w40/jp.png' },
  { code: 'ko', label: '한국어 (Korea)', flag: 'https://flagcdn.com/w40/kr.png' },
  { code: 'zh-CN', label: '中文 (China)', flag: 'https://flagcdn.com/w40/cn.png' },
];

export default function LanguageSwitcher({ variant = 'default' }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { currentLang, changeLanguage } = useGoogleTranslate();

  const handleLanguageChange = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  const currentLabel = LANGUAGES.find(l => l.code === currentLang)?.label || 'Indonesia';

  const styles = {
    default: {
      wrapper: "w-full md:w-auto",
      button: "w-full md:w-auto justify-between md:justify-start bg-white md:bg-transparent border md:border-none text-slate-600",
      dropdown: "right-0 left-0 md:left-auto mt-2 w-full md:w-56"
    },
    boxed: {
      wrapper: "w-full",
      button: "w-full justify-between bg-white border text-slate-700",
      dropdown: "right-0 left-0 mt-2 w-full"
    }
  };

  const activeStyle = styles[variant] || styles.default;

  return (
    <div className={`relative ${activeStyle.wrapper}`}>
      <div id="google_translate_element" className="hidden" style={{ display: 'none' }}></div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border-slate-200 hover:bg-slate-50 transition-colors font-medium text-sm ${activeStyle.button}`}
      >
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5" />
          <span className="notranslate">{currentLabel}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={`absolute bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200 max-h-60 overflow-y-auto custom-scrollbar ${activeStyle.dropdown}`}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${
                  currentLang === lang.code ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={lang.flag} alt={lang.label} className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm" />
                  <span className="notranslate">{lang.label}</span>
                </div>
                {currentLang === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}