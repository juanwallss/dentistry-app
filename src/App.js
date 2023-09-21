import './App.css'
import React, { useState, useEffect } from 'react'
import SideBar from './components/SideBar'
import HomePage from './pages/HomePage'
import AppointmentsPage from './pages/AppointmentsPage'
import PatientPage from './pages/PatientPage'
import CalendarPage from './pages/CalendarPage'
import DoctorsPage from './pages/DoctorsPage'
import { theme } from './theme'
import { ThemeProvider } from '@mui/material/styles'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPatients } from './store/patient-slice'
import { fetchAppointments } from './store/appointment-slice'
import Navbar from './components/Navbar'

function App() {
	const dispatch = useDispatch()
	const patients = useSelector((state) => state.patient.patients)
	const appointments = useSelector((state) => state.appointment.appointments)
	useEffect(() => {
		dispatch(getPatients())
		dispatch(fetchAppointments())
	}, [])
	return (
		<div className="App">
			<Navbar />
			<ThemeProvider theme={theme}>
				<ScopedCssBaseline>
					<SideBar />
					<main>
						<Switch>
							<Route path="/main">
								<HomePage />
							</Route>
							<Route path="/calendar">
								{/* <h1>Aqui va el calendario</h1> */}
								<CalendarPage />
							</Route>
							<Route path="/appointments">
								{/* <h1>Lista de Citas</h1> */}
								<AppointmentsPage />
							</Route>
							<Route path="/patients">
								<PatientPage />
							</Route>
							<Route path="/doctors">
								<DoctorsPage />
							</Route>
						</Switch>
					</main>
				</ScopedCssBaseline>
			</ThemeProvider>
		</div>
	)
}

export default App
