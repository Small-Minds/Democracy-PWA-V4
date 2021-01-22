import React from 'react'
import { Panel, SelectPicker } from 'rsuite';
export default function LanguagePicker() {
    const languageCollection = [{"label": "English", "value":"en"},{"label": "French", "value":"fr"},{"label": "Chinese", "value":"cn"}]
    return (
        <div>
            <Panel header={<h2>Language Selection</h2>} bordered>
                <SelectPicker data={languageCollection} onChange={(value:string) => console.log(value)}/>
            </Panel>    
        </div>
    )
}
