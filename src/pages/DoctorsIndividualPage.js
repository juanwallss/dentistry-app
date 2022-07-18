import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { doctorActions } from '../app/doctor-slice'
export default function DoctorsIndividualPage(props) {
	const [currentItem, setCurrentItem] = useState({})
	const dispatch = useDispatch()
	const addDoctor = (item) => {
		dispatch(doctorActions.addDoctor(item))
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
						id="standard-required"
						label="Especialidad"
						variant="standard"
						placeholder="Correo Electrónico"
						onChange={(e) =>
							setCurrentItem({ ...currentItem, degree: e.target.value })
						}
					/>
					<TextField
						required
						id="standard-number"
						label="Cédula Profesional"
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						variant="standard"
						onChange={(e) =>
							setCurrentItem({
								...currentItem,
								professional_id: e.target.value,
							})
						}
					/>
					<Link to={`/doctors`}>
						<Fab
							onClick={() => {
								console.log(currentItem)
								addDoctor(currentItem)
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
