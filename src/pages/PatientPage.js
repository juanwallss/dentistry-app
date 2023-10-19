import React, { useState, useEffect } from 'react'
import { NavLink, Route, useHistory } from 'react-router-dom'
import EnhancedTable from '../components/Table'
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
	const history = useHistory();
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({})
	const [openModal, setOpenModal] = useState(false)

	
	const handleDelete = (rowToDelete) => {
		deletePatient(rowToDelete)
  };

  const handleUpdate = (updatedRow) => {
		history.push(`/patients/${updatedRow}`)
  };

	const fetchPatients = () => {
		fetch('http://127.0.0.1:8000/api/patients')
			.then((res) => res.json())
			.then((data) => {
				setData(data)
			})
	}
	const deletePatient = async (id) => {
		await fetch('http://127.0.0.1:8000/api/patients/'+id,{
			method: 'DELETE'
		}).then(() => fetchPatients())
	}
	useEffect(() => {
		fetchPatients()
	}, [])
	return (
		<div>
			<Container sx={{ marginTop: '20px ' }}>
				<Button sx={{ marginTop: '10px' }} variant="contained">
					<NavLink
						style={{ textDecoration: 'none', color: 'white' }}
						to={`/patients/new`}
					>
						Agregar Paciente
					</NavLink>
				</Button>
				<EnhancedTable
					title={'Pacientes'}
					columns={[
						{ id: 'id', label: '# de Folio', minWidth: 50 },
						{ id: 'name', label: 'Nombre', minWidth: 170 },
						{ id: 'phone', label: 'Telefono', minWidth: 170 },
						{ id: 'date_of_birth', label: 'Fecha de Nacimiento', minWidth: 170 },
						{ id: 'email', label: 'Correo Electronico', minWidth: 170 },
					]}
					rows={data}					
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
									Nombre: {modalInfo.name}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Telefono: {modalInfo.phone}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Correo Electronico: {modalInfo.email}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Direccion: {`${modalInfo.street}, ${modalInfo.city}, ${modalInfo.state}, CP#${modalInfo.postal_code}, ${modalInfo.country}`}
								</Typography>
								<CardActions>
									<Button
										style={{ marginTop: '10px' }}
										onClick={() => {
											setOpenModal(false)
											deletePatient(modalInfo.id)
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
