import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Panel, Dropdown, ButtonToolbar, Navbar, Icon } from 'rsuite';
export default function LanguagePicker() {
  //Set Up translation hook
  const [t, i18n] = useTranslation();
  const languageCollection = [
    { label: t('languagePicker.en'), value: 'en' },
    { label: t('languagePicker.fr'), value: 'fr' },
    { label: t('languagePicker.cn'), value: 'cn' },
  ];

  return (
    <div>
      <div>
        <Dropdown
          size="lg"
          icon={<Icon icon="globe2" />}
          title={t(`languagePicker.${i18n.language || 'en'}`)}
          activeKey={i18n.language || 'en'}
          onSelect={(key) => i18n.changeLanguage(key)}
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