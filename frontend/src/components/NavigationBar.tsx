import React, { useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Badge,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { NewsContext } from '../NewsContext'
import { NewsSearchType } from '../types/NewsSearchType'
import { SelectChangeEvent } from '@mui/material' // Import this type
import { DistrictType } from '../types/DistrictType'
import { Nav } from 'react-bootstrap'

export default function NavBar() {
  const { state, dispatch } = useContext(NewsContext)
  const { user } = state

  const districts: DistrictType[] = [
    'norge',
    'innlandet',
    'mr',
    'nordland',
    'rogaland',
    'sorlandet',
    'tromsogfinnmark',
    'trondelag',
    'vestfoldogtelemark',
    'vestland',
  ]

  const handleDistrictChange = (event: SelectChangeEvent<string>) => {
    dispatch({
      type: 'DISTRICT_CHANGE',
      payload: event.target.value as DistrictType,
    })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Lazy News
        </Typography>
        <Select
          value={state.district}
          onChange={handleDistrictChange}
          style={{ color: 'white', marginRight: 20 }}
        >
          {districts.map((district) => (
            <MenuItem value={district} key={district}>
              {district}
            </MenuItem>
          ))}
        </Select>
        {user ? (
          <IconButton color="inherit">
            <Badge color="secondary">
              <AccountCircle />
            </Badge>
          </IconButton>
        ) : (
          <Nav.Link href="/login">Login</Nav.Link>
        )}
      </Toolbar>
    </AppBar>
  )
}
