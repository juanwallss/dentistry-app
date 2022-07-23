import { createSlice } from '@reduxjs/toolkit'

const doctorSlice = createSlice({
	name: 'doctors',
	initialState: {
		doctors: [],
		id: 0,
	},
	reducers: {
		addDoctor: (state, action) => {
			const newItem = action.payload
			const newId = state.id + 1
			state.id++
			if (newItem.hasOwnProperty('name')) {
				const newPatient = {
					...newItem,
					id: newId,
				}
				state.doctors.push(newPatient)
			} else {
				alert('Campos son obligatorios')
			}
		},
		deleteDoctor: (state, action) => {
			state.doctors = state.doctors.filter(
				(doctor) => doctor.id !== action.payload
			)
		},
	},
})

export const doctorActions = doctorSlice.actions
export default doctorSlice
