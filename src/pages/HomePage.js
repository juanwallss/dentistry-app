import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useMemo } from 'react'
import { Container } from '@mui/material'
import { useSelector } from 'react-redux'
import moment from 'moment'
export default function HomePage() {
	const appointments = useSelector((state) => state.appointment.appointments)
	const orders = useMemo(() => {
		if (appointments.length > 0) {
			return [
				{
					name: `Pendientes: ${appointments.length}`,
					y: appointments.length,
					x: appointments,
				},
			]
		}
		return []
	}, [appointments])

	const options = useMemo(() => {
		return [
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
						data: orders,
						animation: true,
						colorByPoint: true,
					},
				],
			},
		]
	}, [])
	return (
		<div>
			<Container>
				<h1>Citas.</h1>
				<HighchartsReact highcharts={Highcharts} options={options[0]} />
			</Container>
		</div>
	)
}
