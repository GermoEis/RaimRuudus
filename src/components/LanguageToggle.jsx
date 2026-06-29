import { languageLabels, supportedLanguages } from '../data/language.js';

function LanguageToggle({ lang = 'et', onLanguageChange, className = '' }) {
  const aria = lang === 'en' ? 'Language selection' : 'Keele valik';
  const prefix = lang === 'en' ? 'Change language: ' : 'Vaheta keel: ';

  return (
    <div className={`language-toggle ${className}`} role="group" aria-label={aria}>
      {supportedLanguages.map((language) => (
        <button
          type="button"
          className={language === lang ? 'active' : undefined}
          aria-pressed={language === lang}
          aria-label={`${prefix}${languageLabels[language]}`}
          onClick={() => onLanguageChange?.(language)}
          key={language}
        >
          {languageLabels[language]}
        </button>
      ))}
    </div>
  );
}

export default LanguageToggle;
