import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import windowDimensionsNumSelector from '@state/selectors/windowDimensionsNumSelector'
import { useAtomValue } from 'jotai'

const TransactionTypeToggleButtons = ({ value, onChange }) => {
  const windowDimensionsNum = useAtomValue(windowDimensionsNumSelector)

  const handleToggle = (key) => {
    const next = { ...value, [key]: !value[key] }
    if (!next.income && !next.expense) {
      const fallbackKey = key === 'income' ? 'expense' : 'income'
      next[fallbackKey] = true
    }
    onChange(next)
  }

  return (
    <ButtonGroup size={windowDimensionsNum < 2 ? 'small' : undefined}>
      <Button
        onClick={() => handleToggle('income')}
        variant={value.income ? 'contained' : 'outlined'}
        color="inherit"
        sx={{
          color: value.income ? '#ffffff' : '#22c55e',
          borderColor: '#22c55e',
          backgroundColor: value.income ? '#22c55e' : 'transparent',
          '&:hover': {
            borderColor: '#16a34a',
            backgroundColor: value.income
              ? '#16a34a'
              : 'rgba(34, 197, 94, 0.08)',
          },
        }}
      >
        Доход
      </Button>
      <Button
        onClick={() => handleToggle('expense')}
        variant={value.expense ? 'contained' : 'outlined'}
        color="inherit"
        sx={{
          color: value.expense ? '#ffffff' : '#ef4444',
          borderColor: '#ef4444',
          backgroundColor: value.expense ? '#ef4444' : 'transparent',
          '&:hover': {
            borderColor: '#dc2626',
            backgroundColor: value.expense
              ? '#dc2626'
              : 'rgba(239, 68, 68, 0.08)',
          },
        }}
      >
        Расход
      </Button>
    </ButtonGroup>
  )
}

export default TransactionTypeToggleButtons
