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
	const dispatch = useDispatch()
	let patients = useSelector((state) => state.patient.patients)
	const handleChange = (event) => {
		setCurrentItem({
			...currentItem,
			patient: event.target.value.name,
		})
		setPatient(event.target.value)
	}
	const addAppointment = (item) => {
		dispatch(appointmentActions.addAppointment(item))
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
					<InputLabel id="demo-simple-select-label">Paciente</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={patient}
						label="Paciente"
						onChange={handleChange}
						sx={{ width: '25ch' }}
					>
						{patients.map((item) => (
							<MenuItem key={item.id} value={item}>
								{item.name}
							</MenuItem>
						))}
					</Select>

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
						required
						id="standard-required"
						label="Fecha"
						type="date"
						variant="standard"
						onChange={(e) =>
							setCurrentItem({ ...currentItem, date: e.target.value })
						}
					/>

					<Link to={`/appointments`}>
						<Fab
							onClick={() => {
								addAppointment(currentItem)
							}}
							size="small"
							color="primary"
							aria-label="add"
						>
							<AddIcon />
						</Fab>
					</Link>
				</Container>
			</Box>
		</div>
	)
}
