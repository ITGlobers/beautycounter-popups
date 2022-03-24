import React,{useContext} from 'react'

import '../css/styles.css'
import {PopupContext } from './context/PopupContext'
/* import TabPopup from './Tab' */
/* import TabPopup from './Tab' */

const HomePopupContent = () => {
  
    const {componenteName,currentStep} = useContext(PopupContext)


/*     const [componentsCurrent, setComponentsCurrent]:any = useState(null) */

console.log('currentStep', currentStep)

    return (
        <>
       {componenteName}
        </>

    )
}

export default HomePopupContent