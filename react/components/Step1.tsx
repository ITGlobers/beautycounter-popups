import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Modal, Input, Dropdown, Button } from 'vtex.styleguide'
import { useMutation, useLazyQuery, useApolloClient } from 'react-apollo'
import GET_SESSION from '../graphql/getSession.gql'
import getDocuments from '../graphql/query.getDocuments.gql'
import createDocument from '../graphql/mutation.createDocument.gql'
import '../css/styles.css'
import StepBar from './StepBar'
import { usePopups } from './context/PopupContext'
const CSS_HANDLES = [
  'stepWrapper2',
  'stepTitle',
  'btnBlock',
  'btnPrimaeyButton',
  'btnTransparent',
  'content_search',
  'step_input_block',
  'stepTitleBar',
  'rc_input_style',
  'content_search_box',
  'content_search_box2',
  'span_text',
  'customer_add_pop',
  'customer_search_total',
  'no_options',
  'btnPrimaeyButton_add',
  'btnPrimaeyButton_actions',
  'btnPrimaeyButton_actions_primary'

] as const

/* interface Props{
    children:any,
}
 */
const Step1 = () => {
  const listStates = [
    { value: 'USA', label: 'USA' },
    { value: 'CANADA', label: 'CANADA' }
  ]
  const [hostform, setHostform]: any = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    state: ''
  })
  const [customersList, setCustomersList]: any = useState([])
  const [searchInput, setSearchInput]: any = useState('')
  const [step1Data, setStep1Data]: any = useState({ customer: 'SEARCH BY NAME OR EMAIL' })
  const [displaySelectLocated, setDisplaySelectLocated]: any = useState(false)
  const [stateModalCustomer, setStateModalCustomer]: any = useState(false)
  const { handleInputChange, dataStep, setDataStep } = usePopups()
  const apolloClient = useApolloClient()
  /*    const [optionSelected, setOptionSelected] = useState(initialState) */
  const handles = useCssHandles(CSS_HANDLES)
  /*   const [isOpen, setIsOpen] = useState(false)
   */
  let email: any = null
  const [getProfile, { data }] = useLazyQuery(GET_SESSION, {
    fetchPolicy: 'cache-and-network',
  })
  if (data) {
    if (data.getSession.profile) {
      email = data.getSession.profile.email
    }
  }
  useEffect(() => {
    getProfile()
  }, [])
  useEffect(() => {
    const getEventsListCustomers = async () => {
     console.log('traendo clientes')
      try {

        const { data: { documents }, }: any = await apolloClient.query({
          query: getDocuments,
          fetchPolicy: 'network-only',
          variables: {
            acronym: 'AH',
            fields: ['firstName','lastName', 'phone'],
            where: `owner=${email}`
          }
        })
        setCustomersList(documents)
        console.log('documents customers=> ', documents)
      } catch (error) {
        console.log('error ', error)

      }
    }
    setTimeout(function () {
      getEventsListCustomers()
    }, 1000);
  }, [])
  console.log(setCustomersList)
  const [CreateDocument] = useMutation(createDocument)
  const onChangeForm = ({ target: { value, name } }: any) => setHostform({ ...hostform, [name]: value })
  console.log(setSearchInput)
  const onChangeData = ({ target: { value, name } }: any) => {
    setStep1Data({ ...step1Data, [name]: value })
  }
  const handleCustomerModalToggle = () => {
    setStateModalCustomer((modalActive: any) => !modalActive)
  }
  const changeSelectedCustomer = () => {
    setDisplaySelectLocated(true)
  }
  const customerChange = (customer: any) => {
    setSearchInput(customer)
    setStep1Data({ ...step1Data, customer: customer })
    setDisplaySelectLocated(false)
  }

  const saveCustomers = async () => {
    console.log('form ', hostform)
    if (hostform) {
      await CreateDocument({
        variables: {
          acronym: 'AH',
          document: {
            fields: [
              {
                key: 'email',
                value: hostform.email,
              },
              {
                key: 'firstName',
                value: hostform.name,
              },
              {
                key: 'lastName',
                value: hostform.lastname,
              },
              {
                key: 'phoneNumber',
                value: hostform.phone,
              },
              {
                key: 'state',
                value: hostform.state,
              },
              {
                key: 'owner',
                value: email,
              }
            ],
          },
        },
      })
      setStateModalCustomer(false)
    }
  }
  console.log('email step 1=> ', email)
  useEffect(() => {
    setDataStep({ ...dataStep, host: step1Data })
  }, [step1Data])
  return (
    <>
      <div className={handles.stepTitleBar}>Create a Pop-Up</div>
      <StepBar />



      <div className={`${handles.stepWrapper2} ${handles.rc_input_style}`}>

        <h2 className={handles.stepTitle}>1. Who is the Host?</h2>

        <div className={handles.step_input_block}>
          <input type="radio" id="op1" name="host" value="Me" checked={step1Data.host === "Me"} onChange={onChangeData} />
          <label htmlFor="op1">Me</label>
        </div>
        <div className={handles.step_input_block}>
          <input type="radio" id="op2" name="host" value="Someone else is hosting this Pop-up" checked={step1Data.host === "Someone else is hosting this Pop-up"} onChange={onChangeData} />
          <label htmlFor="op2">Someone else is hosting this Pop-up</label>
        </div>
        {step1Data.host === "Someone else is hosting this Pop-up" && (
          <div className={handles.content_search}>
            <span><input name="searchcustomer" type="text" placeholder='SEARCH BY NAME OR EMAIL' value={searchInput} onFocus={changeSelectedCustomer} onChange={changeSelectedCustomer} /></span>
            {displaySelectLocated && (
              <div className={`${handles.content_search_box} ${handles.content_search_box2}`}>
                {customersList.length == 0 ? <>
                <span className={handles.customer_search_total}>0 customers that match your search.</span>
                <p className={handles.no_options}>No options</p></> :
                  <ul>
                    {customersList.map((item: any, i: any) => (
                      <li key={i} onClick={() => customerChange(`${item.fields[0].value} ${item.fields[1].value}`)}>{item.fields[0].value} {item.fields[1].value}</li>
                    ))}
                  </ul>
                }
                <div className={handles.customer_add_pop}>
                  <span className={handles.span_text}>Don't see them on your list?</span>
                  <button onClick={() => handleCustomerModalToggle()}>Add New Customer</button>
                </div>

              </div>
            )}
          </div>
        )}
        <div className={handles.btnBlock}>
          <button className={handles.btnPrimaeyButton} onClick={() => handleInputChange('step2')}>Continue </button>
        </div>
        <div className={handles.btnBlock}>
          <button className={`${handles.btnPrimaeyButton} ${handles.btnTransparent}`} onClick={() => handleInputChange('homeTab')}>Cancel</button>
        </div>

      </div>
      <Modal
        centered
        isOpen={stateModalCustomer}
        onClose={handleCustomerModalToggle}>
        <h2 className="flex justify-center mt0 mb6">Add A Host</h2>
        <div className="flex">
          <div className="w-50">
            <div className="mb5 pa3">
              <Input
                placeholder=""
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="First Name"
                value={hostform.name}
                name="name"
                onChange={onChangeForm}
              />
            </div>
            <div className="mb5 pa3">
              <Input
                placeholder=""
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Email"
                value={hostform.email}
                name="email"
                onChange={onChangeForm}
              />
            </div>
            <div className="mb5 pa3">

              <Dropdown
                label="State"
                options={listStates}
                value={hostform.state}
                onChange={(_: any, v: any) => setHostform({ ...hostform, state: v })}
              />
            </div>
          </div>
          <div className="w-50">
            <div className="mb5 pa3">
              <Input
                placeholder=""
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Last Name"
                value={hostform.lastname}
                name="lastname"
                onChange={onChangeForm}
              />
            </div>
            <div className="mb5 pa3">
              <Input
                placeholder=""
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Phone Number"
                value={hostform.phone}
                name="phone"
                onChange={onChangeForm}
              />
            </div>
          </div>

        </div>
        <div className={`mb4 flex justify-end ${handles.btnPrimaeyButton_actions}`}>
          <Button variation="secondary" collapseLeft onClick={() => handleCustomerModalToggle()}>Cancel</Button>
          <div className={`${handles.btnPrimaeyButton_actions_primary}`}>
            <Button variation="primary" collapseRight onClick={() => saveCustomers()}>Add</Button>
          </div>

        </div>

      </Modal>
    </>

  )
}

export default Step1