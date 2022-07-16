import { configureStore } from '@reduxjs/toolkit'
import patientSlice from './patient-slice'
import appointmentSlice from './appointment-slice'
export const store = configureStore({
	reducer: {
		patient: patientSlice.reducer,
		appointment: appointmentSlice.reducer,
	},
})
