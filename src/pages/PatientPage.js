import React, { useState, useEffect } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux'
import EnhancedTable from '../components/Table'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PatientsIndividualPage from './PatientsIndividualPage'
import { patientActions } from '../app/patient-slice'
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
			<EnhancedTable
				title={'Pacientes'}
				columns={[
					{ id: 'id', label: 'ID', minWidth: 50 },
					{ id: 'name', label: 'Nombre', minWidth: 170 },
					{ id: 'phone', label: 'Telefono', minWidth: 170 },
					{ id: 'email', label: 'Correo Electronico', minWidth: 170 },
				]}
				rows={data}
				handleClick={(row) => {
					console.log(row)
					setModalInfo(row)
					setOpenModal(true)
				}}
			/>
			<Button variant="contained">
				<NavLink to={`/patients/new`}>Agregar Paciente</NavLink>
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
					<Button
						onClick={() => {
							removePatient(modalInfo.id)
							setOpenModal(false)
						}}
						variant="contained"
					>
						Eliminar
					</Button>
				</Box>
			</Modal>
		</div>
	)
}
