import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { forwardRef } from 'react'
import LoadingSpinner from './LoadingSpinner'

const Button = forwardRef(
  (
    {
      name = '',
      onClick,
      className,
      disabled = false,
      classBgColor = 'bg-general',
      classHoverBgColor = 'hover:bg-green-600',
      loading = false,
      stopPropagation,
      thin = false,
      big = false,
      icon,
      collapsing,
      rounded = true,
      iconRight = false,
      ...props
    },
    ref
  ) => {
    return loading ? (
      <div
        {...props}
        ref={ref}
        className={cn(
          'cursor-not-allowed bg-gray-300 bg-opacity-90 px-4 text-white',
          big ? 'py-2 text-xl' : thin ? 'h-8 py-0.5' : 'h-9 py-1',
          rounded ? (big ? 'rounded-lg' : 'rounded') : '',
          className
        )}
        onClick={onClick}
      >
        <LoadingSpinner size="xxs" />
      </div>
    ) : (
      <button
        {...props}
        ref={ref}
        onClick={
          onClick && !disabled
            ? (e) => {
                stopPropagation && e.stopPropagation()
                onClick()
              }
            : undefined
        }
        className={cn(
          'prevent-select-text flex items-center justify-center gap-x-2 overflow-hidden whitespace-nowrap bg-opacity-90 text-base font-normal text-white duration-300',
          rounded ? (big ? 'rounded-lg' : 'rounded') : '',
          iconRight ? 'flex-row-reverse' : '',
          big ? 'py-2 text-xl' : thin ? 'h-8 py-0.5' : 'h-9 py-1',
          className,
          disabled
            ? 'cursor-not-allowed bg-gray-300 text-white'
            : cn(classHoverBgColor, classBgColor),
          collapsing ? 'px-2' : 'min-w-max px-3'
        )}
      >
        {icon && (
          <FontAwesomeIcon icon={icon} className="min-w-5 min-h-5 h-5 w-5" />
        )}
        {name}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
