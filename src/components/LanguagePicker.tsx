import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Panel, Dropdown, ButtonToolbar, Navbar } from 'rsuite';
export default function LanguagePicker() {
  //Set Up translation hook
  const [t, i18n] = useTranslation();
  const [language, setLanguage] = useState<string | undefined>();
  const languageCollection = [
    { label: t('languagePicker.en'), value: 'en' },
    { label: t('languagePicker.fr'), value: 'fr' },
    { label: t('languagePicker.cn'), value: 'cn' },
  ];

  useEffect(() => {
    i18n.changeLanguage(language || 'en');
  }, [language, setLanguage]);

  return (
    <div>
      <div>
        <Dropdown
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
