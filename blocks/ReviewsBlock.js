'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivContent from './components/DivContent'
import DivText from './components/DivText'
import Rewiews from './galleryComponents/Rewiews'
import { useSetRecoilState } from 'recoil'
import showModalZakazAtom from '@/state/showModalZakazAtom'

const Title = ({ className }) => (
  <div
    className={cn(
      'text-center font-buyan text-[29px] font-bold leading-[100%] text-white phoneH:text-[32px] sm:text-[36px] md:text-[42px] tablet:text-[64px]',
      className
    )}
  >
    После выступления люди надолго
    <br />
    остаются <SpanGradientTitle>под впечатлениями</SpanGradientTitle>
  </div>
)

const ReviewsBlock = () => {
  const setShowModalZakaz = useSetRecoilState(showModalZakazAtom)
  return (
    <div className="relative mt-[32px] flex w-full flex-col items-center md:mt-[72px]">
      <Title />
      <Rewiews className="mt-[25px] md:mt-[60px]" />
      <Button
        className="mt-[35px] md:mt-[60px]"
        onClick={() => setShowModalZakaz(true)}
      />
    </div>
  )
}

export default ReviewsBlock