import React, { useState, useEffect } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EnhancedTable from '../components/Table'
import PatientsIndividualPage from './PatientsIndividualPage'
import { patientActions } from '../store/patient-slice'
import Swal from 'sweetalert2'
import {
	Button,
	Modal,
	Typography,
	Box,
	Container,
	Card,
	CardActions,
	CardContent,
} from '@mui/material'
import { style } from '../theme/styles'
export default function AppointmentsPage() {
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({})
	const [openModal, setOpenModal] = useState(false)
	let patients = useSelector((state) => state.patient.patients)

	const dispatch = useDispatch()
	const removePatient = (id) => {
		dispatch(patientActions.deletePatient(id))
	}
	useEffect(() => {
		setData(patients)
		console.log(patients)
	}, [patients])
	// useEffect(() => {
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data))
	// }, [data])
	return (
		<div>
			<Container sx={{ marginTop: '20px ' }}>
				<EnhancedTable
					title={'Pacientes'}
					columns={[
						{ id: 'id', label: '# de Folio', minWidth: 50 },
						{ id: 'name', label: 'Nombre', minWidth: 170 },
						{ id: 'phone', label: 'Telefono', minWidth: 170 },
						{ id: 'age', label: 'Edad', minWidth: 170 },

						{ id: 'email', label: 'Correo Electronico', minWidth: 170 },
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
						to={`/patients/new`}
					>
						Agregar Paciente
					</NavLink>
				</Button>
				<Route path="/patients/:id">
					<PatientsIndividualPage />
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
									Nombre: {modalInfo.name}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Telefono: {modalInfo.phone}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Edad: {modalInfo.age}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Correo Electronico: {modalInfo.email}
								</Typography>
								<CardActions>
									<Button
										style={{ marginTop: '10px' }}
										onClick={() => {
											removePatient(modalInfo.id)
											setOpenModal(false)
											Swal.fire({
												title: 'Se elimino el paciente',
												text: 'Se ha eliminado el paciente correctamente',
												icon: 'success',
											})
										}}
										variant="outlined"
									>
										Eliminar
									</Button>
								</CardActions>
							</CardContent>
						</Card>
					</Box>
				</Modal>
			</Container>
		</div>
	)
}
