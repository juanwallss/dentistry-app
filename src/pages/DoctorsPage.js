import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import EnhancedTable from '../components/Table'
import { Modal, Typography, Box, Container, Button } from '@mui/material'
import DoctorsIndividualPage from './DoctorsIndividualPage'
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

export default function DoctorsPage() {
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({})
	const [openModal, setOpenModal] = useState(false)
	let doctors = useSelector((state) => state.doctor.doctors)
	useEffect(() => {
		setData(doctors)
		console.log(doctors)
	}, [doctors])
	return (
		<div>
			<Container sx={{ marginTop: '10px ' }}>
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
						Nuevo Doctor
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
						<Typography id="modal-modal-title" variant="h5" component="h2">
							{`Nombre ${modalInfo.name}`}
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Cedula Profesional: {modalInfo.professional_id}
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Especialidad: {modalInfo.degree}
						</Typography>
					</Box>
				</Modal>
			</Container>
		</div>
	)
}
