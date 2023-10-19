import React, { useState, useEffect } from 'react'
import './Navbar.modules.css'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

function Navbar() {
  const history = useLocation()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [pos, setPos] = useState('')
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])
  useEffect(() => {
    const path = history.pathname.split('/').filter((x) => x)
    const nombre = path[0]
    let posi = ''
    switch (nombre) {
      case 'doctors':
        posi = 'Mantenimiento de Doctores'
        break
      case 'appointments':
        posi = 'Mantenimiento de Citas'
        break
      case 'patients':
        posi = 'Catalogo de Pacientes'
        break
        case 'calendar':
          posi = 'Calendario'
          break
          case 'specialties':
            posi = 'Catalogo Especialidades'
            break
      default:
        posi = ''
        break
    }
    setPos(posi)
  }, [history])

  const formattedDate = currentDate.toLocaleDateString()
  const formattedTime = currentDate.toLocaleTimeString()

  return (
    <div className='main'>
      <div className='inner'>
        <div>Instituto Tecnológico de Mexicali</div>
        <div>{pos}</div>
      </div>
      <div className='inner'>
        <div>Fecha: {formattedDate}</div>
        <div>Hora: {formattedTime}</div>
      </div>
    </div>
  )
}

export default Navbar
