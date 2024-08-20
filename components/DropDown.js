import PrelineScript from 'app/components/PrelineScript'
import cn from 'classnames'

const DropDown = ({
  trigger,
  children,
  menuPadding = 'md',
  menuClassName,
  openOnHover = false,
  turnOffAutoClose = false,
  strategyAbsolute = true,
  className,
  placement,
}) => {
  const padding =
    menuPadding === 'md'
      ? 'p-2'
      : menuPadding === 'sm'
      ? 'p-1'
      : menuPadding === 'lg'
      ? 'p-3'
      : ''
  const placementVal =
    placement === 'right' ? 'right-0' : placement === 'left' ? 'left-0' : ''
  // const placementVal =
  //   placement === 'bottom'
  //     ? '[--placement:bottom]'
  //     : placement === 'right'
  //     ? '[--placement:right]'
  //     : placement === 'right-bottom'
  //     ? '[--placement:right-bottom]'
  //     : placement === 'right-top'
  //     ? '[--placement:right-top]'
  //     : placement === 'top'
  //     ? '[--placement:top]'
  //     : ''
  return (
    <div
      className={cn(
        'hs-dropdown relative inline-flex [--placement:bottom]',
        turnOffAutoClose === 'inside'
          ? '[--auto-close:inside]'
          : turnOffAutoClose === 'outside'
          ? '[--auto-close:outside]'
          : '',
        // placementVal,
        openOnHover ? '[--trigger:hover] ' : '',
        strategyAbsolute ? '[--strategy:absolute]' : '',
        className
      )}
      data-prevent-parent-click
    >
      <PrelineScript />
      <div id="hs-dropdown" className="hs-dropdown-toggle w-full">
        {trigger}
      </div>
      <div
        className={cn(
          'hs-dropdown-menu duration z-50 hidden items-center justify-center rounded-lg border border-gray-400 bg-white opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:flex hs-dropdown-open:opacity-100 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800',
          strategyAbsolute
            ? 'before:absolute before:-top-4 before:left-0 before:h-4 before:w-full after:absolute after:-bottom-4 after:left-0 after:h-4 after:w-full'
            : '',
          padding,
          placementVal,
          menuClassName
        )}
        aria-labelledby="hs-dropdown"
      >
        {children}
      </div>
    </div>
  )
}

export default DropDown
