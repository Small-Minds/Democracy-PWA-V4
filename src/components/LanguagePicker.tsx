import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Panel, Dropdown, ButtonToolbar, Navbar, Icon } from 'rsuite';
export default function LanguagePicker() {
  //Set Up translation hook
  const [t, i18n] = useTranslation();
  const [language, setLanguage] = useState<string | undefined>();
  const languageCollection = [
    { label: t('languagePicker.en'), value: 'en' },
    { label: t('languagePicker.fr'), value: 'fr' },
    { label: t('languagePicker.cn'), value: 'cn' },
  ];

  // TODO: This logic should probably be moved up, into a provider, to prevent
  // a flash of English text when the page is first reloaded.
  useEffect(() => {
    if (!language || language === '') {
      const storedLang = localStorage.getItem('language');
      if (storedLang) setLanguage(storedLang);
    } else {
      i18n.changeLanguage(language || 'en');
      localStorage.setItem('language', language);
    }
  }, [language, setLanguage]);

  return (
    <div>
      <div>
        <Dropdown
          size="lg"
          icon={<Icon icon="globe2" />}
          title={t(`languagePicker.${language || 'en'}`)}
          activeKey={language || 'en'}
          onSelect={(key) => setLanguage(key)}
        >
          {languageCollection.map((lang, key) => (
            <Dropdown.Item key={key} eventKey={lang.value}>
              {lang.label}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <br />
    </div>
  );
}
