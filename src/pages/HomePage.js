import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { Container } from '@mui/material'
export default function HomePage() {
	return (
		<div>
			<Container>
				<h1>Graficas</h1>
				<HighchartsReact highcharts={Highcharts} />
			</Container>
		</div>
	)
}
