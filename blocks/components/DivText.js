import React from 'react'
import cn from 'classnames'

const DivText = ({
  children,
  style,
  className,
  size = 'normal',
  textColorClass = 'text-white',
  textFontClass = 'font-normal',
}) => (
  <div
    className={cn(
      size === 'small' ? 'text-[11px] md:text-[15px] tablet:text-[19px]' : '',
      size === 'normal' ? 'text-[12px] md:text-[16px] tablet:text-[21px]' : '',
      size === 'big' ? 'text-[13px] md:text-[17px] tablet:text-[23px]' : '',
      textColorClass,
      textFontClass,
      className
    )}
    style={{
      lineHeight: '145%',
      ...style,
    }}
  >
    {children}
  </div>
)

export default DivText
