import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { usePopups } from './context/PopupContext'
import '../css/styles.css'

const CSS_HANDLES = [
  'stepBar',
  'stepBar_steps', 
  'stepBar_step', 
  'stepBar_step_active',  
  'stepBar_step_icon', 
  'stepBar_step_title',
  'stepBar_step_icon_process'

] as const
 
const StepBar = () => {
  const { arraySteps,currentStep} = usePopups()
  const handles = useCssHandles(CSS_HANDLES)


    return (
      <> 
        <div className={handles.stepBar} >
          <ul className={handles.stepBar_steps}>

            <li className={`${handles.stepBar_step} ${arraySteps.includes(1) && handles.stepBar_step_active}`}>
           
              <i className={`${handles.stepBar_step_icon} ${currentStep =='step1' && handles.stepBar_step_icon_process}`}></i>
              <span className={handles.stepBar_step_title}>HOST</span>
            </li>

            <li className={`${handles.stepBar_step} ${arraySteps.includes(2) && handles.stepBar_step_active}`}>
               <i className={`${handles.stepBar_step_icon} ${currentStep =='step2' && handles.stepBar_step_icon_process}`}></i>
              <span className={handles.stepBar_step_title}>LOCATION</span>
            </li>

            <li className={`${handles.stepBar_step} ${arraySteps.includes(3) && handles.stepBar_step_active}`}>
            <i className={`${handles.stepBar_step_icon} ${currentStep =='step3' && handles.stepBar_step_icon_process}`}></i>
              <span className={handles.stepBar_step_title}>NAME</span>
            </li>

            <li className={`${handles.stepBar_step} ${arraySteps.includes(4) && handles.stepBar_step_active}`}>
            <i className={`${handles.stepBar_step_icon} ${currentStep =='step4' && handles.stepBar_step_icon_process}`}></i>
              <span className={handles.stepBar_step_title}>DATE</span>
            </li>

            <li className={`${handles.stepBar_step} ${arraySteps.includes(5) && handles.stepBar_step_active}`}>
            <i className={`${handles.stepBar_step_icon} ${currentStep =='step5' && handles.stepBar_step_icon_process}`}></i>
              <span className={handles.stepBar_step_title}>SHIPING</span>
            </li>
          </ul>
        </div> 
      </>

    )
}

export default StepBar