import React, { useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Badge,
  Menu,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { NewsContext } from '../NewsContext'
import { SelectChangeEvent } from '@mui/material'
import { DistrictType } from '../types/DistrictType'
import { Nav } from 'react-bootstrap'

export default function NavBar() {
  const { state, dispatch } = useContext(NewsContext)
  const { user, logoutModalOpen } = state

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

  const handleLogout = () => {
    dispatch({ type: 'USER_SIGNOUT' })
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    //50 % transparent AppBar
    <AppBar position="sticky" sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Nyhet Snaps
        </Typography>
        <Select
          value={state.district}
          onChange={handleDistrictChange}
          style={{ marginRight: 20 }}
        >
          {districts.map((district) => (
            <MenuItem value={district} key={district}>
              {district}
            </MenuItem>
          ))}
        </Select>
        {user ? (
          <div>
            <IconButton
              color="inherit"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {' '}
              {/* Closing bracket was missing */}
              <Badge color="primary">
                <AccountCircle />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Nav.Link href="/login">Login</Nav.Link>
        )}
      </Toolbar>
    </AppBar>
  )
}
