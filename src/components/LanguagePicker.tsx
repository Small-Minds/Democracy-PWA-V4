import React from 'react'
import { useTranslation } from 'react-i18next';
import { Panel, SelectPicker } from 'rsuite';
export default function LanguagePicker() {
    //Set Up translation hook
    const [t,i18n] = useTranslation();
    const languageCollection = [{"label": t("languagePicker.en"), "value":"en"},
                                {"label": t("languagePicker.fr"), "value":"fr"},
                                {"label": t("languagePicker.cn"), "value":"cn"}];

    function toggleLanguage (language:string){
        i18n.changeLanguage(language);
    }

    return (
        <div>
            <Panel header={<h3>{t("languagePicker.title")}</h3>} bordered>
                <SelectPicker data={languageCollection} onChange={(language:string) => toggleLanguage(language)}/>
            </Panel>    
        </div>
    )
}
