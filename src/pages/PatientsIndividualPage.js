import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import AddIcon from '@mui/icons-material/Add'
import { Box, TextField, Fab } from '@mui/material'

import { patientActions } from '../store/patient-slice'

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
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: '20px',
					}}
				>
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
								addPatient(currentItem)
								Swal.fire({
									title: 'Paciente Agregado',
									text: 'Se ha agregado el paciente correctamente',
									icon: 'success',
								})
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
