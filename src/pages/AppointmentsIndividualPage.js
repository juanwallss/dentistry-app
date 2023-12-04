import * as React from 'react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { Link, useParams, useHistory } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Card,
  CardContent,
  Grid
} from '@mui/material'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function AppointmentsIndividualPage(props) {
  const history = useHistory()
  const { id } = useParams()
  const [currentItem, setCurrentItem] = useState({})
  const [patient, setPatient] = useState({})
  const [pacientes, setPatients] = useState([])
  const [doctor, setDoctor] = useState({})
  const [treatment, setTreatment] = useState({})
  const [tratamientos, setTreatments] = useState([])
  const [doctores, setDoctors] = useState([])
  const [isEliminado, setIsEliminado] = useState(false)
  const [initialTimeArr, setInitialTimesArr] = useState([])
  const [initialTime, setInitialTime] = useState({})
  const [endTime, setEndTime] = useState({})
  const [endTimeArr, setEndTimeArr] = useState([])

  const fetchDoctors = () => {
		return fetch('http://127.0.0.1:8000/api/doctores')
			.then((res) => res.json())
	}
	
	const fetchPatients = () => {
		return fetch('http://127.0.0.1:8000/api/pacientes')
			.then((res) => res.json())
	}
	
	const fetchTreatments = () => {
		return fetch('http://127.0.0.1:8000/api/tratamientos')
			.then((res) => res.json())
	}

  const fetchSchedules = () => {
    return fetch('http://127.0.0.1:8000/api/horas')
			.then((res) => res.json())
  }
	
	useEffect(() => {
		Promise.all([fetchDoctors(), fetchPatients(), fetchTreatments(), fetchSchedules()])
			.then(([doctoresData, pacientesData, tratamientosData, horasData]) => {
				setDoctors(doctoresData)
				setPatients(pacientesData)
				setTreatments(tratamientosData)
        setInitialTimesArr(horasData)
        setEndTimeArr(horasData)
			})
			.catch((err) => console.log(err))
	}, [])
	
  const addAppointment = async (item) => {
		if (id === 'new') {
      await axios
        .post('http://127.0.0.1:8000/api/citas', 
          item
        )
        .then(() => {
          history.push(`/citas/${id}`)
    		  setCurrentItem(item)
          Swal.fire({
            title: 'Cita creada',
            text: `Cita agendada exitosamente`,
            icon: 'success'
          })
        })
        .catch((err) => {
          console.log(err.response.data.error)
          return Swal.fire({
            title: 'Error',
            text: `${err.response.data.error} Favor de seleccionar otro horario`,
            icon: 'error'
          })
        })
    } else {
      await axios
        .put(`http://127.0.0.1:8000/api/citas/${id}`, 
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

  const deleteAppointment = async (id) => {
    await axios
    .delete(`http://127.0.0.1:8000/api/citas/${id}
    `).then(() => {
      history.push(`/citas/${id}`)
      updateCurrentItem()
    })
  }

  const handlePatientBlur = (id) => {
    setPatient(id)
  }

  const handleDoctorBlur = (id) => {
    setDoctor(id)
  }

  const handleTreatmentBlur = (id) => {
    setTreatment(id)
  }
  const updateCurrentItem = () => {
    axios.get(`http://127.0.0.1:8000/api/citas/${id}`).then((res) => {
      setCurrentItem(res.data)
      setDoctor(res.data.doctor_id)
      setPatient(res.data.paciente_id)
      setTreatment(res.data.treatment_id)
      setInitialTime(res.data.initial_time_id)
      setEndTime(res.data.end_time_id)
      if (res.data.status === 'CANCELADA') {
        setIsEliminado(true)
      } else {
        setIsEliminado(false)
      }
    })
  }
	useEffect(() => {
    if (id !== 'new') {
      updateCurrentItem()
    }
  }, [id])

  const handleBlur = (id) => {
    axios.get(`http://127.0.0.1:8000/api/citas/${id}`).then((res) => {
    	if(res.data.status === 404) {
    		Swal.fire({
    			title: `No se encontró registro con el id: ${id}. Desea crear nuevo?`,
    			showDenyButton: true,
    			confirmButtonText: 'Crear nuevo',
    			denyButtonText: `Cancelar`,
    		}).then((result) => {
    			if (result.isConfirmed) {
    				history.push(`/citas/new`)
    				window.location.reload()
    	} else if (result.isDenied) {
    			 }
    		})
    	} else {
    		history.push(`/citas/${id}`)
    		setCurrentItem(res.data)
    	}
    })
  }

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
        <Container>
          {
            isEliminado ? (<><h1>Cita Cancelada</h1></>) : (<>
            {id !== 'new' ? (
            <h1>Editar Cita</h1>
          ) : (
            <h1>Nuevo Cita</h1>
          )}</>)
          }
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '20px'
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
                <Grid
                  item
                  xs={12}
                >
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
              </Grid>
              <Grid
                item
                xs={12}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <TextField
                    required
                    id='standard-required'
                    label='Id Paciente'
                    variant='standard'
                    placeholder='Id Paciente'
                    disabled={isEliminado}
                    focused
                    value={currentItem?.paciente_id}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        paciente_id: e.target.value
                      })
                    }
                    onBlur={(e) => {
                      handlePatientBlur(e.target.value)
                    }}
                  />
                  <TextField
                    required
                    id='standard-required'
                    label='Id Doctor'
                    variant='standard'
                    disabled={isEliminado}
                    placeholder='Id Doctor'
                    focused
                    value={currentItem?.doctor_id}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        doctor_id: e.target.value
                      })
                    }
                    onBlur={(e) => {
                      handleDoctorBlur(e.target.value)
                    }}
                  />
                  <TextField
                    required
                    id='standard-required'
                    label='Id Tratamiento'
                    variant='standard'
                    placeholder='Id Tratamiento'
                    disabled={isEliminado}
                    focused
                    value={currentItem?.treatment_id}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        treatment_id: e.target.value
                      })
                    }
                    onBlur={(e) => {
                      handleTreatmentBlur(e.target.value)
                    }}
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {pacientes.length > 0 ? (
                    <div>
                      <InputLabel id='demo-simple-select-label'>
                        Paciente
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={patient}
                        label='Paciente'
                    disabled={isEliminado}
                    onChange={(event) => {
                          setCurrentItem({
                            ...currentItem,
                            paciente_id: event.target.value
                          })
                          setPatient(event.target.value)
                        }}
                        sx={{ width: '25ch' }}
                      >
                        {pacientes.map((item) => (
                          <MenuItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  ) : (
                    <Card>
                      <CardContent>
                        <Typography>No hay pacientes</Typography>
                      </CardContent>
                    </Card>
                  )}
                  {doctores.length > 0 ? (
                    <div>
                      <InputLabel id='demo-simple-select-label'>
                        Doctor
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={doctor}
                    disabled={isEliminado}
                    label='Doctor'
                        onChange={(event) => {
                          setCurrentItem({
                            ...currentItem,
                            doctor_id: event.target.value,
                          })
                          setDoctor(event.target.value)
                        }}
                        sx={{ width: '25ch' }}
                      >
                        {doctores.map((item) => (
                          <MenuItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  ) : (
                    <Card>
                      <CardContent>
                        <Typography>No hay doctores</Typography>
                      </CardContent>
                    </Card>
                  )}
                  {tratamientos.length > 0 ? (
                    <div>
                      <InputLabel id='demo-simple-select-label'>
                        Tratamiento
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={treatment}
                    disabled={isEliminado}
                    label='Tratamiento'
                        onChange={(event) => {
                          setCurrentItem({
                            ...currentItem,
                            treatment_id: event.target.value
                          })
                          setTreatment(event.target.value)
                        }}
                        sx={{ width: '25ch' }}
                      >
                        {tratamientos.map((item) => (
                          <MenuItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  ) : (
                    <Card>
                      <CardContent>
                        <Typography>No hay Tratamientos</Typography>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <InputLabel id='demo-simple-select-label'>Fecha</InputLabel>
                    <TextField
                      id='standard-required'
                      label=''
                      type='date'
											value={currentItem?.date}
                    disabled={isEliminado}
                    onChange={(e) =>
                        setCurrentItem({ ...currentItem, date: e.target.value })
                      }
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                  <div>
                  {initialTimeArr.length > 0 && (
                    <div>
                      <InputLabel id='demo-simple-select-label'>
                        De
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={initialTime}
                        MenuProps={MenuProps}
                        label='Hora de inicio'
                        disabled={isEliminado}
                        onChange={(event) => {
                              setCurrentItem({
                                ...currentItem,
                                initial_time_id: event.target.value
                              })
                              setInitialTime(event.target.value)
                            }}
                        sx={{ width: '25ch' }}
                      >
                        {initialTimeArr.map((item) => (
                          <MenuItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.time}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  )}
                  </div>
                  
                  <div>
                  {endTimeArr.length > 0 && (
                    <div>
                      <InputLabel id='demo-simple-select-label'>
                        A
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={endTime}
                        MenuProps={MenuProps}
                        label='Hora final'
                        disabled={isEliminado}
                        onChange={(event) => {
                              setCurrentItem({
                                ...currentItem,
                                end_time_id: event.target.value
                              })
                              setEndTime(event.target.value)
                            }}
                        sx={{ width: '25ch' }}
                      >
                        {endTimeArr.map((item) => (
                          <MenuItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.time}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  )}
                  </div>
                  
                </div>
								{id !== 'new' ? (
                    <div style={{display: 'flex', width: '30%', justifyContent: 'space-between'}}>
											<div style={{ height: '30px', marginTop: '40px' }}>
                      <Button
                        sx={{ marginTop: '10px' }}
                        color='success'
                        variant='contained'
                        style={{ textDecoration: 'none', color: 'white' }}
                        onClick={() => {
                          addAppointment(currentItem)
                          Swal.fire({
                            title: 'Cita Modificado',
                            text: 'La Cita se ha modificado correctamente',
                            icon: 'success'
                          })
                        }}
                      >
                        Modificar
                      </Button>
                    </div>
										<div style={{ height: '30px', marginTop: '40px' }}>
                      <Button
                        sx={{ marginTop: '10px' }}
                        color='error'
                        variant='contained'
                        style={{ textDecoration: 'none', color: 'white' }}
                        onClick={() => {
                          deleteAppointment(currentItem.id)
                          Swal.fire({
                            title: 'Cita Modificado',
                            text: 'La Cita se ha eliminado correctamente',
                            icon: 'success'
                          })
                        }}
                      >
                        Cancelar Cita
                      </Button>
                    </div>
										</div>
                  ) : (
                    <div style={{ height: '30px', margin: '40px' }}>
                      <Button
                        sx={{ marginTop: '10px' }}
                        variant='contained'
                        color='success'
                        style={{ textDecoration: 'none', color: 'white' }}
                        onClick={() => {
                          addAppointment(currentItem)
                        }}
                      >
                        Agendar Cita
                      </Button>
                    </div>
                  )}
              </Grid>
            </Grid>

            {/* <TextField
							required
							id="standard-required"
							label="Procedimiento"
							placeholder="Procedimiento"
							onChange={(e) =>
								setCurrentItem({ ...currentItem, procedure: e.target.value })
							}
						/>
						<TextField
							id="standard-required"
							label="Fecha"
							type="date"
							onChange={(e) =>
								setCurrentItem({ ...currentItem, date: e.target.value })
							}
							InputLabelProps={{
								shrink: true,
							  }}
						/>
						<TextField
							id="standard-required"
							label="Hora"
							type="time"
							onChange={(e) =>
								setCurrentItem({ ...currentItem, time: e.target.value })
							}
							InputLabelProps={{
								shrink: true,
							  }}
						/> */}
          </div>
        </Container>
      </Box>
    </div>
  )
}
