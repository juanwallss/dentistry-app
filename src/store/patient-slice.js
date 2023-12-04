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
	name: 'pacientes',
	initialState: {
		pacientes: [],
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
			state.pacientes.push(newPatient)
		},
		deletePatient: (state, action) => {
			state.pacientes = state.pacientes.filter(
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
	// 		state.pacientes = action.payload
	// 	},
	// 	[getPatients.rejected]: (state, action) => {
	// 		state.status = 'Error'
	// 	},
	// },
})

export const patientActions = patientSlice.actions
export default patientSlice
