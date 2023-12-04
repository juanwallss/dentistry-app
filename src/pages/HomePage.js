import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useMemo, useEffect, useState } from 'react'
import { Container } from '@mui/material'

export default function HomePage() {
	const [citas, setAppointments] = useState([])
	const [options, setOptions] = useState([])

	useEffect(() => {
		fetch(
			'http://127.0.0.1:8000/api/chart-citas'
		)
			.then((res) => res.json())
			.then((info) => {
				const response = info.map(ap => {
					return {
						...ap,
						doctor_name: ap.doctor.nombre,
						patient_name: ap.patient.nombre
					}
				})
				setAppointments(Object.values(response))
			}).finally(() => {
				if (citas.length > 0) {
					const pendingCount = citas.filter(ap => ap.status === "AGENDADA")
					const doneCount = citas.filter(ap => ap.status === "REALIZADA")
					const canceledCount = citas.filter(ap => ap.status === "CANCELADA")
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
								text: `Citas: ${citas.length}.`,
							},
							series: [
								{
									data: [
										{
											nombre: `Agendadas: ${pendingCount.length}`,
											y: pendingCount.length,
											x: citas,
										},{
											nombre: `Realizadas: ${doneCount.length}`,
											y: doneCount.length,
											x: citas,
										},{
											nombre: `Canceladas: ${canceledCount.length}`,
											y: canceledCount.length,
											x: citas,
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
	}, [citas])

	
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
