'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivContent from './components/DivContent'
import DivText from './components/DivText'
import Gallery from './galleryComponents/Gallery'

const Title = ({ className }) => (
  <div
    className={cn(
      'text-[29px] phoneH:text-[32px] sm:text-[36px] md:text-[42px] tablet:text-[64px]',
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
    <SpanGradientTitle>Фотографии</SpanGradientTitle> с выступлений
  </div>
)

const GalleryBlock2 = () => {
  return (
    <div className="relative flex flex-col items-center w-full mt-[15px] md:mt-[140px] mb-10 tablet:mb-32">
      <Title />
      {/* <DivContent className="flex flex-col items-center gap-y-[20px]"> */}
      <div className="relative z-10 w-full mt-[35px] md:mt-[65px]">
        <Gallery type={2} />
      </div>
      {/* </DivContent> */}
    </div>
  )
}

export default GalleryBlock2
