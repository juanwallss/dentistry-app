import { createSlice } from '@reduxjs/toolkit'

const doctorSlice = createSlice({
	name: 'doctores',
	initialState: {
		doctores: [],
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
				state.doctores.push(newPatient)
			} else {
				alert('Campos son obligatorios')
			}
		},
		eliminadooctor: (state, action) => {
			state.doctores = state.doctores.filter(
				(doctor) => doctor.id !== action.payload
			)
		},
	},
})

export const doctorActions = doctorSlice.actions
export default doctorSlice
