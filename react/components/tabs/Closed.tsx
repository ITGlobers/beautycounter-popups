import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import '../../css/styles.css'
const CSS_HANDLES = [
    'tab_content_empty'

] as const
const ClosedTab = () => {
    const handles = useCssHandles(CSS_HANDLES)
    return (
        <>
          <p className={handles.tab_content_empty}>
          Closed.
        </p>
        </>

    )
}

export default ClosedTab