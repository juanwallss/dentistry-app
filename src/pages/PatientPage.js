import React, { useState, useEffect } from 'react'
import { NavLink, Route, useHistory } from 'react-router-dom'
import EnhancedTable from '../components/Table'
import Swal from 'sweetalert2'
import {
	Button,
	Modal,
	Typography,
	Box,
	Container,
	Card,
	CardActions,
	CardContent,
} from '@mui/material'
import { style } from '../theme/styles'
export default function AppointmentsPage() {
	const history = useHistory()
	const [data, setData] = useState([])
	const [modalInfo, setModalInfo] = useState({})
	const [openModal, setOpenModal] = useState(false)

	
	const handleDelete = (rowToDelete) => {
		deletePatient(rowToDelete)
  }

  const handleUpdate = (updatedRow) => {
		history.push(`/patients/${updatedRow}`)
  }

	const fetchPatients = () => {
		fetch('http://127.0.0.1:8000/api/patients')
			.then((res) => res.json())
			.then((data) => {
				setData(data)
			})
	}
	const deletePatient = async (id) => {
		await fetch('http://127.0.0.1:8000/api/patients/'+id,{
			method: 'DELETE'
		}).then(() => fetchPatients())
	}
	useEffect(() => {
		fetchPatients()
	}, [])
	return (
		<div>
			<Container sx={{ marginTop: '20px ' }}>
				<Button sx={{ marginTop: '10px' }} variant="contained">
					<NavLink
						style={{ textDecoration: 'none', color: 'white' }}
						to={`/patients/new`}
					>
						Agregar Paciente
					</NavLink>
				</Button>
				<EnhancedTable
					title={'Pacientes'}
					columns={[
						{ id: 'id', label: '# de Folio', minWidth: 50 },
						{ id: 'name', label: 'Nombre', minWidth: 170 },
						{ id: 'phone', label: 'Telefono', minWidth: 170 },
						{ id: 'date_of_birth', label: 'Fecha de Nacimiento', minWidth: 170 },
						{ id: 'email', label: 'Correo Electronico', minWidth: 170 },
					]}
					rows={data}					
					actions
					onDelete={handleDelete}
					onUpdate={handleUpdate}
				/>
			</Container>
		</div>
	)
}
