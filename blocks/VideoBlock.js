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
    <div className="my-6 tablet:my-10 2xl:my-20 relative min-w-[375px] h-[660px] sm:h-[680px] md:h-[900px] flex flex-col items-center w-full tablet:h-screen tablet:min-h-[950px]">
      <Title />
    </div>
  )
}

export default VideoBlock
