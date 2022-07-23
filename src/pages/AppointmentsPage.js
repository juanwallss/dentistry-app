import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import EnhancedTable from '../components/Table'
import AppointmentsIndividualPage from './AppointmentsIndividualPage'
import Swal from 'sweetalert2'
import {
	Modal,
	Typography,
	Box,
	Container,
	Button,
	Card,
	CardContent,
	CardActions,
} from '@mui/material'
import { appointmentActions } from '../store/appointment-slice'
import { patientActions } from '../store/patient-slice'
import { style } from '../theme/styles'
export default function AppointmentsPage() {
	const dispatch = useDispatch()
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({})
	const [openModal, setOpenModal] = useState(false)
	const [appointments1, setAppointments1] = useState([])
	const [patientsInfo, setPatientsInfo] = useState(null)

	let appointments = useSelector((state) => state.appointment.appointments)
	let patients = useSelector((state) => state.patient.patients)
	useEffect(() => {
		// dispatch(appointmentActions.fetchAppointments())
		setData(appointments)
		// console.log(Object.values(appointments))
	}, [appointments])

	// useEffect(() => {
	// 	fetch(
	// 		'https://dentistry-app-614cd-default-rtdb.firebaseio.com/appointments.json'
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) => setData(Object.values(data)))

	// 	dispatch(appointmentActions.replaceAppointments(data))
	// }, [])
	// console.log(appointments1)
	const removeAppointment = (id) => {
		dispatch(appointmentActions.deleteAppointment(id))
	}
	return (
		<div>
			<Container sx={{ marginTop: '20px ' }}>
				<EnhancedTable
					title={'Lista de Citas'}
					columns={[
						{ id: 'id', label: 'ID', minWidth: 50 },
						{ id: 'patient', label: 'Paciente', minWidth: 170 },
						{ id: 'date', label: 'Fecha', minWidth: 170 },
						{ id: 'doctor', label: 'Doctor(a)', minWidth: 170 },
					]}
					rows={data}
					handleClick={(row) => {
						console.log(row)
						setModalInfo(row)
						setOpenModal(true)
					}}
				/>
				<Button sx={{ marginTop: '10px' }} variant="contained">
					<NavLink
						style={{ textDecoration: 'none', color: 'white' }}
						to={`/appointments/new`}
					>
						Agendar Cita
					</NavLink>
				</Button>
				<Route path="/appointments/:id">
					<AppointmentsIndividualPage />
				</Route>
				<Modal
					open={openModal}
					onClose={() => setOpenModal(false)}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<Box sx={style}>
						<Card>
							<CardContent>
								<Typography id="modal-modal-title" variant="h5" component="h2">
									{modalInfo.doctor
										? `C.D. ${modalInfo.doctor}`
										: 'No hay doctor asignado'}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Paciente: {modalInfo.patient}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Fecha: {modalInfo.date}
								</Typography>
								{modalInfo.procedure && (
									<Typography id="modal-modal-description" sx={{ mt: 2 }}>
										Procedimiento: {modalInfo.procedure}
									</Typography>
								)}
							</CardContent>
							<CardActions>
								<Button
									color="success"
									sx={{ marginTop: '10px' }}
									variant="outlined"
									onClick={() => {
										let patientId = modalInfo.patient_id
										let patient = patients.find(
											(patient) => patient.id === patientId
										)
										console.log(patient)
										window.open(
											`https://wa.me/+521${patient.phone}/?text=Hola,%20${patient.name}!,%20este%20es%20un%20recordatorio%20para%20tu%20cita%20con%20el%20doctor%20${modalInfo.doctor}%20en%20la%20fecha%20${modalInfo.date}%20para%20tu%20procedimiento%20de:%20${modalInfo.procedure}.`
										)
									}}
								>
									WhatsApp
								</Button>
								<Button
									style={{ marginTop: '10px' }}
									onClick={() => {
										removeAppointment(modalInfo.id)
										setOpenModal(false)
										Swal.fire({
											title: 'Se elimino la cita',
											text: 'Se ha eliminado la cita correctamente',
											icon: 'success',
										})
									}}
									variant="outlined"
								>
									Eliminar
								</Button>
							</CardActions>
						</Card>
					</Box>
				</Modal>
			</Container>
		</div>
	)
}
