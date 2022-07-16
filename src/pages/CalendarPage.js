import React, { useEffect, useState, useMemo } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useSelector } from 'react-redux'
import {
	Box,
	TextField,
	Fab,
	Button,
	Modal,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Container,
} from '@mui/material'

export default function CalendarPage() {
	const [events, setEvents] = useState([])
	const appointments = useSelector((state) => state.appointment.appointments)
	useEffect(() => {
		setEvents(appointments)
	}, [appointments])
	const calendarEvents = useMemo(() => {
		return events.map((item) => {
			return {
				title: item.procedure,
				start: item.date,
			}
		})
	}, [events])
	return (
		<div>
			<Container>
				<FullCalendar
					events={calendarEvents}
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					locale={'es'}
					handleWindowResize={true}
					height={'calc(100vh - 200px)'}
					showNonCurrentDates={false}
					dayMaxEventRows={3}
					moreLinkText={'más'}
					buttonText={{
						today: 'Hoy',
					}}
				/>
			</Container>
		</div>
	)
}
