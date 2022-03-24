import React from 'react'

import  {PopupProvider}  from './context/PopupContext'
import HomePopupContent  from './HomePagePopup'

const HomePopup = () => {
    return (
        <>
         <PopupProvider>
           <HomePopupContent />
         </PopupProvider>
        </>

    )
}

export default HomePopup