import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import EnhancedTable from '../components/Table'
import Swal from 'sweetalert2'
import {
	Modal,
	Typography,
	Box,
	Container,
	Button,
	Card,
	CardActions,
	CardContent,
} from '@mui/material'
import DoctorsIndividualPage from './DoctorsIndividualPage'
import { doctorActions } from '../store/doctor-slice'
import { style } from '../theme/styles'

export default function DoctorsPage() {
	const dispatch = useDispatch()
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({})
	const [openModal, setOpenModal] = useState(false)
	let doctors = useSelector((state) => state.doctor.doctors)
	useEffect(() => {
		setData(doctors)
	}, [doctors])
	const removeDoctor = (id) => {
		dispatch(doctorActions.deleteDoctor(id))
	}

	return (
		<div>
			<Container sx={{ marginTop: '20px ' }}>
				<EnhancedTable
					title={'Doctores'}
					columns={[
						{ id: 'id', label: 'ID', minWidth: 50 },
						{ id: 'name', label: 'Nombre', minWidth: 170 },
						{
							id: 'professional_id',
							label: 'Cédula Profesional',
							minWidth: 170,
						},
						{ id: 'degree', label: 'Especialidad', minWidth: 170 },
						{ id: 'phone', label: 'Teléfono', minWidth: 170 },
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
						to={`/doctors/new`}
					>
						Agregar Doctor
					</NavLink>
				</Button>
				<Route path="/doctors/:id">
					<DoctorsIndividualPage />
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
									{`Nombre ${modalInfo.name}`}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Cedula Profesional: {modalInfo.professional_id}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Especialidad: {modalInfo.degree}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Telefono: {modalInfo.phone}
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									style={{ marginTop: '10px' }}
									onClick={() => {
										removeDoctor(modalInfo.id)
										setOpenModal(false)
										Swal.fire({
											title: 'Se elimino el doctor',
											text: 'Se ha eliminado el doctor correctamente',
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
