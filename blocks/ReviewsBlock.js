'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivContent from './components/DivContent'
import DivText from './components/DivText'
import Rewiews from './galleryComponents/Rewiews'

const Title = ({ className }) => (
  <div
    className={cn(
      'text-[29px] phoneH:text-[32px] sm:text-[36px] md:text-[42px] tablet:text-[64px] text-center',
      className
    )}
    style={{
      color: '#FFF',
      /* Title H1 -- First Block */
      fontFamily: 'Buyan',
      // fontSize: 84,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '100%' /* 84px */,
    }}
  >
    После выступления люди надолго
    <br />
    остаются <SpanGradientTitle>под впечатлениями</SpanGradientTitle>
  </div>
)

const ReviewsBlock = () => {
  return (
    <div className="relative flex flex-col items-center w-full mt-[32px] md:mt-[72px]">
      <Title />
      <Rewiews className="mt-[25px] md:mt-[60px]" />
      <Button className="mt-[35px] md:mt-[60px]" />
    </div>
  )
}

export default ReviewsBlock
