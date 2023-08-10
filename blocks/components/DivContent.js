import React from 'react'
import cn from 'classnames'

const DivContent = ({
  children,
  className,
  noMargin = false,
  fullWidth = true,
}) => (
  <div
    className={cn(
      'relative max-w-[1264px] min-w-[375px] px-[18px] md:px-[52px]',
      noMargin
        ? ''
        : 'md:mt-[124px] my-12 mb-10 tablet:mt-10 2xl:mt-20 tablet:mb-32',
      fullWidth ? 'w-full' : '',
      className
    )}
  >
    {children}
  </div>
)

export default DivContent
