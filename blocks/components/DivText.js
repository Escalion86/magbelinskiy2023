import React from 'react'
import cn from 'classnames'

const DivText = ({ children, className }) => (
  <div
    className={cn(
      'text-white font-normal text-[12px] md:text-[16px] tablet:text-[21px]',
      className
    )}
    style={{
      lineHeight: '145%',
    }}
  >
    {children}
  </div>
)

export default DivText
