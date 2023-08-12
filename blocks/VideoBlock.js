import React from 'react'
import cn from 'classnames'
import Image from 'next/image'
import SpanGradientTitle from './components/SpanGradientTitle'
import DivContent from './components/DivContent'
import DivText from './components/DivText'

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
    <SpanGradientTitle>по телевизору</SpanGradientTitle>
  </div>
)

const VideoBlock = () => {
  return (
    <DivContent className="flex flex-col items-center">
      <Title />
      <DivText className="text-center mb-[16px] md:mb-[57px] tablet:mb-[62px] mt-[18px] tablet:mt-[30px] w-[290px] md:w-[450px] tablet:w-[590px]">
        Левитация, гипноз, чтение мыслей, исчезновение предметов и превращения —
        вы увидите то, вот что не поверят глаза.
      </DivText>
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
      <div className="relative z-20 flex justify-center w-full">
        <img
          className="object-contain max-w-[1338px] w-full aspect-[1338/880]"
          alt="video"
          src="/img/TV.png"
          draggable={false}
        />
        <div className="absolute flex flex-col items-center top-[calc(44%)] sm:top-[calc(50%-30px)] tablet:top-[calc(50%-45px)] -translate-y-1/2">
          <div className="relative w-[30px] h-[30px] sm:w-[88px] sm:h-[88px] tablet:w-[110px] tablet:h-[110px]">
            <div className="absolute animate-ping w-full h-full rounded-full transition-all bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-r from-[#692DC1] to-[#AC80EC] hover:via-[#AC80EC] hover:to-[#692DC1]" />
            <div className="absolute w-full h-full rounded-full transition-all bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-r from-[#692DC1] to-[#AC80EC] hover:via-[#AC80EC] hover:to-[#692DC1] cursor-pointer" />
            <div className="flex items-center justify-center w-full h-full overflow-hidden cursor-pointer">
              {/* <svg
                className="z-10 min-w-[162px] min-h-[162px]"
                xmlns="http://www.w3.org/2000/svg"
                width="162"
                height="162"
                viewBox="0 0 162 162"
                fill="none"
              >
                <path
                  d="M100.5 78.4019C102.5 79.5566 102.5 82.4434 100.5 83.5981L75 98.3205C73 99.4752 70.5 98.0318 70.5 95.7224L70.5 66.2776C70.5 63.9682 73 62.5248 75 63.6795L100.5 78.4019Z"
                  fill="white"
                />
              </svg> */}
              <svg
                className="z-10 ml-1 sm:ml-2 tablet:ml-3 w-[12px] h-[12px] sm:w-[37px] sm:h-[37px] tablet:w-[46px] tablet:h-[46px]"
                width="32"
                height="36"
                viewBox="0 0 32 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.5 15.4019C32.5 16.5566 32.5 19.4434 30.5 20.5981L5 35.3205C3 36.4752 0.500002 35.0318 0.500002 32.7224L0.500003 3.27757C0.500004 0.968166 3 -0.47521 5 0.679491L30.5 15.4019Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="select-none mt-[12px] sm:mt-[40px] text-white text-center text-[7px] sm:text-[13px] tablet:text-[16px] font-medium">
            Посмотрите видео-презентацию от Алексея
          </div>
        </div>
      </div>
    </DivContent>
  )
}

export default VideoBlock
