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
  Button,
} from '@mui/material'

function TreatmentsIndividualPage() {
  const history = useHistory()
  const { id } = useParams()
  const [currentItem, setCurrentItem] = useState({})
  const addTreatment = async (item) => {
    if (id === 'new') {
      await axios
        .post('http://127.0.0.1:8000/api/tratamientos', 
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
        .put(`http://127.0.0.1:8000/api/tratamientos/${id}`, 
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
    axios.get(`http://127.0.0.1:8000/api/tratamientos/${id}`).then((res) => {
      if(res.data.status === 404) {
        Swal.fire({
          title: `No se encontró registro con el id: ${id}. Desea crear nuevo?`,
          showDenyButton: true,
          confirmButtonText: 'Crear nuevo',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push(`/tratamientos/new`)
            window.location.reload()
      } else if (result.isDenied) {
           }
        })
      } else {
        history.push(`/tratamientos/${id}`)
        setCurrentItem(res.data)
      }
    })
  }

  useEffect(() => {
    if (id !== 'new') {
      axios.get(`http://127.0.0.1:8000/api/tratamientos/${id}`).then((res) => {
        setCurrentItem({
          ...res.data
        })
      })
    }
  }, [id])

  return (
    <div>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
      >
      {id !== 'new' ? <h1>Editar Tratamiento</h1> : <h1>Nuevo Tratamiento</h1>}
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
                    value={currentItem?.nombre}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, nombre: e.target.value })
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
                    label='Precio'
                    variant='standard'
                    placeholder='Precio'
                    focused
                    value={currentItem?.precio}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, precio: e.target.value })
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
                    label='Descripción'
                    variant='standard'
                    value={currentItem?.descripcion}
                    focused
                    placeholder='Descripción'
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        descripcion: e.target.value
                      })
                    }
                  />
                </Grid>
                </div>
                </Grid>
                </Grid>
                {id !== 'new' ? (
          <div style={{ height: '30px', margin: '40px' }}>
            <Button
              sx={{ marginTop: '10px' }}
              color='success'
              variant='contained'
                style={{ textDecoration: 'none', color: 'white' }}
                onClick={() => {
                  addTreatment(currentItem)
                  Swal.fire({
                    title: 'Tratamiento Modificado',
                    text: 'El Tratamiento se ha modificado correctamente',
                    icon: 'success'
                  })
                }}
              >
                Actualizar Tratamiento
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
                  addTreatment(currentItem)
                  Swal.fire({
                    title: 'Tratamiento agregado',
                    text: 'El Tratamiento se ha agregado correctamente',
                    icon: 'success'
                  })
                }}
              >
                Agregar Tratamiento
            </Button>
          </div>
        )}
        </div>
      </Box>
    </div>
  )
}

export default TreatmentsIndividualPage