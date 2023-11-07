import * as React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material'
import { NavLink, useHistory } from 'react-router-dom'

const pages = [
  // { name: 'Inicio', link: '/main', options: [] },
  { name: 'Calendario', link: '/calendar', options: [] },
	{
		name: 'Mantenimientos',
		link: '/maintenances',
		options: [
			{
				name: 'Citas',
				link: '/appointments',
			},
		  { 
				name: 'Doctores', 
				link: '/doctors'
			},
		],
	},
  {
    name: 'Catálogos',
    link: '/catalogs',
    options: [
      {
        name: 'Pacientes',
        link: '/patients',
      },
      {
        name: 'Especialidades',
        link: '/specialties',
      },
      {
        name: 'Tratamientos',
        link: '/treatments'
      }
    ],
  }, {
    name: 'Reportes',
    options: [
      {
        name: 'Reporte de citas por doctor',
        link: '/report_by_doctor',
      }, {
        name: 'Reporte de citas por paciente',
        link: '/report_by_patient',
      }
    ]
  }
]

const SideBar = () => {
	const history = useHistory()
  const [popoverAnchor, setPopoverAnchor] = React.useState(null)
  const [popoverOptions, setPopoverOptions] = React.useState([])

  const openPopover = (page, event) => {
    if (page.options.length > 0) {
      setPopoverAnchor(event.currentTarget)
      setPopoverOptions(page.options)
    } else {
      if (window.location.pathname !== page.link) {
        history.push(page.link)
      }
    }
  }

  const closePopover = () => {
    setPopoverAnchor(null)
    setPopoverOptions([])
  }

  return (
    <AppBar secondary position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <div key={page.name}>
                <Button
                  variant="contained"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={(event) => openPopover(page, event)}
                >
                  {page.name}
                </Button>
              </div>
            ))}
          </Box>
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
      <Popover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          {popoverOptions.map((option) => (
            <ListItem disablePadding key={option.name}>
              <ListItemButton
                variant="contained"
                sx={{ my: 2, color: 'black' }}
                component={NavLink}
                to={option.link}
                onClick={closePopover}
              >
                {option.name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </AppBar>
  )
}

export default SideBar
