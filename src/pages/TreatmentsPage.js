import React, { useState, useEffect } from 'react'
import { NavLink, Route, useHistory } from 'react-router-dom'
import EnhancedTable from '../components/Table'
import {
	Button,
	Container,
} from '@mui/material'
export default function TreatmentsPage() {
	const history = useHistory();
	const [data, setData] = useState([])
  
  const deleteTreatment = async (id) => {
    await fetch('http://127.0.0.1:8000/api/treatments/'+id,{
      method: 'DELETE'
    }).then(() => fetchTreatments())
  }
	const handleDelete = (rowToDelete) => {
    deleteTreatment(rowToDelete)
  };
  
  const fetchTreatments = () => {
    fetch('http://127.0.0.1:8000/api/treatments')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }
  useEffect(() => {
		fetchTreatments()
	}, [])
  const handleUpdate = (updatedRow) => {
		history.push(`/treatments/${updatedRow}`)
  };
  return (
    <div>
      <Container sx={{ marginTop: '20px ' }}>
				<Button sx={{ marginTop: '10px' }} variant="contained">
					<NavLink
						style={{ textDecoration: 'none', color: 'white' }}
						to={`/treatments/new`}
					>
						Agregar Tratamiento
					</NavLink>
				</Button>
				<EnhancedTable
					title={'Tratamientos'}
					columns={[
						{ id: 'id', label: '# de Folio', minWidth: 50 },
						{ id: 'name', label: 'Nombre', minWidth: 170 },
						{ id: 'price', label: 'Precio', minWidth: 170 },
						{ id: 'description', label: 'Descripción', minWidth: 170 },
					]}
					rows={data}
					actions
					onUpdate={handleUpdate}
        />
			</Container>
    </div>
  )
}
