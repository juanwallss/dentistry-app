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
import { style } from '../theme/styles'
export default function AppointmentsPage() {
	const dispatch = useDispatch()
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({})
	const [openModal, setOpenModal] = useState(false)
	const [patientsInfo, setPatientsInfo] = useState(null)


	useEffect(() => {
		fetch(
			'http://127.0.0.1:8000/api/appointments'
		)
			.then((res) => res.json())
			.then((info) => {
				const response = info.map(ap => {
					return {
						...ap,
						doctor_name: ap.doctor.name,
						patient_name: ap.patient.name
					}
				})
				console.log(response)
				setData(Object.values(response))
			})
	}, [])
	useEffect(() => {
		console.log(modalInfo);
	}, [modalInfo])
	
	return (
		<div>
			<Container sx={{ marginTop: '20px ' }}>
				<EnhancedTable
					title={'Lista de Citas'}
					columns={[
						{ id: 'id', label: 'ID', minWidth: 50 },
						{ id: 'date', label: 'Fecha', minWidth: 170 },
						{ id: 'patient_name', label: 'Paciente', minWidth: 170 },
						{ id: 'doctor_name', label: 'Doctor', minWidth: 170 },
						{ id: 'status', label: 'Estado', minWidth: 170 },

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
									Doctor: {modalInfo.doctor_name}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Paciente: {modalInfo.patient_name}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Fecha: {modalInfo.date}
								</Typography>
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
										window.open(
											`https://wa.me/+521${patient.phone}/?text=Hola,%20${
												patient.name.split(' ')[0]
											}!,%20este%20es%20un%20recordatorio%20para%20tu%20cita%20con%20${
												modalInfo.doctor_gender === 'm'
													? 'la doctora:'
													: 'el doctor:'
											}%20${modalInfo.doctor}%20en%20la%20fecha%20${
												modalInfo.date
											}%20para%20tu%20procedimiento%20de:%20${
												modalInfo.procedure
											}.`
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
