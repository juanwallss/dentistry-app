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
	CardActions,
	CardContent,
} from '@mui/material'
import { style } from '../theme/styles'

export default function DoctorsPage() {
	const history = useHistory()
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({
		specialties: []
	})
	const [openModal, setOpenModal] = useState(false)
	const handleDelete = (rowToDelete) => {
		deleteDoctor(rowToDelete)
  }

  const handleUpdate = (updatedRow) => {
		history.push(`/doctors/${updatedRow}`)
  }
	const deleteDoctor = async (id) => {
		await fetch('http://127.0.0.1:8000/api/doctors/'+id,{
			method: 'DELETE'
		}).then(() => fetchDoctors()).finally(() => {
			Swal.fire({
				title: 'Se elimino el doctor',
				text: 'Se ha eliminado el doctor correctamente',
				icon: 'success',
			})
		})
	}
	const fetchDoctors = () => {
		fetch("http://127.0.0.1:8000/api/doctors").then(res => res.json())
			.then(info => setData(info))
			.catch(err => console.log(err))
	}

	useEffect(() => {
		fetchDoctors()
	}, [])
	return (
		<div>
			<Container sx={{ marginTop: '20px ' }}>
				<Button sx={{ marginTop: '10px' }} variant="contained">
					<NavLink
						style={{ textDecoration: 'none', color: 'white' }}
						to={`/doctors/new`}
					>
						Agregar Doctor
					</NavLink>
				</Button>
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
						{ id: 'phone', label: 'Teléfono', minWidth: 170 },
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
									{`Nombre ${modalInfo.name}`}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Cedula Profesional: {modalInfo.professional_id}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Especialidad: {modalInfo?.specialties.length > 0 ? modalInfo.specialties.map(s => `${s.name}, `) : `Sin especialidad`}
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Telefono: {modalInfo.phone}
								</Typography>
							</CardContent>
							<CardActions>
							<Button
									style={{ marginTop: '10px' }}
									onClick={() => {
										setOpenModal(false)
										deleteDoctor(modalInfo.id)
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
								<NavLink to={`/doctors/${modalInfo.id}`}>
								<Button
									style={{ marginTop: '10px' }}
									onClick={() => {

									}}
									variant="outlined"
								>
									Modificar
								</Button>
								</NavLink>
							</CardActions>
						</Card>
					</Box>
				</Modal>
			</Container>
		</div>
	)
}
