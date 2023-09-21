import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPatients = createAsyncThunk(
	'patient/getPatients',
	async (dispatch, getState) => {
		return await fetch('http://127.0.0.1:8000').then(
			(res) => res.json()
		)
	}
)

const patientSlice = createSlice({
	name: 'patients',
	initialState: {
		patients: [],
		id: 0,
		status: null,
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
	// extraReducers: {
	// 	[getPatients.pending]: (state, action) => {
	// 		state.status = 'loading'
	// 	},
	// 	[getPatients.fulfilled]: (state, action) => {
	// 		state.status = 'Success'
	// 		state.patients = action.payload
	// 	},
	// 	[getPatients.rejected]: (state, action) => {
	// 		state.status = 'Error'
	// 	},
	// },
})

export const patientActions = patientSlice.actions
export default patientSlice
