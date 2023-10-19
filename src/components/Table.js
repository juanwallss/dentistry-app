import React, {useEffect, useState} from 'react'
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
  const [searchText, setSearchText] = useState('')
  const [filteredRows, setFilteredRows] = useState([])
  const { title = '', columns = [], rows = [], handleClick = null ,  onDelete = null, onUpdate = null, actions = false } = props

  
  useEffect(() => {
    setFilteredRows(rows.filter((row) =>
      Object.values(row).some((value) =>
        value !== null && value !== undefined &&
        value.toString().toLowerCase()
          .includes(searchText.toLowerCase())
      )
    ));
  }, [searchText, rows]);

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
                    {actions && (<>
                      <TableCell align='center'>
                      <ButtonGroup variant="contained">
                        {onUpdate && (<>
                          <IconButton color="success" onClick={() => onUpdate(row.id)}>
                          <EditIcon />
                        </IconButton></>)}
                        {onDelete && (
                          <>
                          <IconButton color='error' variant='outlined' aria-label="delete" onClick={() => onDelete(row.id)}>
                          <DeleteIcon />
                        </IconButton></>
                        )}
                      </ButtonGroup>
                    </TableCell></>)}
                  </StyledTableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
