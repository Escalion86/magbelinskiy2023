import React from 'react'
import cn from 'classnames'
import Image from 'next/image'
import MagicanImage from './MagicanImage'

const Background = () => (
  <div
    style={{
      maskMode: 'alpha',
      background:
        'linear-gradient(180deg, #D9D9D9 83.34%, rgba(217, 217, 217, 0.00) 100%)',
    }}
    className="absolute top-0 w-full h-full -z-10 shrink-0"
  >
    {/* Фон */}
    <div
      className="absolute w-full h-full"
      style={{
        background:
          'linear-gradient(0deg, rgba(11, 11, 21, 0.20) 0%, rgba(11, 11, 21, 0.20) 100%), linear-gradient(0deg, #0F0F1E 0%, #0F0F1E 100%), linear-gradient(180deg, #D9D9D9 83.34%, rgba(217, 217, 217, 0.00) 100%)',
      }}
    />
    {/* Подсветка в центре */}
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 aspect-square top-1/2 left-1/2"
      style={{
        // width: 300,
        height: '27%',
        flexShrink: 0,
        borderRadius: 900,
        opacity: 0.1,
        background: '#D9D9D9',
        boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
        filter: 'blur(177.5px)',
      }}
    />
    {/* Подсветка руки справа */}
    <div
      className="hidden 2xl:block absolute -translate-x-1/2 -translate-y-1/4 left-full top-1/2 rotate-[30deg]"
      style={{
        width: 309,
        height: 491,
        flexShrink: 900,
        borderRadius: 900,
        opacity: 0.6,
        background:
          'linear-gradient(64deg, #773FCA 0%, #8E42FF 71.51%), linear-gradient(63deg, #4272D1 0%, #83ACFF 100%)',
        boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
        filter: 'blur(177.5px)',
      }}
    />
    {/* Подсветка руки слева */}
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 left-[calc(25%-400px)] top-0 -rotate-[30deg]"
      style={{
        width: 384,
        height: 610,
        flexShrink: 0,
        borderRadius: 900,
        opacity: 0.6,
        background: 'linear-gradient(63deg, #4272D1 0%, #83ACFF 100%)',
        boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
        filter: 'blur(177.5px)',
      }}
    />
    {/* <div
className="absolute w-full h-full"
style={{
maskMode: 'alpha',
background:
  'linear-gradient(180deg, #D9D9D9 83.34%, rgba(217, 217, 217, 0.00) 100%)',
}}
></div> */}
    {/* Фоновый белый шум */}
    <div
      className="absolute w-full h-full"
      style={{
        opacity: 0.3,
        background:
          'url("/img/noise.png"), lightgray 0% 0% / 100px 100px repeat',
        mixBlendMode: 'soft-light',
      }}
    />
    {/* Рука слева */}
    <div
      className="absolute 2xl:opacity-100 opacity-20 left-[min(calc(5%-100px),0px)] max-h-[35%] w-[15%] min-w-[170px] z-10 top-[90px] aspect-[289/385] hidden md:block"
      style={{
        // width: 289,
        // height: '35%',
        flexShrink: 0,
        background: 'url("/img/hand1.png")',
        mixBlendMode: 'hard-light',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    />
    {/* Рука справа */}
    <div
      className="absolute right-0 z-10 w-[74px] h-[95px] md:w-[135px] md:h-[173px] 2xl:w-[235px] 2xl:h-[303px] bottom-[4%] top-auto 2xl:bottom-auto 2xl:top-[24%] aspect-[235/303]"
      style={{
        // width: 289,
        // height: '28%',
        flexShrink: 0,
        background: 'url("/img/hand2.png")',
        mixBlendMode: 'hard-light',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    />
    <MagicanImage />
    {/* <div
className="w-full h-full"
style={{
opacity: 0.30000001192092896,
background:
'url("/img/white_noise.png"), lightgray 0% 0% / 100px 100px repeat',
mixBlendMode: 'soft-light',
}}
></div> */}
  </div>
)

export default Background
