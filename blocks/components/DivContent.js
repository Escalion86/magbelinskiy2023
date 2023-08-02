import React from 'react'
import cn from 'classnames'

const DivContent = ({ children, className, noMargin = false }) => (
  <div
    className={cn(
      'relative md:mt-[124px] max-w-[1264px] min-w-[375px] w-full px-[18px] md:px-[52px]',
      noMargin ? '' : 'my-12 mb-10 tablet:mt-10 2xl:mt-20 tablet:mb-32',
      className
    )}
  >
    {children}
  </div>
)

export default DivContent
