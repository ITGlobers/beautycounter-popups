import React,{useEffect} from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Spinner } from 'vtex.styleguide'
import GET_SESSION from '../graphql/getSession.gql'
import { useMutation,useLazyQuery } from 'react-apollo'
import '../css/styles.css'
import createDocument from '../graphql/mutation.createDocument.gql'
import { usePopups } from './context/PopupContext'
const CSS_HANDLES = [
    'btnGroups',
    'btnTransparent',
    'TopButtonBorder',
    'btnPrimaeyButton',
    'stepWrapper_Preview',
    'step_preview_boxes',
    "preview_title",
    "preview_boxes",
    "preview_boxes_status",
    "preview_btn_edit",
    "preview_check_action",
    "rc_input_style",
    "checkboxs",


] as const

const Preview = () => {
    const { handleInputChange,dataStep} = usePopups()
    const handles = useCssHandles(CSS_HANDLES)
    const [CreateDocument, { loading: addItemLoading }] = useMutation(createDocument)
    let email:any = null
    const [getProfile, { data }] = useLazyQuery(GET_SESSION, {
        fetchPolicy: 'cache-and-network',
    })
    useEffect(() => {
        getProfile()
    }, [])
    if(data) {
      if (data.getSession.profile) {
          email = data.getSession.profile.email
      }
  }
    const saveEventItem = async () => {
        console.log('save item')
        if (dataStep) {
            console.log('save item dataStep')
          await CreateDocument({
            variables: {
              acronym: 'EP',
              document: {
                fields: [
                  {
                    key: 'popupvisible',
                    value: 'false',
                  },
                  {
                    key: 'host',
                    value: dataStep?.host?.host,
                  },
                  {
                    key: 'location',
                    value: dataStep?.location,
                  },
                  {
                    key: 'name',
                    value: dataStep?.name?.name,
                  },
                  {
                    key: 'datepopup',
                    value: new Date(),
                  },
                  {
                    key: 'timepopup',
                    value: 'test time',
                  },
                  {
                    key: 'shipping',
                    value: dataStep?.shipping?.shipping,
                  },
                  {
                    key: 'owner',
                    value: email,
                  }

                ],
              },
            },
          })
          handleInputChange('thanks')
      }
    }
    if (addItemLoading) {
        return <Spinner />
    }
    return (
        <>


            <div className={`${handles.stepWrapper_Preview} ${handles.rc_input_style} ${handles.checkboxs}`}>

           <div className={handles.step_preview_boxes}>

                <div className={handles.preview_title}>
                    <h2>CREATE A POP-UP</h2>
                </div>

                <div className={handles.preview_boxes}>
                    <div>
                        <sup>
                            <h3> <i className={handles.preview_boxes_status}></i> Who is the Host?</h3>

                            <button className={handles.preview_btn_edit} onClick={() => handleInputChange('step1')}>Edit</button>
                        </sup>
                        <p> {dataStep.host.host} </p>
                    </div>

                    <div>
                        <sup>
                            <h3> <i className={handles.preview_boxes_status}></i>
                                What would you like to name this Pop-up?
                            </h3>

                            <button className={handles.preview_btn_edit} onClick={() => handleInputChange('step3')}>Edit</button>
                        </sup>

                        <p> {dataStep.name.name} </p>
                    </div>

                    <div>
                        <sup>
                            <h3> <i className={handles.preview_boxes_status}></i>
                                Where is this Pop-up located?
                            </h3>

                            <button className={handles.preview_btn_edit} onClick={() => handleInputChange('step2')}>Edit</button>
                        </sup>

                        <p> {dataStep.location} </p>
                    </div>

                    <div>
                        <sup>
                            <h3> <i className={handles.preview_boxes_status}></i>
                                When will this Pop-up take place?
                            </h3>

                            <button className={handles.preview_btn_edit} onClick={() => handleInputChange('step4')}>Edit</button>
                        </sup>

                        <p> Starts: 3/16/2022</p>
                        <p> Ends: 3/25/2022 </p>
                    </div>

                    <div>
                        <sup>
                            <h3> <i className={handles.preview_boxes_status}></i>
                                Ship to Pop-up set up
                            </h3>

                            <button className={handles.preview_btn_edit} onClick={() => handleInputChange('step5')}>Edit</button>
                        </sup>

                        <p> 855 High Street, Bowling Green, OH, 43402 </p>

                        <strong>Shipping method</strong>
                        <p> {dataStep.shipping.shipping}</p>
                    </div>

                    </div>

                    <div className={handles.preview_check_action}>

                        <input type="checkbox" name="" id="test" required />
                        <label htmlFor="test">Make my Pop-up visible on my Beautycounter Personal Website</label>


                   </div>

                <div className={handles.btnGroups}>
                    <button className={`${handles.btnPrimaeyButton} ${handles.TopButtonBorder}`} onClick={() => handleInputChange('homeTab')}>Cancel </button>
                    <button className={handles.btnPrimaeyButton} onClick={() => saveEventItem()}>Confirm</button>
                </div>

            </div>
        </div>
        </>

    )
}

export default Preview
