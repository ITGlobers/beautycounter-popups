import React, { ReactNode,createContext, useContext, useState } from 'react'
import TabPopup from '../Tab'
import Step1 from '../Step1'
import Step2 from '../Step2'
import Step3 from '../Step3'
import Step4 from '../Step4'
import Step5 from '../Step5'
import Preview from '../Preview'
import ThanksPopup from '../Thanks'

type PContextProps = {
    currentStep?: any,
    setCurrentStep?:any,
    setComponenteName?:ReactNode,
    componenteName?:ReactNode,
    handleInputChange : any,
    arraySteps: any,
    stepProgress:any,
    dataStep:any,
    setDataStep:any
}

export const PopupContext = createContext({} as PContextProps)

const PopupProvider = ({ children }:any) => {
    const [currentStep, setCurrentStep] = useState('step1')
    const [arraySteps, setArraySteps]:any = useState([])
    const [stepProgress, setStepProgress]:any = useState(true)
    const [componenteName, setComponenteName] = useState(<TabPopup />)
    const [dataStep, setDataStep]:any = useState({})
   
    console.log('dataGeneral=> ', dataStep)
    const handleInputChange = (stepName: any) =>{
        if(stepName == 'step1'){
            setCurrentStep('step1')
            setComponenteName(<Step1/>)
            setArraySteps([...arraySteps,1])
            setStepProgress(!true)
            
        }
        if(stepName == 'step2'){
            setCurrentStep('step2')
            setComponenteName(<Step2/>)
            setArraySteps([...arraySteps,2])
            setStepProgress(!true)
        }
        if(stepName == 'step3'){
            setCurrentStep('step3')
            setComponenteName(<Step3/>)
            setArraySteps([...arraySteps,3])
            setStepProgress(!true)
        }
        if(stepName == 'step4'){
            setCurrentStep('step4')
            setComponenteName(<Step4/>)
            setArraySteps([...arraySteps,4])
            setStepProgress(!true)
        }
        if(stepName == 'step5'){
            setCurrentStep('step5')
            setComponenteName(<Step5/>)
            setArraySteps([...arraySteps,5])
            setStepProgress(!true)
        }
        if(stepName == 'preview'){
            setComponenteName(<Preview/>)
        }
        if(stepName == 'homeTab'){
            setComponenteName(<TabPopup/>)
            setArraySteps([])
            setCurrentStep('step1')
        }
        if(stepName == 'thanks'){
            setComponenteName(<ThanksPopup/>)
            setArraySteps([])
            setCurrentStep('thanks')
        }
    }
    return (
            <PopupContext.Provider value={{ currentStep, setCurrentStep, componenteName,setComponenteName,handleInputChange,arraySteps,stepProgress,setDataStep,dataStep }}>
                {children}
            </PopupContext.Provider>
    )
}
const usePopups = (): PContextProps => {
    const context = useContext(PopupContext)

    if (!context) {
        throw new Error('error PopupProvider')
    }

    return context
}
export { PopupProvider, usePopups }