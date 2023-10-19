import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import EnhancedTable from '../components/Table'
import {
	Button,
	Container,
} from '@mui/material'
export default function AppointmentsPage() {
	const history = useHistory();
	const [data, setData] = useState([])

	
	const handleDelete = (rowToDelete) => {
		deletePatient(rowToDelete)
  };

  const handleUpdate = (updatedRow) => {
		history.push(`/specialties/${updatedRow}`)
  };

	const fetchPatients = () => {
		fetch('http://127.0.0.1:8000/api/specialties')
			.then((res) => res.json())
			.then((data) => {
				setData(data)
			})
	}
	const deletePatient = async (id) => {
		await fetch('http://127.0.0.1:8000/api/specialties/'+id,{
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
						to={`/specialties/new`}
					>
						Agregar Especialidad
					</NavLink>
				</Button>
				<EnhancedTable
					title={'Catalogo de Especialidades'}
					columns={[
						{ id: 'id', label: '# de Especialidad', minWidth: 50 },
						{ id: 'name', label: 'Nombre', minWidth: 170 }
					]}
					rows={data}					
					actions
					onUpdate={handleUpdate}
				/>
			</Container>
		</div>
	)
}
