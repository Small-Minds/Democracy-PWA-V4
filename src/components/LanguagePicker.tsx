import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Panel, Dropdown, ButtonToolbar, Navbar, Icon } from 'rsuite';

export default function LanguagePicker() {
  //Set Up translation hook
  const [t, i18n] = useTranslation();
  // Every language must have an object listed here.
  const languageCollection = [
    { label: t('languagePicker.en'), value: 'en' },
    { label: t('languagePicker.fr'), value: 'fr' },
    { label: t('languagePicker.cn'), value: 'cn' },
  ];

  const languageArr = i18n.language.split('-');
  const languageKey = languageArr.length >= 1 ? languageArr[0] : i18n.language;

  return (
    <Fragment>
      <Dropdown
        icon={<Icon icon="globe" />}
        title={t(`languagePicker.${languageKey.toLowerCase() || 'en'}`)}
        onSelect={(key) => i18n.changeLanguage(key)}
        placement="bottomEnd"
      >
        {languageCollection.map((lang, key) => (
          <Dropdown.Item key={key} eventKey={lang.value}>
            {lang.label}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </Fragment>
  );
}
