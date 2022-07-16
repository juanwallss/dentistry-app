import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState, useMemo } from 'react'

export default function HomePage() {
	return (
		<div>
			<HighchartsReact highcharts={Highcharts} />
			<h1>Graficas</h1>
		</div>
	)
}
