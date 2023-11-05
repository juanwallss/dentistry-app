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
import Navbar from './components/Navbar'
import DoctorsIndividualPage from './pages/DoctorsIndividualPage'
import PatientsIndividualPage from './pages/PatientsIndividualPage'
import AppointmentsIndividualPage from './pages/AppointmentsIndividualPage'
import SpecialtiesPage from './pages/SpecialtiesPage'
import SpecialtiesIndividualPage from './pages/SpecialtiesIndividualPage'
import TreatmentsPage from './pages/TreatmentsPage'
import TreatmentsIndividualPage from './pages/TreatmentsIndividualPage'

function App() {
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
								<CalendarPage />
							</Route>
							<Route exact path="/appointments">
								<AppointmentsPage />
							</Route>
							<Route exact path="/patients">
								<PatientPage />
							</Route>
							<Route exact path="/doctors">
								<DoctorsPage />
							</Route>
							<Route path="/doctors/:id">
								<DoctorsIndividualPage />
							</Route>
							<Route path="/patients/:id">
								<PatientsIndividualPage />
							</Route>
							<Route path="/appointments/:id">
								<AppointmentsIndividualPage />
							</Route>
							<Route exact path="/specialties">
								<SpecialtiesPage />
							</Route>
							<Route exact path="/treatments">
								<TreatmentsPage />
							</Route>
							<Route path="/treatments/:id">
								<TreatmentsIndividualPage />
							</Route>
							<Route path="/specialties/:id">
								<SpecialtiesIndividualPage />
							</Route>
						</Switch>
					</main>
				</ScopedCssBaseline>
			</ThemeProvider>
		</div>
	)
}

export default App
