import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import { appointmentActions } from '../app/appointment-slice'
import {
	Box,
	TextField,
	Fab,
	Button,
	Modal,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Container,
} from '@mui/material'

export default function AppointmentsIndividualPage(props) {
	const [currentItem, setCurrentItem] = useState({})
	const [patient, setPatient] = useState({})
	const [doctor, setDoctor] = useState({})
	const dispatch = useDispatch()

	let patients = useSelector((state) => state.patient.patients)
	let doctors = useSelector((state) => state.doctor.doctors)

	const addAppointment = (item) => {
		dispatch(appointmentActions.addAppointment(item))
	}

	// const sendRequest = async () => {
	// 	const response = await fetch(
	// 		'https://dentistry-app-614cd-default-rtdb.firebaseio.com/appointments.json',
	// 		{
	// 			method: 'POST',
	// 			body: JSON.stringify(currentItem),
	// 		}
	// 	)
	// 	if (!response.ok) {
	// 		throw new Error('Could not fetch data')
	// 	}
	// 	addAppointment(currentItem)
	// }

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
							<Typography>No hay pacientes</Typography>
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
							<Typography>No hay doctores</Typography>
						)}
						<TextField
							required
							id="standard-required"
							label="Procedimiento"
							variant="standard"
							placeholder="Procedimiento"
							onChange={(e) =>
								setCurrentItem({ ...currentItem, procedure: e.target.value })
							}
						/>

						<TextField
							id="standard-required"
							label=" "
							type="date"
							variant="standard"
							onChange={(e) =>
								setCurrentItem({ ...currentItem, date: e.target.value })
							}
						/>
						<Link to={`/appointments`}>
							<Fab
								style={{
									marginTop: '20px',
								}}
								onClick={() => {
									addAppointment(currentItem)
									setCurrentItem({
										...currentItem,
										id: 0,
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
