import React, { useEffect, useState, useMemo } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { style } from '../theme/styles'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
import { useSelector } from 'react-redux'
import {
	Box,
	Modal,
	Typography,
	Container,
	Card,
	CardContent,
} from '@mui/material'

export default function CalendarPage() {
	const [events, setEvents] = useState([])
	const [modalInfo, setModalInfo] = useState([])
	const [openModal, setOpenModal] = useState(false)
	const appointments = useSelector((state) => state.appointment.appointments)
	useEffect(() => {
		setEvents(Object.values(appointments))
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
			<Container sx={{ marginTop: '20px' }}>
				<FullCalendar
					events={calendarEvents}
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					locale={'es'}
					handleWindowResize={true}
					height={'calc(100vh - 200px)'}
					showNonCurrentDates={false}
					dayMaxEventRows={3}
					moreLinkText={'más'}
					eventClick={(info) => {
						let list = events.filter((e) => {
							return e.date === info.event.startStr
						})
						setModalInfo(list)
						setOpenModal(true)
						console.log(list)
					}}
					moreLinkClick={(info) => {
						let date = moment(info.date).add(1, 'day').format('YYYY-MM-DD')
						let list = events.filter((e) => {
							return e.date === date
						})
						console.log(list)
						setModalInfo(list)
						setOpenModal(true)
						return 'none'
					}}
					dateClick={(info) => {
						let list = events.filter((e) => {
							return e.date === info.dateStr
						})

						if (list.length > 0) {
							setModalInfo(list)
							setOpenModal(true)
						}
						console.log(list)
					}}
					buttonText={{
						today: 'Hoy',
					}}
				/>
			</Container>

			<Modal
				open={openModal}
				onClose={() => {
					setOpenModal(false)
					setModalInfo([])
				}}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<Box sx={style}>
					<Typography variant="h6" id="modal-title">
						Citas del dia {moment(modalInfo[0]?.date).format('DD-MM-YYYY')}
					</Typography>
					<div>
						{modalInfo.map((item) => {
							return (
								<Card style={{ margin: '10px', boxShadow: '1px 1px' }}>
									<CardContent>
										<Typography variant="h5" component="h2">
											Paciente: {item.patient}
										</Typography>
										<Typography variant="h6" component="h2">
											Procedimiento: {item.procedure}
										</Typography>
										<Typography variant="body2" component="p">
											Doctor: {item.doctor}
										</Typography>
										<Typography variant="body2" component="p">
											Hora: {item.time}
										</Typography>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</Box>
			</Modal>
		</div>
	)
}
