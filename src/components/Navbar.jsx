import React, { useState, useEffect } from 'react';
import './Navbar.modules.css';

function Navbar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Función para actualizar la fecha y la hora cada segundo
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  // Formatear la fecha y la hora
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  return ( 
    <div className="main"> 
      <div className='inner'>
        <div>Instituto Tecnológico de Mexicali</div>
      </div>
      <div className='inner'>
        <div>Fecha: {formattedDate}</div>
        <div>Hora: {formattedTime}</div>
      </div>
    </div>
  );
}

export default Navbar;
