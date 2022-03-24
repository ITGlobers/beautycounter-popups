import React,{useEffect, useState} from 'react'
import { DatePicker,TimePicker} from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import '../css/styles.css'
import StepBar from './StepBar'
import { usePopups } from './context/PopupContext'
const CSS_HANDLES = [
    'btnGroups',
    'btnBlock',
    'btnTransparent',
    'TopButtonBorder',
    'stepWrapper',
    'stepTitle',
    'btnPrimaeyButton',
    'step_date_container',
    'step_input_block',
    'stepTitleBar'

] as const

const Step4 = () => {
    const [step4Data,setStep4Data] = useState({date:new Date(),time:null})
    const { handleInputChange,dataStep,setDataStep} = usePopups()
    const handles = useCssHandles(CSS_HANDLES)
 console.log('step4Data=>', step4Data)

    const handleChange = (date:any) => {
        setStep4Data({...step4Data,date})
    }
    const handleChangeTime = (time:any) => {
        setStep4Data({...step4Data,time})
    }
    useEffect(() => {
        setDataStep({...dataStep,date:step4Data}) 
       }, [step4Data])
    return (
        <>
        <div className={handles.stepTitleBar}>Create a Pop-Up</div>
        <StepBar/>
        <div className={handles.stepWrapper}>
        <h2 className={handles.stepTitle}>4. When will this Pop-up take place?</h2>
           <div className={handles.step_date_container}>
           <div className="mb5">
             <DatePicker
            label="Date"
            value={step4Data.date}
            onChange={handleChange}
            locale="en-US"
          />
          </div>
          <div className="mb5">
                <TimePicker
                label="Select a Time"
                placeholder="Select a Time"
                size="large"
                value={step4Data.time}
                onChange={handleChangeTime}
                locale="en-US"
                />
            </div>
            </div>
           
           
        <div className={handles.btnGroups}>
           <button className={`${handles.btnPrimaeyButton} ${handles.TopButtonBorder}`} onClick={() => handleInputChange('step3')}>Back </button>
           <button className={handles.btnPrimaeyButton} onClick={() => handleInputChange('step5')}>Continue</button>
        </div>
        <div className={handles.btnBlock}>
          <button className={`${handles.btnPrimaeyButton} ${handles.btnTransparent}`} onClick={() => handleInputChange('homeTab')}>Cancel</button>
        </div>
        </div> 
        
            
        </>

    )
}

export default Step4