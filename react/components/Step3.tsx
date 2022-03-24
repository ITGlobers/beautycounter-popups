import React,{useState,useEffect} from 'react'
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
    'step_input_block',
    'stepTitleBar'

] as const

const Step3 = () => {
    
    const [step3Data, setStep3Data]:any = useState({name:""})
    const { handleInputChange,dataStep,setDataStep} = usePopups()

    const handles = useCssHandles(CSS_HANDLES)

    const onChangeText = ({ target: { value, name } }:any) => setStep3Data({ ...step3Data, [name]: value })
    useEffect(() => {
      if(dataStep.hasOwnProperty('name')){
        setStep3Data({...dataStep,name:dataStep.name.name})
        console.log("edit ", dataStep)
      }
    }, [])
    useEffect(() => {
      
      setDataStep({...dataStep,name:step3Data}) 
     }, [step3Data])
    return (
        <>
        <div className={handles.stepTitleBar}>Create a Pop-Up</div>
        <StepBar/>
        <div className={handles.stepWrapper}>
        <h2 className={handles.stepTitle}>3. What would you like to name this Pop-up?</h2>
           <div className={handles.step_input_block}>
             <span>Name</span>
             <input type="text" id="op1" name="name" value={step3Data.name}  onChange={onChangeText}/>
            </div>
           
           
        <div className={handles.btnGroups}>
           <button className={`${handles.btnPrimaeyButton} ${handles.TopButtonBorder}`} onClick={() => handleInputChange('step2')}>Back </button>
           <button className={handles.btnPrimaeyButton} onClick={() => handleInputChange('step4')}>Continue</button>
        </div>
        <div className={handles.btnBlock}>
          <button className={`${handles.btnPrimaeyButton} ${handles.btnTransparent}`} onClick={() => handleInputChange('homeTab')}>Cancel</button>
        </div>
        </div> 
        
            
        </>

    )
}

export default Step3