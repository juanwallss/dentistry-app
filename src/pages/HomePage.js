import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState, useMemo } from 'react'
import {
	Box,
	TextField,
	Fab,
	Button,
	Modal,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Container,
} from '@mui/material'
export default function HomePage() {
	return (
		<div>
			<Container>
				<HighchartsReact highcharts={Highcharts} />
				<h1>Graficas</h1>
			</Container>
		</div>
	)
}
