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
  Button
} from '@mui/material'


export default function PatientsIndividualPage(props) {
  const { id } = useParams()
  const [currentItem, setCurrentItem] = useState({})
	const history = useHistory()

  const addSpecialty = async (item) => {
    console.log(item)
    if (id === 'new') {
      await axios
        .post('http://127.0.0.1:8000/api/especialidades', 
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
        .put(`http://127.0.0.1:8000/api/especialidades/${id}`, 
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
  const handleBlur = (id) => {
    axios.get(`http://127.0.0.1:8000/api/especialidades/${id}`).then((res) => {
      if(res.data.status === 404) {
        setCurrentItem({
          id: null,
          nombre: null
        })
        Swal.fire({
          title: `No se encontró registro con el id: ${id}. Desea crear nuevo?`,
          showDenyButton: true,
          confirmButtonText: 'Crear nuevo',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
          history.push(`/especialidades/new`)
          window.location.reload()
          } else if (result.isDenied) {
           }
        })
      } else {
        history.push(`/especialidades/${id}`)
        setCurrentItem(res.data)
      }
    })
  }

  useEffect(() => {
    if (id !== 'new') {
      axios.get(`http://127.0.0.1:8000/api/especialidades/${id}`).then((res) => {
        setCurrentItem(res.data)
      })
    } else {
      setCurrentItem()
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
                    label='ID'
                    variant='standard'
                    placeholder='ID'
                    disabled={id === 'new'}
                    focused
                    value={currentItem?.id}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, id: e.target.value })
                    }
                    onBlur={(e) => {
                      handleBlur(e.target.value)
                    }}
                  />
                </Grid>
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
                    value={currentItem?.nombre}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, nombre: e.target.value })
                    }
                  />
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
            >
              <NavLink
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/especialidades`}
                onClick={() => {
                  addSpecialty(currentItem)
                  Swal.fire({
                    title: 'Especialidad Modificada',
                    text: 'Especialidad se ha modificado correctamente',
                    icon: 'success'
                  })
                }}
              >
                Actualizar Especialidad
              </NavLink>
            </Button>
          </div>
        ) : (
          <div style={{ height: '30px', margin: '40px' }}>
            <Button
              sx={{ marginTop: '10px' }}
              variant='contained'
              color='success'
            >
              <NavLink
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/especialidades`}
                onClick={() => {
                  addSpecialty(currentItem)
                  Swal.fire({
                    title: 'Especialidad creada',
                    text: 'La especialidad se ha creado correctamente',
                    icon: 'success'
                  })
                }}
              >
                Crear
              </NavLink>
            </Button>
          </div>
        )}
      </Box>
    </div>
  )
}
