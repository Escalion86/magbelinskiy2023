import React from 'react'
import cn from 'classnames'
import Image from 'next/image'
import MagicanImage from './MagicanImage'

const Background = () => (
  <div className="absolute top-0 h-full w-full">
    {/* Подсветка в центре */}
    <div
      className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
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
      className="absolute left-full top-1/2 hidden -translate-x-1/2 -translate-y-1/4 rotate-[30deg] 2xl:block"
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
      className="absolute left-[calc(25%-400px)] top-0 -translate-x-1/2 -translate-y-1/2 -rotate-[30deg]"
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
    {/* <div
      className="absolute w-full h-full"
      style={{
        opacity: 0.3,
        background:
          'url("/img/noise.png"), lightgray 0% 0% / 100px 100px repeat',
        mixBlendMode: 'soft-light',
      }}
    /> */}
    {/* Рука слева */}
    <div
      className="absolute left-[min(calc(5%-100px),0px)] top-[90px] z-10 hidden aspect-[289/385] max-h-[35%] w-[15%] min-w-[170px] opacity-20 md:block 2xl:opacity-100"
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
      className="absolute bottom-[6%] right-0 top-auto z-10 aspect-[235/303] h-[95px] w-[74px] md:bottom-[4%] md:h-[173px] md:w-[135px] 2xl:bottom-auto 2xl:top-[24%] 2xl:h-[303px] 2xl:w-[235px]"
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
