import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useMemo, useEffect, useState } from 'react'
import { Container } from '@mui/material'

export default function HomePage() {
	const [appointments, setAppointments] = useState([])
	const [options, setOptions] = useState([])

	useEffect(() => {
		fetch(
			'http://127.0.0.1:8000/api/chart-appointments'
		)
			.then((res) => res.json())
			.then((info) => {
				const response = info.map(ap => {
					return {
						...ap,
						doctor_name: ap.doctor.name,
						patient_name: ap.patient.name
					}
				})
				setAppointments(Object.values(response))
			}).finally(() => {
				if (appointments.length > 0) {
					const pendingCount = appointments.filter(ap => ap.status === "AGENDADA")
					const doneCount = appointments.filter(ap => ap.status === "REALIZADA")
					const canceledCount = appointments.filter(ap => ap.status === "CANCELADA")
					setOptions([
						{
							chart: {
								type: 'pie',
								height: '550vh',
							},
							width: 5,
							accessibility: {
								point: {
									valueSuffix: '%',
								},
							},
							plotOptions: {
								pie: {
									allowPointSelect: true,
									cursor: 'pointer',
									dataLabels: {
										enabled: true,
									},
			
									showInLegend: true,
									enableMouseTracking: true,
								},
							},
							title: {
								text: `Citas: ${appointments.length}.`,
							},
							series: [
								{
									data: [
										{
											name: `Agendadas: ${pendingCount.length}`,
											y: pendingCount.length,
											x: appointments,
										},{
											name: `Realizadas: ${doneCount.length}`,
											y: doneCount.length,
											x: appointments,
										},{
											name: `Canceladas: ${canceledCount.length}`,
											y: canceledCount.length,
											x: appointments,
										},
									],
									animation: false,
									colorByPoint: true,
								},
							],
						},
					])
				}
			})
	}, [appointments])

	
	return (
		<div>
			<Container>
				<h1>Citas.</h1>
				{options.length > 0 ? 
				<HighchartsReact highcharts={Highcharts} options={options[0]} /> : <></>}
			</Container>
		</div>
	)
}
