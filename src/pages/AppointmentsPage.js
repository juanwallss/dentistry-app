import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import EnhancedTable from '../components/Table'
import AppointmentsIndividualPage from './AppointmentsIndividualPage'
import { Modal, Typography, Box, Container, Button } from '@mui/material'
import { appointmentActions } from '../app/appointment-slice'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: '#e3f2fd',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}
export default function AppointmentsPage() {
	const dispatch = useDispatch()
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({})
	const [openModal, setOpenModal] = useState(false)
	const [appointments1, setAppointments1] = useState([])

	let appointments = useSelector((state) => state.appointment.appointments)
	let patients = useSelector((state) => state.patient.patients)
	useEffect(() => {
		setData(appointments)
		console.log(appointments)
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

	return (
		<div>
			<Container sx={{ marginTop: '10px ' }}>
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
					</Box>
				</Modal>
			</Container>
		</div>
	)
}
