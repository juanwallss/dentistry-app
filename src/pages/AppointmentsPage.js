import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import EnhancedTable from '../components/Table'
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
import axios from 'axios'
import { style } from '../theme/styles'
export default function AppointmentsPage() {
	const history = useHistory()
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({})
	const [openModal, setOpenModal] = useState(false)

	const fetchAppointments = () => {
		fetch(
			'http://127.0.0.1:8000/api/citas'
		)
			.then((res) => res.json())
			.then((info) => {
				const response = info.map(ap => {
					return {
						...ap,
						doctor_name: ap.doctor.nombre,
						patient_name: ap.patient.nombre
					}
				})
				setData(Object.values(response))
			})
	}

	const handleArrive = async (rowId) => {
		await axios
			.put(`http://127.0.0.1:8000/api/citas/${rowId}`,
				{
					...data,
					status: 'REALIZADA'
				}
			).then(() => {
				fetchAppointments()
			})
	}

	const handleDelete = (rowToDelete) => {
		deleteAppointment(rowToDelete)
	}

	const handleUpdate = (updatedRow) => {
		history.push(`/citas/${updatedRow}`)
	}
	const deleteAppointment = async (id) => {
		await fetch('http://127.0.0.1:8000/api/citas/' + id, {
			method: 'DELETE'
		}).then(() => fetchAppointments())
	}
	useEffect(() => {
		fetchAppointments()
	}, [])

	return (
		<div>
			<Container sx={{ marginTop: '20px ' }}>

				<Button sx={{ marginTop: '10px' }} variant="contained">
					<NavLink
						style={{ textDecoration: 'none', color: 'white' }}
						to={`/citas/new`}
					>
						Agendar Cita
					</NavLink>
				</Button>
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
					actions
					onDelete={handleDelete}
					onUpdate={handleUpdate}
				/>
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
								<Typography>
									Tratamientos:
								</Typography>
								<ul>
									{modalInfo?.tratamientos?.length > 0 && (
										modalInfo.tratamientos.map((i, index) => (
											<li key={`${index}-${i.nombre}`}>
												{i.nombre} - ${i.precio}
											</li>
										))
									)}
								</ul>
							</CardContent>
							<CardActions>
								<Button
									style={{ marginTop: '10px' }}
									onClick={() => {
										handleArrive(modalInfo.id)
										setOpenModal(false)
										Swal.fire({
											title: 'Exito',
											text: 'Cita realizada!',
											icon: 'success',
										})
									}}
									variant="outlined"
								>
									Paciente Llego
								</Button>
								<Button
									color="success"
									sx={{ marginTop: '10px' }}
									variant="outlined"
									onClick={() => {
										let patientId = modalInfo.id
										let patient = data.find(
											(patient) => patient.id === patientId
										)
										window.open(
											`https://wa.me/+521${patient.telefono}/?text=Hola,%20${patient.patient_name.split(' ')[0]
											}!,%20este%20es%20un%20recordatorio%20para%20tu%20cita%20con%20${'el/la doctor:'
											}%20${modalInfo.doctor_name}%20en%20la%20fecha%20${modalInfo.date
											}`
										)
									}}
								>
									WhatsApp
								</Button>
								<Button
									style={{ marginTop: '10px' }}
									onClick={() => {
										deleteAppointment(modalInfo.id)
										setOpenModal(false)
										Swal.fire({
											title: 'Se elimino la cita',
											text: 'Se ha eliminado la cita correctamente',
											icon: 'success',
										})
									}}
									variant="outlined"
								>
									Cancelar
								</Button>
							</CardActions>
						</Card>
					</Box>
				</Modal>
			</Container>
		</div>
	)
}
