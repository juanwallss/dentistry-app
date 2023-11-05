import * as React from 'react'
import { useState, useEffect } from 'react'
import { useParams, NavLink, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import '../components/DateSelector.css'

import {
  Box,
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider
} from '@mui/material'


export default function PatientsIndividualPage(props) {
	const history = useHistory()
  const { id } = useParams()
  const [currentItem, setCurrentItem] = useState({})
  const [appointments, setAppointments] = useState([])
  const [gender, setGender] = useState('')
  const addPatient = async (item) => {
    console.log(item)
    if (id === 'new') {
      await axios
        .post('http://127.0.0.1:8000/api/patients', 
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
        .put(`http://127.0.0.1:8000/api/patients/${id}`, 
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
  function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth)
    const currentDate = new Date()

    const difference = currentDate - birthDate
    const ageInMilliseconds = new Date(difference)
    const ageInYears = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970)

    return ageInYears
  }

  const handleBlur = (id) => {
    axios.get(`http://127.0.0.1:8000/api/patients/${id}`).then((res) => {
      if(res.data.status === 404) {
        Swal.fire({
          title: `No se encontró registro con el id: ${id}. Desea crear nuevo?`,
          showDenyButton: true,
          confirmButtonText: 'Crear nuevo',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push(`/patients/new`)
            window.location.reload()
      } else if (result.isDenied) {
           }
        })
      } else {
        history.push(`/patients/${id}`)
        setCurrentItem(res.data)
      }
    })
  }

  useEffect(() => {
    if (id !== 'new') {
      axios.get(`http://127.0.0.1:8000/api/patients/${id}`).then((res) => {
        console.log(res.data)
        const age = calculateAge(res.data.date_of_birth)
        setCurrentItem({
          ...res.data,
          age: age
        })
        setGender(res.data.gender)
        setAppointments(res.data.appointments)
      })
    }
  }, [id])

  return (
    <div>
      {' '}
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
      >
      {id !== 'new' ? <h1>Editar Paciente</h1> : <h1>Nuevo Paciente</h1>}
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
              <Grid item xs={12}>
                <TextField
                    required
                    id='standard-required'
                    label='ID'
                    variant='standard'
                    placeholder='ID'
                    focused
                    disabled={id === 'new'}
                    value={currentItem?.id}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, id: e.target.value })
                    }
                    onBlur={(e) => {
                      handleBlur(e.target.value)
                    }}
                  />
                </Grid>
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
								<Grid item xs={12}>
                <div style={{ display: 'flex' }}>
                  <Grid
                    item
                    xs={12}
                  >
                  <TextField
                    id="standard-required"
                    label="Fecha"
                    variant='standard'
                    type="date"
                    focused
                    value={currentItem?.date_of_birth}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, date_of_birth: e.target.value })
                    }
                  />
                  {/* {id !== 'new' && (
                        <p>Edad: {currentItem.age}</p>
                  )} */}
                  </Grid>
                </div>
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
                    label='Calle y numero'
                    variant='standard'
                    focused
                    value={currentItem?.street}
                    placeholder=''
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, street: e.target.value })
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
                    label='Ciudad'
                    variant='standard'
                    focused
                    placeholder='Ciudad'
                    value={currentItem?.city}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, city: e.target.value })
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
                    variant='standard'
                    label='Estado'
                    focused
                    value={currentItem?.state}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, state: e.target.value })
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
                    label='País'
                    variant='standard'
                    focused
                    value={currentItem?.country}
                    placeholder=''
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        country: e.target.value
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
                    label='Codigo Postal'
                    variant='standard'
                    focused
                    placeholder=''
                    value={currentItem?.postal_code}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        postal_code: e.target.value
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
        </div>
        {id !== 'new' ? (
          <div style={{ height: '30px', margin: '40px' }}>
            <Button
              sx={{ marginTop: '10px' }}
              color='success'
              variant='contained'
                style={{ textDecoration: 'none', color: 'white' }}
                onClick={() => {
                  addPatient(currentItem)
                  Swal.fire({
                    title: 'Paciente Modificado',
                    text: 'El Paciente se ha modificado correctamente',
                    icon: 'success'
                  })
                }}
              >
                Actualizar Datos
            </Button>
            <Button
              sx={{ marginTop: '10px' }}
              variant='contained'
              color='error'
            >
              <NavLink
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/patients`}
                onClick={() => {
                  Swal.fire({
                    title: 'Se elimino el Paciente',
                    text: 'Se ha eliminado el Paciente correctamente',
                    icon: 'success'
                  })
                }}
                variant='outlined'
              >
                Eliminar
              </NavLink>
            </Button>
          </div>
        ) : (
          <div style={{ height: '30px', margin: '40px' }}>
            <Button
              sx={{ marginTop: '10px' }}
              variant='contained'
              color='success'
                style={{ textDecoration: 'none', color: 'white' }}
                onClick={() => {
                  addPatient(currentItem)
                  Swal.fire({
                    title: 'Paciente agregado',
                    text: 'El Paciente se ha agregado correctamente',
                    icon: 'success'
                  })
                }}
              >
                Agregar Paciente
            </Button>
          </div>
        )}
        <h2>Expediente</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: '20px',
            margin: '50px'
          }}
        >
          {appointments.length > 0 && (<>
            {appointments.map((a, index) => {
              if (a.status !== 'CANCELADA') {
                return (<div key={a.date}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>Fecha: {a.date}</h3>
                    <h3>Estado: {a.status}</h3>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p>Tratamiento: {a.treatments.name}</p>
                    <p>Medico: {a.doctor.name + " " + a.doctor.father_lastname}</p>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p>Precio: ${a.treatments.price}</p>
                    <Button
                        sx={{ marginTop: '10px', marginBottom: '10px' }}
                        variant='contained'
                        style={{ textDecoration: 'none', color: 'white' }}
                        onClick={() => {
                          history.push(`/appointments/${a.id}`)
                        }}
                      >
                        Detalles de cita
                      </Button>
                  </div>
                  <Divider />
                </div>)
              }
            })}
          </>)}
        </div>
      </Box>
    </div>
  )
}
