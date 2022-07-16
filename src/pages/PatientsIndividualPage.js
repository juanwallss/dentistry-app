import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { patientActions } from '../app/patient-slice'
export default function PatientsIndividualPage(props) {
	const [currentItem, setCurrentItem] = useState({})
	const dispatch = useDispatch()
	const addPatient = (item) => {
		dispatch(patientActions.addPatient(item))
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
						label="Correo Electrónico"
						variant="standard"
						placeholder="Correo Electrónico"
						onChange={(e) =>
							setCurrentItem({ ...currentItem, email: e.target.value })
						}
					/>
					<TextField
						required
						id="standard-number"
						label="Edad"
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						variant="standard"
						onChange={(e) =>
							setCurrentItem({ ...currentItem, age: e.target.value })
						}
					/>
					<Link to={`/patients`}>
						<Fab
							onClick={() => {
								console.log(currentItem)
								addPatient(currentItem)
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
