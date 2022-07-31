import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import { InputLabel, Select, MenuItem, Grid, Item } from '@mui/material'
import Swal from 'sweetalert2'
import AddIcon from '@mui/icons-material/Add'
import { doctorActions } from '../store/doctor-slice'
export default function DoctorsIndividualPage(props) {
	const [currentItem, setCurrentItem] = useState({})
	const [gender, setGender] = useState('')
	const dispatch = useDispatch()
	const addDoctor = (item) => {
		dispatch(doctorActions.addDoctor(item))
	}
	const sendDoctor = async (item) => {
		const response = await fetch(
			'https://dentistry-app-614cd-default-rtdb.firebaseio.com/doctors.json',
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
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: '20px',
					}}
				>
					<Grid
						container
						rowSpacing={1}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					>
						<Grid item xs={12}>
							<div style={{ display: 'flex' }}>
								<Grid item xs={12}>
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
								</Grid>
								<Grid item xs={12}>
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
								</Grid>
								<Grid item xs={12}>
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
								</Grid>
							</div>
						</Grid>
						<Grid item xs={12}>
							<div style={{ display: 'flex' }}>
								<Grid item xs={12}>
									<TextField
										required
										id="standard-required"
										label="Especialidad"
										variant="standard"
										placeholder="Especialidad"
										onChange={(e) =>
											setCurrentItem({ ...currentItem, degree: e.target.value })
										}
									/>
								</Grid>
								<Grid item xs={12}>
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
								</Grid>
								<Grid item xs={12}>
									<InputLabel id="demo-simple-select-label">Genero</InputLabel>

									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={gender}
										label="Genero"
										onChange={(event) => {
											setCurrentItem({
												...currentItem,
												gender: event.target.value,
											})
											setGender(event.target.value)
										}}
										sx={{ width: '25ch' }}
									>
										<MenuItem key={'h'} value={'h'}>
											Hombre{' '}
										</MenuItem>
										<MenuItem key={'m'} value={'m'}>
											Mujer{' '}
										</MenuItem>
									</Select>
								</Grid>
								<Link to={`/doctors`}>
									<Fab
										onClick={() => {
											console.log(currentItem)
											sendDoctor(currentItem)
											addDoctor(currentItem)
											Swal.fire({
												title: 'Doctor agregado',
												text: 'El doctor se ha agregado correctamente',
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
						</Grid>
					</Grid>
				</div>
			</Box>
		</div>
	)
}
