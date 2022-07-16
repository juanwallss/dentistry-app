import './App.css'
import SideBar from './components/SideBar'
import HomePage from './pages/HomePage'
import AppointmentsPage from './pages/AppointmentsPage'
import PatientPage from './pages/PatientPage'
import CalendarPage from './pages/CalendarPage'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
function App() {
	return (
		<div className="App">
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
				</Switch>
			</main>
		</div>
	)
}

export default App
