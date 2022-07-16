import { createSlice } from '@reduxjs/toolkit'

const appointmentSlice = createSlice({
	name: 'appointments',
	initialState: {
		appointments: [],
		id: 0,
	},
	reducers: {
		addAppointment: (state, action) => {
			const newId = state.id + 1
			state.id++
			const newAppointment = {
				id: newId,
				...action.payload,
			}
			state.appointments.push(newAppointment)
		},
		deleteAppointment: (state, action) => {
			state.appointments = state.appointments.filter(
				(appointment) => appointment.id !== action.payload
			)
		},
	},
})

export const appointmentActions = appointmentSlice.actions
export default appointmentSlice
