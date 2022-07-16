import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import EnhancedTable from '../components/Table'
import AppointmentsIndividualPage from './AppointmentsIndividualPage'
import { Modal, Typography, Box, Container, Button } from '@mui/material'

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
const dummy = [
	{
		id: 1,
		patient: 'John Doe',
		date: '2020-03-05',
		doctor: 'Angelis Cepeda',
		age: '30',
		procedure: 'Valoracion',
	},
	{
		id: 2,
		patient: 'Jane Doe',
		age: '25',
		doctor: 'Angelis Cepeda',
		date: '2020-01-01',
		procedure: 'Limpieza y ofrecerle un puente',
	},
	{
		id: 3,
		patient: 'Frank Doe',
		date: '2023-01-01',
		age: '30',
		doctor: 'Angelis Cepeda',
		procedure: 'Cambio de resinas y presupuesto para cambio de dientes',
	},
]

export default function AppointmentsPage() {
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({})
	const [openModal, setOpenModal] = useState(false)
	let appointments = useSelector((state) => state.appointment.appointments)
	let patients = useSelector((state) => state.patient.patients)
	useEffect(() => {
		setData(appointments)
		console.log(appointments)
	}, [appointments])
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
					<NavLink to={`/appointments/new`}>Agendar Cita</NavLink>
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
							{modalInfo.doctor ? modalInfo.doctor : 'No hay doctor asignado'}
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
