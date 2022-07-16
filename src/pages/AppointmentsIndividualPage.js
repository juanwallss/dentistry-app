import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { appointmentActions } from '../app/appointment-slice'
export default function AppointmentsIndividualPage(props) {
	const [currentItem, setCurrentItem] = useState({})
	const dispatch = useDispatch()
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
				<div>
					<TextField
						required
						id="standard-required"
						label="Nombre y Apellido"
						variant="standard"
						placeholder="Nombre y Apellido"
						onChange={(e) =>
							setCurrentItem({ ...currentItem, name: e.target.value })
						}
					/>
					<TextField
						required
						id="standard-required"
						label="Teléfono"
						variant="standard"
						placeholder="Teléfono"
						onChange={(e) =>
							setCurrentItem({ ...currentItem, phone: e.target.value })
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

					<Link to={`/patients`}>
						<Fab
							onClick={() => {
								console.log(currentItem)
								addAppointment(currentItem)
								props.history.push('/patients')
							}}
							size="small"
							color="primary"
							aria-label="add"
						>
							<AddIcon />
						</Fab>
					</Link>
				</div>
			</Box>
		</div>
	)
}
