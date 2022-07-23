import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchAppointments = createAsyncThunk(
	'appointments/fetchAppointments',
	async () => {
		const response = await fetch(
			'https://dentistry-app-614cd-default-rtdb.firebaseio.com/appointments.json'
		)
		const data = await response.json()
		return data
	}
)

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
			state.appointments = [...state.appointments, newAppointment]
		},
		deleteAppointment: (state, action) => {
			state.appointments = state.appointments.filter(
				(appointment) => appointment.id !== action.payload
			)
		},
		replaceAppointments: (state, action) => {
			state.appointments = action.payload
		},
	},
	// extraReducers: {
	// 	[fetchAppointments.fulfilled]: (state, action) => {
	// 		state.appointments = action.payload
	// 	},
	// },
})

export const appointmentActions = appointmentSlice.actions
export default appointmentSlice
