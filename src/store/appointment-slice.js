import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const appointmentSlice = createSlice({
	name: 'citas',
	initialState: {
		citas: [],
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
			state.citas = [...state.citas, newAppointment]
		},
		deleteAppointment: (state, action) => {
			state.citas = state.citas.filter(
				(appointment) => appointment.id !== action.payload
			)
		},
		replaceAppointments: (state, action) => {
			state.citas = action.payload
		},
	},
	// extraReducers: {
	// 	[fetchAppointments.fulfilled]: (state, action) => {
	// 		state.citas = action.payload
	// 	},
	// },
})

export const appointmentActions = appointmentSlice.actions
export default appointmentSlice
