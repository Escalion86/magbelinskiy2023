import React from 'react'
import cn from 'classnames'
import Image from 'next/image'

const Title = ({ className }) => (
  <div
    className={cn(
      'text-center w-[250px] phoneH:w-[280px] sm:w-[320px] md:w-[360px] tablet:w-[560px] text-[29px] phoneH:text-[32px] sm:text-[36px] md:text-[42px] tablet:text-[64px]',
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
    Такое ваши гости видели только{' '}
    <span
      style={{
        background: 'linear-gradient(51deg, #4986FF 0%, #A86CFF 100%)',
        // backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        // color: '#0B2349',
      }}
    >
      по телевизору
    </span>
  </div>
)

const VideoBlock = () => {
  return (
    <div className="my-12 tablet:mt-10 2xl:mt-20 mb-10 tablet:mb-32 relative min-w-[375px] flex flex-col items-center w-full">
      <Title />
      <div
        className="text-center mb-[16px] md:mb-[57px] tablet:mb-[62px] mt-[18px] tablet:mt-[30px] w-[290px] md:w-[450px] tablet:w-[590px] text-[12px] md:text-[16px] tablet:text-[21px]"
        style={{
          color: '#fff',
          fontStyle: 'normal',
          fontWeight: 400,
        }}
      >
        Левитация, гипноз, чтение мыслей, исчезновение предметов и превращения —
        вы увидите то, вот что не поверят глаза.
      </div>
      <div
        className="absolute h-[345px] w-[615px] tablet:h-[690px] tablet:w-[1230px] top-0 tablet:top-[140px] left-0 -translate-x-[55%] rotate-[105deg] aspect-[1230/690]"
        style={{
          background: 'url("/img/smoke.png")',
          mixBlendMode: 'color-dodge',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="absolute h-[345px] w-[615px] tablet:h-[690px] tablet:w-[1230px] top-[200px] tablet:top-[396px] right-0 translate-x-1/2 rotate-[105deg] aspect-[1230/690]"
        style={{
          background: 'url("/img/smoke.png")',
          mixBlendMode: 'color-dodge',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="w-[192px] h-[305px] tablet:w-[384px] tablet:h-[610px] absolute -bottom-[150px] -right-[190px]"
        style={{
          transform: 'rotate(-30deg)',
          borderRadius: 900,
          opacity: 0.3,
          background: 'linear-gradient(63deg, #4272D1 0%, #83ACFF 100%)',
          mixBlendMode: 'exclusion',
          boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
          filter: 'blur(177.5px)',
        }}
      />
      <div className="relative z-20 w-full px-2">
        <img
          className="object-contain max-w-[1338px] w-full aspect-[1338/880]"
          alt="video"
          src="/img/TV.png"
        />
      </div>
    </div>
  )
}

export default VideoBlock
