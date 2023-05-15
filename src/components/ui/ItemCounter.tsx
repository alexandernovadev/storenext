import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'

interface Props {
  currentValue: number
  maxValue: number

  // Methods
  updateQuantity: (quantity: number) => void
}

export const ItemCounter = ({
  currentValue,
  updateQuantity,
  maxValue,
}: Props) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => updateQuantity(Math.max(currentValue - 1, 1))}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton
        onClick={() => updateQuantity(Math.min(currentValue + 1, maxValue))}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
