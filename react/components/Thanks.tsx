import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import '../css/styles.css'
import { usePopups } from './context/PopupContext'
const CSS_HANDLES = [ 
    'thanks',
    'thanks_icon',
    'thanks_message',
    'thanks_btn_get',
    'thanks_btn_back',


] as const
const ThanksPopup = () => {
    const handles = useCssHandles(CSS_HANDLES)
    const { handleInputChange} = usePopups()
    return (
        <>
            <div className={handles.thanks}>
                <i className={handles.thanks_icon}></i>

                <p className={handles.thanks_message}>You have successfully created a Pop-up</p>

                <button className={handles.thanks_btn_get}>Get Shareable link</button>

                <br />

                <button className={`${handles.thanks_btn_back}`} onClick={() => handleInputChange('homeTab')}>Back to My Pop-ups</button>
            </div>
        </>

    )
}

export default ThanksPopup