import { createSlice } from '@reduxjs/toolkit'

const patientSlice = createSlice({
	name: 'patients',
	initialState: {
		patients: [],
		id: 0,
	},
	reducers: {
		addPatient: (state, action) => {
			const newId = state.id + 1
			state.id++
			const newPatient = {
				id: newId,
				...action.payload,
			}
			state.patients.push(newPatient)
		},
		deletePatient: (state, action) => {
			state.patients = state.patients.filter(
				(patient) => patient.id !== action.payload
			)
		},
	},
})

export const patientActions = patientSlice.actions
export default patientSlice
