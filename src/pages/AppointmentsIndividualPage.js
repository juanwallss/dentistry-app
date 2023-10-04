import * as React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import { appointmentActions } from '../store/appointment-slice'
import {
	Box,
	TextField,
	Fab,
	Typography,
	InputLabel,
	MenuItem,
	Select,
	Container,
	Card,
	CardContent,
} from '@mui/material'

export default function AppointmentsIndividualPage(props) {
	const [currentItem, setCurrentItem] = useState({})
	const [patient, setPatient] = useState({})
	const [patients, setPatients] = useState([])
	const [doctor, setDoctor] = useState({})
	const [doctors, setDoctors] = useState([])
	const dispatch = useDispatch()

	const addAppointment = (item) => {
		dispatch(appointmentActions.addAppointment(item))
	}

	const fetchDoctors = () => {
		fetch("http://127.0.0.1:8000/api/doctors").then(res => res.json())
			.then(info => setDoctors(info))
			.catch(err => console.log(err))
	}
	const fetchPatients = () => {
		fetch('http://127.0.0.1:8000/api/patients')
			.then((res) => res.json())
			.then((data) => {
				setPatients(data)
			})
	}

useEffect(() => {
	fetchDoctors()
	fetchPatients()
},[])

	const sendAppointment = async (item) => {
		const response = await fetch(
			'https://dentistry-app-614cd-default-rtdb.firebaseio.com/appointments.json',
			{
				method: 'POST',
				body: JSON.stringify(item),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}

	return (
		<div>
			{' '}
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
			>
				<Container>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: '20px',
						}}
					>
						{patients.length > 0 ? (
							<div>
								<InputLabel id="demo-simple-select-label">Paciente</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={patient}
									label="Paciente"
									onChange={(event) => {
										setCurrentItem({
											...currentItem,
											patient: event.target.value.name,
											patient_id: event.target.value.id,
										})
										setPatient(event.target.value)
									}}
									sx={{ width: '25ch' }}
								>
									{patients.map((item) => (
										<MenuItem key={item.id} value={item}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</div>
						) : (
							<Card>
								<CardContent>
									<Typography>No hay pacientes</Typography>
								</CardContent>
							</Card>
						)}
						{doctors.length > 0 ? (
							<div>
								<InputLabel id="demo-simple-select-label">Doctor</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={doctor}
									label="Doctor"
									onChange={(event) => {
										setCurrentItem({
											...currentItem,
											doctor: event.target.value.name,
											doctor_id: event.target.value.id,
											doctor_gender: event.target.value.gender,
										})
										setDoctor(event.target.value)
									}}
									sx={{ width: '25ch' }}
								>
									{doctors.map((item) => (
										<MenuItem key={item.id} value={item}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</div>
						) : (
							<Card>
								<CardContent>
									<Typography>No hay doctores</Typography>
								</CardContent>
							</Card>
						)}
						<TextField
							required
							id="standard-required"
							label="Procedimiento"
							placeholder="Procedimiento"
							onChange={(e) =>
								setCurrentItem({ ...currentItem, procedure: e.target.value })
							}
						/>
						{/* <Button style={{ marginTop: '10px' }} variant="outlined">
							Agregar Procedimiento{' '}
						</Button> */}
						<TextField
							id="standard-required"
							label="Fecha"
							type="date"
							onChange={(e) =>
								setCurrentItem({ ...currentItem, date: e.target.value })
							}
							InputLabelProps={{
								shrink: true,
							  }}
						/>
						<TextField
							id="standard-required"
							label="Hora"
							type="time"
							onChange={(e) =>
								setCurrentItem({ ...currentItem, time: e.target.value })
							}
							InputLabelProps={{
								shrink: true,
							  }}
						/>
						<Link to={`/appointments`}>
							<Fab
								style={{
									marginTop: '20px',
								}}
								onClick={() => {
									addAppointment(currentItem)
									sendAppointment(currentItem)
									setCurrentItem({
										...currentItem,
										id: 0,
									})
									Swal.fire({
										title: 'Cita agendada',
										text: 'Cita agendada correctamente',
										icon: 'success',
									})
									// sendRequest()
								}}
								size="small"
								color="primary"
								aria-label="add"
							>
								<AddIcon />
							</Fab>
						</Link>
					</div>
				</Container>
			</Box>
		</div>
	)
}
