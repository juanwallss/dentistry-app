import * as React from 'react'
import HomeIcon from '@mui/icons-material/Home'

import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Container,
	Button,
	Tooltip,
	MenuItem,
} from '@mui/material'

import { NavLink } from 'react-router-dom'

const pages = [
	{ name: 'Inicio', link: '/main' },
	{ name: 'Calendario', link: '/calendar' },
	{ name: 'Citas', link: '/appointments' },
	{ name: 'Pacientes', link: '/patients' },
	{ name: 'Doctores', link: '/doctors' },
	{ name: 'Especialidades', link: '/specialties' },
]
const SideBar = () => {
	return (
		<AppBar secondary position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<NavLink
								style={{ textDecoration: 'none', color: 'white' }}
								to={page.link}
								key={page.name}
							>
								<Button
									variant="contained"
									key={page.name}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page.name}
								</Button>
							</NavLink>
						))}
					</Box>
					<HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						DentAppointments
					</Typography>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default SideBar
