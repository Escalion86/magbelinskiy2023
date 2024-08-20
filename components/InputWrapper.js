import { faAsterisk } from '@fortawesome/free-solid-svg-icons/faAsterisk'
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { forwardRef } from 'react'

const InputWrapper = forwardRef(
  (
    {
      label,
      labelClassName,
      value,
      className,
      required,
      children,
      floatingLabel = true,
      error,
      showErrorText,
      paddingY = true,
      paddingX = true,
      postfix,
      postfixClassName,
      prefix,
      prefixClassName,
      wrapperClassName,
      hidden = false,
      fullWidth = false,
      fitWidth = false,
      noBorder = false,
      disabled = false,
      noMargin = false,
      centerLabel = false,
      showDisabledIcon = true,
      smallMargin = false,
      comment,
      commentClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'relative flex h-fit items-stretch',
          paddingX === 'small' ? 'px-1' : paddingX ? 'px-2' : 'px-0',
          noMargin ? '' : smallMargin ? 'mt-3' : 'mb-1 mt-3.5',
          noBorder
            ? 'min-h-[36px] tablet:min-h-[40px]'
            : `min-h-[40px] rounded border-2 focus-within:border-general hover:border-general tablet:min-h-[44px] [&:not(:focus-within)]:hover:border-opacity-50 ${
                error ? 'border-danger' : 'border-gray-300'
              }`,
          fullWidth ? 'w-full' : '',
          fitWidth ? 'w-fit' : '',
          paddingY === 'small'
            ? 'pb-1 pt-1.5'
            : paddingY === 'big'
            ? 'pb-2 pt-2.5'
            : paddingY
            ? 'pb-1.5 pt-2'
            : '',
          disabled ? 'cursor-not-allowed' : '',
          hidden ? 'hidden' : '',
          (error && showErrorText) || comment ? 'mb-4' : '',
          className
        )}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            'flex min-h-[24px] w-full items-center tablet:min-h-[28px]',
            wrapperClassName,
            disabled ? 'cursor-not-allowed' : ''
          )}
        >
          {prefix && (
            <div
              className={cn(
                'flex items-center pl-1 text-disabled',
                prefixClassName
              )}
            >
              {prefix}
            </div>
          )}
          {children}
          {(postfix || disabled) && (
            <div
              className={cn(
                'flex items-center gap-x-1 pr-1 text-disabled',
                postfixClassName
              )}
            >
              {postfix}
              {disabled && showDisabledIcon && (
                <FontAwesomeIcon
                  className="h-4 w-4 text-disabled"
                  icon={faBan}
                  size="1x"
                />
              )}
            </div>
          )}
          {label && (
            <div
              className={cn(
                'pointer-events-none absolute select-none rounded bg-white px-1 text-sm text-general transition-all peer-focus:leading-[12px] peer-focus:text-general',
                'h-5 leading-[12px] peer-placeholder-shown:leading-[14px]',
                'flex items-center',
                required
                  ? 'max-w-[calc(100%-16px)] peer-placeholder-shown:max-w-full peer-focus:max-w-[calc(100%-16px)]'
                  : '',
                centerLabel ? 'left-1/2 -translate-x-1/2' : 'left-2',
                floatingLabel
                  ? `-top-[12px] peer-placeholder-shown:top-[calc(50%-10px)] peer-placeholder-shown:text-base peer-placeholder-shown:text-disabled peer-focus:-top-[12px] peer-focus:text-sm`
                  : '-top-[12px]',
                disabled ? 'cursor-not-allowed' : '',
                labelClassName
              )}
            >
              {label}
            </div>
          )}
        </div>
        {required && (
          <div
            className={cn(
              'absolute -top-[9px] right-1 flex h-4 items-center bg-white px-1 text-xs',
              (value !== null &&
                typeof value === 'object' &&
                value.length > 0) ||
                (typeof value !== 'object' && (value || value === false))
                ? 'text-disabled'
                : 'text-danger'
            )}
          >
            <FontAwesomeIcon
              className={cn('h-2.5 w-2.5')}
              icon={faAsterisk}
              size="1x"
            />
          </div>
        )}
        {error && showErrorText && (
          <div
            className={cn(
              'absolute -bottom-[15px] left-1 whitespace-nowrap bg-white px-1 text-xs leading-[12px] text-danger'
            )}
          >
            {error}
          </div>
        )}
        {comment && (
          <div
            className={cn(
              'absolute -bottom-[15px] right-1 whitespace-nowrap bg-white px-1 text-xs leading-[12px]',
              commentClassName
            )}
          >
            {comment}
          </div>
        )}
      </div>
    )
  }
)

InputWrapper.displayName = 'InputWrapper'

export default InputWrapper
