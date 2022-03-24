import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import '../css/styles.css'
import StepBar from './StepBar'
import { usePopups } from './context/PopupContext'

import { Modal } from 'vtex.styleguide'

import GET_ADRESS from '../graphql/getAddress.gql'
import { useQuery } from 'react-apollo'

const CSS_HANDLES = [
	'btnGroups',
	'btnBlock',
	'btnTransparent',
	'TopButtonBorder',
	'stepWrapper',
	'stepTitle',
	'btnPrimaeyButton',
	'step_input_block',
	'stepTitleBar',
	'content_search',
	'content_search_box',
	'rc_input_style',

	'modal_container',
	'modal_container_title',
	'form_inputs',
	'select_country',
	'select_country__label',
	'form_inputs__item',
	'container_button',
	'container_button_cancel',
	'container_button_add',
	'container_input',
	'container_input_label',
	'select_country_usa',
	'country_img',
	'country_container',
	'country',
	'country_container_open',
	'country_container_close'

] as const

const Step2 = () => {
	const [step2Data, setStep2Data]: any = useState(
		{ address: 'Location Address' }
	)
	const { handleInputChange, dataStep, setDataStep } = usePopups()
	const [displaySelectLocated, setDisplaySelectLocated]: any = useState(false)
	const handles = useCssHandles(CSS_HANDLES)

	// const onChangeData = ({ target: { value, name } }: any) => {

	// 	setStep2Data({ ...step2Data, [name]: value, address: 'Location Address' })
	// 	console.log('asdasd', value, name)
	// 	console.log('asdasd', step2Data);
	// }

	const onChangeData = ({ target: { value, name } }: any) => {

		setStep2Data({ ...step2Data, [name]: value, address: 'Location Address' })
		console.log('adasd', value);
		if (value === "This is on online only Pop-up") {
			console.log('eligio este');
			setDataStep({ ...dataStep, location: value })
		}
	}

	const changeSelectedAddress = () => {
		(displaySelectLocated) ? setDisplaySelectLocated(false) : setDisplaySelectLocated(true)
	}

	const locationChange = (address: any) => {
		console.log('addressaddress', address);
		setStep2Data({ ...step2Data, address: address })
		setDataStep({ ...dataStep, location: address })

		setDisplaySelectLocated(false)
	}

	useEffect(() => {
		console.log('dataStepdataStep', dataStep);
		// setDataStep({ ...dataStep, location: step2Data })
	}, [step2Data])


	const [openModal, setOpenModal] = useState(false)
	const [documentAddress, setDocumentAddress] = useState([])

	const handleModalToggle = () => {
		openModal ? setOpenModal(false) : setOpenModal(true)
	}

	const { data: documentData } = useQuery(GET_ADRESS, {
		variables: {
			fields: [
				"address"
			],
			acronym: "AC"
		}
	}
	)

	useEffect(() => {
		if (documentData) {
			setDocumentAddress(documentData.documents)
		}
	}, [documentData, documentAddress])

	const [openCountry, setOpenCountry] = useState(false)
	const [countrySelected, setCountrySelected] = useState('')


	const [firstname, setFirstName] = useState("")
	const [lastname, setLastName] = useState("")
	const [phone, setPhone] = useState("")
	const [state, setState] = useState("")
	const [country, setCountry] = useState("US")
	const [city, setCity] = useState("")
	const [address, setAddress] = useState("")
	const [addressoption, setAddressoption] = useState("")
	const [zip, setZip] = useState("")

	// Error Send
	const [notSend, setNotSend] = useState("")

	const [data, setData] = useState("")

	const handleSend = async (e: any) => {
		try {
			e.preventDefault();
			if ((firstname && lastname && phone && state) !== "") {
				const url = '/api/dataentities/AC/documents?_schema=uiv1';
				const options: RequestInit = {
					method: 'POST',
					mode: "cors",
					headers: {
						Accept: 'application/vnd.vtex.ds.v10+json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstname: firstname,
						lastname: lastname,
						phone: phone,
						state: state,
						country: country,
						city: city,
						address: address,
						addressoption: addressoption,
						zip: zip
					})
				};

				setNotSend("")
				const res = await fetch(url, options)
				const jsonRes = await res.json()
				setOpenModal(false)
				locationChange(address)
				setData(jsonRes)

			} else {
				setNotSend("Ingrese todos los campos")
			}
			console.log(notSend);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		if (data && (firstname && lastname && phone && state) !== "") {
			console.log('se ha guardado');
			setDataStep({ ...dataStep, location: address })
		}
	}, [data])

	return (
		<>
			<div className={handles.stepTitleBar}>Create a Pop-Up</div>
			<StepBar />
			<div className={`${handles.stepWrapper} ${handles.rc_input_style}`}>
				<h2 className={handles.stepTitle}>2. Where is this Pop-up located?</h2>
				<div className={handles.step_input_block}>
					<input type="radio" id="op1" name="location" value="This is on online only Pop-up" onChange={onChangeData} />
					<label htmlFor="op1">This is on online only Pop-up</label>
				</div>
				<div className={handles.step_input_block}>
					<input type="radio" id="op2" name="location" value="In Person" onChange={onChangeData} />
					<label htmlFor="op2">In Person</label>
				</div>

				{
					step2Data.location === "In Person"
					&&
					(
						<div className={handles.content_search}>
							<div className={handles.content_search_box}>
								<span onClick={() => changeSelectedAddress()}>{step2Data.address}</span>
								{
									displaySelectLocated
									&&
									(
										<>
											<button onClick={handleModalToggle}>
												+ Add New Address
											</button>
											<ul>
												{
													documentAddress
													&&
													documentAddress.map((item: any) =>
														<li onClick={() => locationChange(item.fields[0].value)}>{item.fields[0].value}</li>
													)
												}
											</ul>
											{
												openModal
												&&
												<Modal
													centered
													isOpen={openModal}
													onClose={handleModalToggle}>
													<div className={handles.modal_container}>
														<div className={handles.modal_container_child}>
															<h1 className={handles.modal_container_title}>Add a new address</h1>
															<div className={handles.select_country}>
																<p className={handles.select_country__label}>Country</p>
																<ul onClick={() => setOpenCountry(!openCountry)} className={`${handles.country_container} ${openCountry ? handles.country_container_open : handles.country_container_close}`} >
																	{
																		countrySelected
																		&&
																		<li className={handles.country}>
																			<img className={handles.country_img} src={countrySelected} alt="" />
																		</li>
																	}
																	<li onClick={() => { setCountrySelected('https://cdn-icons-png.flaticon.com/512/323/323310.png'), setCountry('US') }} className={handles.country}>
																		<img className={handles.country_img} src="https://cdn-icons-png.flaticon.com/512/323/323310.png" alt="" />
																	</li>
																	<li onClick={() => { setCountrySelected('https://cdn-icons-png.flaticon.com/512/197/197430.png'), setCountry('CA') }} className={handles.country}>
																		<img className={handles.country_img} src="https://cdn-icons-png.flaticon.com/512/197/197430.png" alt="" />
																	</li>
																	<li onClick={() => { setCountrySelected('https://cdn-icons-png.flaticon.com/128/197/197397.png'), setCountry('MX') }} className={handles.country}>
																		<img className={handles.country_img} src="https://cdn-icons-png.flaticon.com/128/197/197397.png" alt="" />
																	</li>
																</ul>
															</div>
															<div className={handles.form_inputs}>

																<div className={handles.container_input}>
																	<label className={handles.container_input_label} htmlFor="">First Name*</label>
																	<input
																		value={firstname}
																		onChange={(e: any) => setFirstName(e.target.value)}
																		className={handles.form_inputs__item} type="text" placeholder='First Name' />
																</div>

																<div className={handles.container_input}>
																	<label className={handles.container_input_label} htmlFor="">Last Name*</label>
																	<input
																		value={lastname}
																		onChange={(e: any) => setLastName(e.target.value)}
																		className={handles.form_inputs__item} type="text" placeholder='Last Name' />
																</div>

																<div className={handles.container_input}>
																	<label className={handles.container_input_label} htmlFor="">Address*</label>
																	<input
																		value={address}
																		onChange={(e: any) => setAddress(e.target.value)}
																		className={handles.form_inputs__item} type="text" placeholder='Address' />
																</div>

																<div className={handles.container_input}>
																	<label className={handles.container_input_label} htmlFor="">Apt/Floor/Suite*</label>
																	<input
																		value={addressoption}
																		onChange={(e: any) => setAddressoption(e.target.value)}
																		className={handles.form_inputs__item} type="text" placeholder='Apt/Floor/Suite' />
																</div>

																<div className={handles.container_input}>
																	<label className={handles.container_input_label} htmlFor="">City*</label>
																	<input
																		value={city}
																		onChange={(e: any) => setCity(e.target.value)}
																		className={handles.form_inputs__item} type="text" placeholder='City*' />
																</div>

																<div className={handles.container_input}>
																	<label className={handles.container_input_label} htmlFor="">State*</label>
																	<input
																		value={state}
																		onChange={(e: any) => setState(e.target.value)}
																		className={handles.form_inputs__item} type="text" placeholder='State*' />
																</div>

																<div className={handles.container_input}>
																	<label className={handles.container_input_label} htmlFor="">Zip Code*</label>
																	<input
																		value={zip}
																		onChange={(e: any) => setZip(e.target.value)}
																		className={handles.form_inputs__item} type="text" placeholder='Zip Code*' />
																</div>

																<div className={handles.container_input}>
																	<label className={handles.container_input_label} htmlFor="">Phone*</label>
																	<input
																		value={phone}
																		onChange={(e: any) => setPhone(e.target.value)}
																		className={handles.form_inputs__item} type="text" placeholder='Phone*' />
																</div>

															</div>
															<div className={handles.container_button}>
																<button onClick={handleModalToggle} className={handles.container_button_cancel}>Cancel</button>
																<button onClick={handleSend} className={handles.container_button_add}>Add</button>
															</div>
														</div>
													</div >


												</Modal>

											}

										</>
									)
								}
							</div>
						</div>
					)
				}

				<div className={handles.btnGroups}>
					<button className={`${handles.btnPrimaeyButton} ${handles.TopButtonBorder}`} onClick={() => handleInputChange('step1')}>Back </button>
					<button className={handles.btnPrimaeyButton} onClick={() => handleInputChange('step3')}>Continue</button>
				</div>

				<div className={handles.btnBlock}>
					<button className={`${handles.btnPrimaeyButton} ${handles.btnTransparent}`} onClick={() => handleInputChange('homeTab')}>Cancel</button>
				</div>

			</div>


		</>

	)
}

export default Step2
