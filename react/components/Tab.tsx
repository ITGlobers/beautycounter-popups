import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { usePopups } from './context/PopupContext'
import  OpenTab  from './tabs/Open'
import  FutureTab  from './tabs/Future'
import  ClosedTab  from './tabs/Closed'
import  ViewTab  from './tabs/Viewall'


import '../css/styles.css'
const CSS_HANDLES = [
    'wrapper',
    'top_btns',
    'TopButtonTab',
    'tab_container',
    'tab_btns',
    'tab_item',
    'tab_btn',
    'tab_btn_active',
    'tab_item_last',
    'tab_content',
    'tab_content_empty',
    'tab_table', 

] as const
  
const TabPopup = () => {
    const { handleInputChange} = usePopups()
    const handles = useCssHandles(CSS_HANDLES)
    const [componentDisplay,setComponentDisplay] = useState(<OpenTab/>)
    const [activeTab,setActiveTab] = useState('open')
    console.log(setComponentDisplay)
    const handleTabChange = (activeName:any) => {
        setActiveTab(activeName)
       if(activeName == 'open'){
        setComponentDisplay(<OpenTab/>)
       }
       if(activeName == 'future'){
        setComponentDisplay(<FutureTab/>)
       }
       if(activeName == 'closed'){
        setComponentDisplay(<ClosedTab/>)
       }
       if(activeName == 'viewall'){
        setComponentDisplay(<ViewTab/>)
       }
    }
    return (
        <>
                
            <div className={handles.wrapper}>
                <div className={handles.top_btns}>
                    <button className={handles.TopButtonTab} onClick={() => handleInputChange('step1')}>Create a Pop-Up</button>
                </div>
                
            
                <div className={handles.tab_container}> 
                    
                    <ul className={handles.tab_btns}>
                        <li className={handles.tab_item}>
                            <button className={`${handles.tab_btn} ${activeTab == 'open' && handles.tab_btn_active}`} onClick={() => handleTabChange('open')}>OPEN</button>
                        </li>
                        <li className={handles.tab_item}>
                            <button className={`${handles.tab_btn} ${activeTab == 'future' && handles.tab_btn_active}`} onClick={() => handleTabChange('future')}>FUTURE</button>
                        </li>
                        <li className={handles.tab_item}>
                            <button className={`${handles.tab_btn} ${activeTab == 'closed' && handles.tab_btn_active}`} onClick={() => handleTabChange('closed')}>CLOSED</button>
                        </li>
                        <li className={handles.tab_item}>
                            <button className={`${handles.tab_btn} ${activeTab == 'viewall' && handles.tab_btn_active}`} onClick={() => handleTabChange('viewall')}>VIEW ALL</button>
                        </li>

                        <li className= {`${handles.tab_item} ${handles.tab_item_last}`}>
                            <button className={`${handles.tab_btn} ${activeTab == 'future' && handles.tab_btn_active}`}> EXPORT </button>
                        </li>

                    </ul>

                    <div className={handles.tab_content}>
                        {componentDisplay}
                    </div>
                </div>   

            </div>
           
            
        </>

    )
}

export default TabPopup