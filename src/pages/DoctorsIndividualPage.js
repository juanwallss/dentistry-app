import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { InputLabel, Select, MenuItem, Grid, Item, Button } from '@mui/material'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function DoctorsIndividualPage(props) {
  const { id } = useParams()
  const [currentItem, setCurrentItem] = useState({})
  const [specialties, setSpecialties] = useState([])
  const [specialty, setSpecialty] = useState([])
  const [gender, setGender] = useState('')

  const addDoctor = async (item) => {
    console.log(item)
    if (id === 'new') {
      await axios
        .post('http://127.0.0.1:8000/api/doctors',
          item
        )
        .then(() => {
          console.log(item)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      await axios
        .put(`http://127.0.0.1:8000/api/doctors/${id}`,
          item
        )
        .then(() => {
          console.log(item)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

	const deleteDoctor = async (value) => {
		await fetch('http://127.0.0.1:8000/api/doctors/'+value,{
			method: 'DELETE'
		})
	}

  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    setSpecialty(typeof value === 'string' ? value.split(',') : value)
    setCurrentItem({
      ...currentItem,
      specialty: value
    })
  }

  useEffect(() => {
    if (id !== 'new') {
      axios.get(`http://127.0.0.1:8000/api/doctors/${id}`).then((res) => {
        const spArr = res.data.specialties.map((s) => {
          return s.id
        })
        console.log(res.data)
        setCurrentItem({
					...res.data,
					specialty: spArr
				})
        setGender(res.data.gender)
        setSpecialty(spArr)
      })
    }
  }, [id])

  const fetchSpecialties = () => {
    fetch('http://127.0.0.1:8000/api/specialties')
      .then((res) => res.json())
      .then((data) => {
        setSpecialties(data)
      })
  }
  useEffect(() => {
    console.log(currentItem)
  }, [currentItem])

  useEffect(() => {
    fetchSpecialties()
  }, [])

  return (
    <div>
      {' '}
      {id !== 'new' ? <h1>Editar Doctor</h1> : <h1>Nuevo Doctor</h1>}
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '20px',
            margin: '50px'
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid
              item
              xs={12}
            >
              <div style={{ display: 'flex' }}>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    required
                    id='standard-required'
                    label='Nombre'
                    variant='standard'
                    placeholder='Nombre'
                    focused
                    value={currentItem?.name}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    required
                    id='standard-required'
                    label='Primer Apellido'
                    variant='standard'
                    value={currentItem?.father_lastname}
                    focused
                    placeholder='Primer Apellido'
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        father_lastname: e.target.value
                      })
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    required
                    id='standard-required'
                    label='Segundo Apellido'
                    variant='standard'
                    placeholder='Segundo Apellido'
                    value={currentItem?.mother_lastname}
                    focused
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        mother_lastname: e.target.value
                      })
                    }
                  />
                </Grid>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <div style={{ display: 'flex' }}>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    required
                    id='standard-required'
                    label='Teléfono'
                    variant='standard'
                    focused
                    value={currentItem?.phone}
                    placeholder='Teléfono'
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, phone: e.target.value })
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    required
                    id='standard-required'
                    label='Correo Electrónico'
                    variant='standard'
                    focused
                    placeholder='Correo Electrónico'
                    value={currentItem?.email}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, email: e.target.value })
                    }
                  />
                </Grid>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <div style={{ display: 'flex' }}>
                <Grid
                  item
                  xs={12}
                >
                  <InputLabel id='demo-simple-select-label'>
                    Especialidad
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={specialty}
                    multiple
                    label='Especialidad'
                    onChange={handleChange}
                    sx={{ width: '25ch' }}
                  >
                    {specialties.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    required
                    id='standard-number'
                    label='Cédula Profesional'
                    focused
                    type='number'
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant='standard'
                    value={currentItem?.professional_id}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        professional_id: e.target.value
                      })
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <InputLabel id='demo-simple-select-label'>Genero</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={gender}
                    label='Genero'
                    onChange={(event) => {
                      setCurrentItem({
                        ...currentItem,
                        gender: event.target.value
                      })
                      setGender(event.target.value)
                    }}
                    sx={{ width: '25ch' }}
                  >
                    <MenuItem
                      key={'h'}
                      value={'H'}
                    >
                      Hombre{' '}
                    </MenuItem>
                    <MenuItem
                      key={'m'}
                      value={'M'}
                    >
                      Mujer{' '}
                    </MenuItem>
                  </Select>
                </Grid>
              </div>
            </Grid>
          </Grid>
          {id !== 'new' ? (<div style={{height: '30px'}}>
						<Button
            sx={{ marginTop: '10px' }}
            variant='contained'
          >
            <NavLink
              style={{ textDecoration: 'none', color: 'white' }}
              to={`/doctors`}
              onClick={() => {
                addDoctor(currentItem)
                Swal.fire({
                  title: 'Doctor Modificado',
                  text: 'El doctor se ha modificado correctamente',
                  icon: 'success'
                })
              }}
            >
              Actualizar Datos
            </NavLink>
          </Button>
					<Button
            sx={{ marginTop: '10px' }}
            variant='contained'
          >
            <NavLink
              style={{ textDecoration: 'none', color: 'white' }}
              to={`/doctors`}
							onClick={() => {
								deleteDoctor(currentItem.id)
								Swal.fire({
									title: 'Se elimino el doctor',
									text: 'Se ha eliminado el doctor correctamente',
									icon: 'success',
								})
							}}
							variant="outlined"
            >
              Eliminar
            </NavLink>
          </Button></div>):(<>
						<Button
            sx={{ marginTop: '10px' }}
            variant='contained'
          >
            <NavLink
              style={{ textDecoration: 'none', color: 'white' }}
              to={`/doctors`}
              onClick={() => {
                addDoctor(currentItem)
                Swal.fire({
                  title: 'Doctor agregado',
                  text: 'El doctor se ha agregado correctamente',
                  icon: 'success'
                })
              }}
            >
              Agregar Doctor
            </NavLink>
          </Button></>)}
        </div>
      </Box>
    </div>
  )
}
