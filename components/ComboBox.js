import cn from 'classnames'
import InputWrapper from './InputWrapper'
import { useMemo } from 'react'

const ComboBox = ({
  label,
  defaultValue,
  value,
  onChange,
  placeholder,
  items,
  disabled = false,
  labelClassName,
  selectClassName,
  wrapperClassName,
  className,
  hidden,
  paddingX = true,
  paddingY = 'small',
  fullWidth,
  activePlaceholder,
  noMargin,
  smallMargin,
  error,
  required,
}) => {
  const preparedItems = useMemo(
    () =>
      items.length > 0 && typeof items[0] === 'object'
        ? items
        : items.map((value) => ({ name: value, value })),
    [items]
  )
  const defaultItem = useMemo(
    () =>
      defaultValue
        ? preparedItems.find((item) => item.value === defaultValue)
        : undefined,
    [preparedItems, defaultValue]
  )

  return (
    <InputWrapper
      label={label}
      labelClassName={labelClassName}
      wrapperClassName={wrapperClassName}
      hidden={hidden}
      className={className}
      disabled={disabled}
      paddingX={paddingX}
      paddingY={paddingY}
      fullWidth={fullWidth}
      noMargin={noMargin}
      smallMargin={smallMargin}
      error={error}
      required={required}
      value={value}
    >
      <select
        className={cn(
          'flex-1 cursor-pointer bg-transparent px-1 outline-none',
          (
            defaultValue !== undefined && !value
              ? defaultValue === null || defaultValue === ''
              : value === null || value === undefined || value === ''
          )
            ? 'text-disabled'
            : 'text-black',
          selectClassName
        )}
        onChange={(e) =>
          !disabled &&
          onChange &&
          onChange(e.target.value === '' ? null : e.target.value)
        }
        defaultValue={defaultItem ? defaultValue : undefined}
        value={defaultValue ? undefined : value ?? ''}
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
        }}
        aria-label={label}
      >
        {placeholder && (
          <option
            className="text-disabled"
            disabled={!activePlaceholder}
            value=""
          >
            {placeholder}
          </option>
        )}
        {preparedItems.map((item, index) => (
          <option
            className="cursor-pointer text-black"
            key={item.value}
            value={item.value}
          >
            {item.name}
          </option>
        ))}
      </select>
    </InputWrapper>
  )
}

export default ComboBox
