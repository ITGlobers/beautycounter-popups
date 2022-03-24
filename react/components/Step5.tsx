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
    'step_shipping',
    'step_shipping_block',
    'stepSubTitle',
    'stepWrapper_shipping',
    'step_shipping_block_right',
    'stepTitleBar',
    'rc_input_style'

] as const

const Step5 = () => {
    const [step5Data, setStep5Data]:any = useState({})
    const { handleInputChange,dataStep,setDataStep} = usePopups()

    const handles = useCssHandles(CSS_HANDLES)

    const onChangeData = ({ target: { value, name } }:any) => {
        setStep5Data({ ...step5Data, [name]: value })
      }
      useEffect(() => {
        setDataStep({...dataStep,shipping:step5Data}) 
       }, [step5Data])
    return (
        <>
        <div className={handles.stepTitleBar}>Create a Pop-Up</div>
        <StepBar/>
        <div className={handles.stepWrapper_shipping}>
          <h2 className={handles.stepTitle}>5. Ship to Pop-up set up</h2>
          
          <div className={`${handles.step_shipping} ${handles.rc_input_style}`}>
            
             <div className={handles.step_shipping_block}>
             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, omnis nihil quae repellendus cupiditate asperiores nobis sint temporibus?.</p>
             </div>
             <div className={`${handles.step_shipping_block} ${handles.step_shipping_block_right}`}>
                <div className={handles.step_input_block}>
                <h3 className={handles.stepSubTitle}>Select shipping method:</h3>
                <input type="radio" id="op1" name="shipping" value="Stantandard Shipping" onChange={onChangeData}/>
                <label htmlFor="op1">Stantandard Shipping</label>
                </div>
                <div className={handles.step_input_block}>
                <input type="radio" id="op2" name="shipping" value="Secondy Day" onChange={onChangeData}/>
                <label htmlFor="op2">Secondy Day</label>
                </div>
                <div className={handles.step_input_block}>
                <input type="radio" id="op3" name="shipping" value="Next Day" onChange={onChangeData}/>
                <label htmlFor="op3">Next Day</label>
                </div>
            </div>
            </div>
           
           
        <div className={handles.btnGroups}>
           <button className={`${handles.btnPrimaeyButton} ${handles.TopButtonBorder}`} onClick={() => handleInputChange('step4')}>Back </button>
           <button className={handles.btnPrimaeyButton} onClick={() => handleInputChange('preview')}>Continue</button>
        </div>
        <div className={handles.btnBlock}>
          <button className={`${handles.btnPrimaeyButton} ${handles.btnTransparent}`} onClick={() => handleInputChange('homeTab')}>Cancel</button>
        </div>
        </div> 
        
            
        </>

    )
}

export default Step5