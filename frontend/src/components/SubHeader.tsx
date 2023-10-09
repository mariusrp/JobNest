import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import ToggleButton from '@mui/lab/ToggleButton'
import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup'
import { styled } from '@mui/system'
import { useContext } from 'react'
import { NewsContext } from '../NewsContext'
import { CategoryType } from '../types/CategoryType'

// You can style the ToggleButtonGroup and ToggleButton if desired
const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  // Your styles here
})

const StyledToggleButton = styled(ToggleButton)({
  // Your styles here
})

export default function Subheader() {
  const { state, dispatch } = useContext(NewsContext)
  const { category } = state
  const categories: CategoryType[] = [
    'norge',
    'urix',
    'sport',
    'kultur',
    'livsstil',
    'viten',
    'ytring',
  ]

  const handleCategoryChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: CategoryType
  ) => {
    dispatch({ type: 'CATEGORY_CHANGE', payload: newCategory })
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <StyledToggleButtonGroup
          value={category}
          exclusive
          onChange={handleCategoryChange}
          aria-label="category selection"
        >
          {categories.map((cat) => (
            <StyledToggleButton value={cat} key={cat} aria-label={cat}>
              {cat.toUpperCase()}
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </Toolbar>
    </AppBar>
  )
}
