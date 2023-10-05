import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField' // Importa TextField de Material-UI
import { styled } from '@mui/material/styles'
import { Button, IconButton, ButtonGroup   } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchText, setSearchText] = React.useState('') // Estado para el texto de búsqueda
  const { title = '', columns = [], rows = [], handleClick = null ,  onDelete = null, onUpdate = null, actions = false} = props

  // Filtrar las filas basadas en el texto de búsqueda
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  )

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1>{title}</h1>
        <TextField
          label='Buscar'
          variant='outlined'
          size='small'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginLeft: '20px' }}
        />
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          stickyHeader
          aria-label='sticky table'
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
              {actions && (
                <>
                  <StyledTableCell align='center'>Acciones</StyledTableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    onClick={() => {
                      if (handleClick) {
                        handleClick(row)
                      }
                    }}
                    key={row.code}
                  >
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                    <TableCell align='center'>
                      <ButtonGroup variant="contained">
                        <IconButton color="success" onClick={() => onUpdate(row.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color='error' variant='outlined' aria-label="delete" onClick={() => onDelete(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ButtonGroup>
                    </TableCell>
                  </StyledTableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
