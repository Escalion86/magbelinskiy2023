'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivContent from './components/DivContent'
import DivText from './components/DivText'

const Title = ({ className }) => (
  <div
    className={cn(
      'w-[190px] phoneH:w-[200px] sm:w-[220px] md:w-[260px] tablet:w-[400px] text-[29px] phoneH:text-[32px] sm:text-[36px] md:text-[42px] tablet:text-[64px]',
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
    Привезу реквизит и <SpanGradientTitle>сделаю все сам</SpanGradientTitle>
  </div>
)

const Arrow = ({ right, className, onClick }) => {
  return (
    <div
      className={cn(
        'w-[46px] h-[46px] md:w-[76px] md:h-[76px] rounded-full transition-all bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-r from-[#4272D1] to-[#83ACFF] hover:via-[#83ACFF] hover:to-[#4272D1] cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <svg
        className="w-[46px] h-[46px] md:w-[76px] md:h-[76px]"
        xmlns="http://www.w3.org/2000/svg"
        // width={small ? 76 : 126}
        // height={small ? 76 : 126}
        viewBox="27 18 70 70"
        fill="none"
      >
        {right ? (
          <path
            d="M52.9707 51.9066C52.2807 51.9281 51.7388 52.505 51.7604 53.195C51.7819 53.885 52.3588 54.4269 53.0488 54.4053L52.9707 51.9066ZM73.9111 53.3871C74.3837 52.8839 74.359 52.0929 73.8558 51.6202L65.6563 43.9176C65.1531 43.4449 64.3621 43.4696 63.8894 43.9728C63.4167 44.476 63.4415 45.267 63.9446 45.7397L71.2331 52.5865L64.3863 59.8749C63.9137 60.3781 63.9384 61.1692 64.4416 61.6419C64.9447 62.1145 65.7358 62.0898 66.2085 61.5866L73.9111 53.3871ZM53.0488 54.4053L73.039 53.7806L72.961 51.2819L52.9707 51.9066L53.0488 54.4053Z"
            fill="white"
          />
        ) : (
          <path
            d="M73.0293 54.0932C73.7193 54.0716 74.2612 53.4948 74.2396 52.8048C74.2181 52.1147 73.6412 51.5729 72.9512 51.5944L73.0293 54.0932ZM52.0889 52.6127C51.6163 53.1158 51.641 53.9069 52.1442 54.3796L60.3437 62.0822C60.8469 62.5548 61.6379 62.5301 62.1106 62.0269C62.5833 61.5238 62.5585 60.7327 62.0554 60.26L54.7669 53.4133L61.6137 46.1248C62.0863 45.6216 62.0616 44.8306 61.5584 44.3579C61.0553 43.8852 60.2642 43.91 59.7915 44.4131L52.0889 52.6127ZM72.9512 51.5944L52.961 52.2191L53.039 54.7179L73.0293 54.0932L72.9512 51.5944Z"
            fill="white"
          />
        )}
      </svg>
    </div>
  )
}

var carousel, firstCardWidth, timer, imageWidth

const Gallery = () => {
  useEffect(() => {
    let isDragging = false,
      startX,
      startScrollLeft
    carousel = document.querySelector('.carousel')
    firstCardWidth = carousel.querySelector('div').offsetWidth

    // timer = setInterval(() => {
    //   // carousel.scrollLeft += 10
    //   // infiniteScroll()
    // }, 50)

    const dragStart = (e) => {
      clearInterval(timer)
      isDragging = true
      startX = e.pageX
      startScrollLeft = carousel.scrollLeft
    }

    const dragEnd = () => {
      isDragging = false
      infiniteScroll()
    }

    const draging = (e) => {
      if (!isDragging) return
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
    }
    imageWidth = carousel.scrollWidth / 15
    const oneSetImagesWidth = carousel.scrollWidth / 5

    const infiniteScroll = () => {
      // console.log('carousel.scrollLeft :>> ', carousel.scrollLeft)
      // console.log('oneSetImagesWidth :>> ', oneSetImagesWidth)
      if (carousel.scrollLeft <= oneSetImagesWidth) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft += oneSetImagesWidth * 2 + 16
        carousel.classList.remove('no-transition')
      } else if (
        Math.ceil(carousel.scrollLeft) >=
        oneSetImagesWidth * 3 - carousel.offsetWidth
      ) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft -= oneSetImagesWidth * 2 + 16
        carousel.classList.remove('no-transition')
      }
    }

    carousel.addEventListener('mousedown', dragStart)
    document.addEventListener('mouseup', dragEnd)
    carousel.addEventListener('mousemove', draging)
    carousel.classList.add('no-transition')
    carousel.scrollLeft = oneSetImagesWidth * 2.5 - carousel.offsetWidth / 2
    carousel.classList.remove('no-transition')
  }, [])

  const leftClick = (e) => {
    e.stopPropagation()
    const deltaWidth = carousel.scrollLeft % firstCardWidth
    const deltaCarouselWidth = (carousel.offsetWidth % firstCardWidth) / 2
    const add =
      (carousel.offsetWidth > firstCardWidth * 2 ? firstCardWidth / 2 : 0) +
      deltaWidth +
      deltaCarouselWidth
    carousel.scrollLeft -= add
  }

  const rightClick = (e) => {
    e.stopPropagation()
    const deltaWidth = carousel.scrollLeft % firstCardWidth
    const deltaCarouselWidth = (carousel.offsetWidth % firstCardWidth) / 2
    const add =
      (carousel.offsetWidth > firstCardWidth * 2
        ? firstCardWidth * 1.5
        : firstCardWidth * 2) -
      deltaWidth -
      deltaCarouselWidth
    carousel.scrollLeft += add
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative flex flex-col items-center w-full max-w-[1160px]">
        <Arrow
          className="md:hidden xl:block absolute left-[10px] xl:-left-[40px] 2xl:-left-[136px] -translate-y-1/2 top-1/2"
          onClick={leftClick}
        />
        <Arrow
          right
          className="md:hidden xl:block absolute right-[10px] xl:-right-[40px] 2xl:-right-[136px] -translate-y-1/2 top-1/2"
          onClick={rightClick}
        />
        <div
          className="flex justify-start max-w-full overflow-hidden overflow-x-auto cursor-pointer no-scrollbar carousel active:scroll-auto scroll-smooth"
          // className="gap-[20px] auto-cols-[calc((100%-40px)/3)] md:auto-cols-[calc((100%-80px)/3)] md:gap-[40px] grid w-full overflow-x-hidden select-none scroll snap-x active:snap-none snap-mandatory active:scroll-auto scroll-smooth carousel cursor-grab active:cursor-grabbing"
          style={
            {
              // scrollbarWidth: 0,
              // gridAutoFlow: 'column',
              // gridAutoColumns: 'calc((100%-80px)/3)',
              // gap: 16,
              // overflow: 'auto',
              // display: 'inline-flex',
              // whiteSpace: 'nowrap',
            }
          }
        >
          {[
            '4',
            '5',
            '1',
            '2',
            '3',
            '4',
            '5',
            '1',
            '2',
            '3',
            '4',
            '5',
            '1',
            '2',
            '3',
            '4',
            '5',
            '1',
            '2',
            '3',
            '4',
            '5',
            '1',
            '2',
            '3',
          ].map((name, index) => (
            <div key={'pic' + name + index} className="px-[10px] md:px-[20px]">
              <img
                // className="object-cover min-w-[270px] md:min-w-[360px] inline aspect-[9/7]"
                className="object-cover min-w-[270px] md:min-w-[360px] w-[calc((100%-80px)/3)] inline aspect-[9/7]"
                alt={'pic' + name}
                src={`/img/gallery/${name}.jpg`}
                style={{
                  scrollSnapAlign: 'start',
                  borderRadius: 20,
                  boxShadow: '4px 4px 25px 0px rgba(255, 255, 255, 0.15) inset',
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="justify-center mt-[30px] md:mt-[60px] tablet:max-w-[680px] max-w-[270px] sm:max-w-[400px] md:max-w-[520px] flex items-center md:justify-between w-full xl:hidden">
        <Button className="" />
        <div className="hidden md:flex gap-x-[20px]">
          <Arrow className="" onClick={leftClick} />
          <Arrow right className="" onClick={rightClick} />
        </div>
      </div>
    </div>
  )
}

const GalleryBlock = () => {
  return (
    <div className="relative flex flex-col items-center w-full">
      <DivContent className="flex flex-col items-center gap-y-[20px]">
        <div className="flex items-start xl:items-center justify-between flex-col max-w-[520px] tablet:max-w-[680px] xl:max-w-full xl:flex-row gap-x-[200px]">
          <div className="flex flex-col gap-y-[50px]">
            <Title />
            <Button className="hidden xl:block" />
          </div>
          <DivText className="tablet:max-w-[680px] max-w-[270px] sm:max-w-[400px] md:max-w-[520px] mt-[30px] xl:mt-0">
            <span
              style={{
                fontWeight: 700,
              }}
            >
              Я сделаю иллюзионное шоу под ключ.{' '}
            </span>
            Это значит, что вам нужно просто позвать меня, остальное я сделаю
            сам.
            <br />
            <br />
            <span
              style={{
                fontWeight: 700,
              }}
            >
              Я сам подберу программу номера{' '}
            </span>
            под ваш праздник, привезу оборудование и реквизиты, все установлю и
            проведу шоу. <br />
            <br />
            <span
              style={{
                fontWeight: 700,
              }}
            >
              После такого представления{' '}
            </span>
            гости долго будут находиться под впечатлениями и не понимать, как
            такое возможно в реальной жизни.
          </DivText>
        </div>
      </DivContent>
      <div className="relative z-10 w-full xl:px-[52px]">
        <Gallery />
      </div>
      <div
        className="absolute hidden md:block xl:hidden right-0 z-10 w-[207px] h-[265px] 2xl:w-[235px] 2xl:h-[303px] top-[90px] aspect-[235/303]"
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
      <div
        className="absolute left-[calc(15%-400px)] top-[150px]"
        style={{
          width: 320,
          height: 509,
          transform: 'rotate(135deg)',
          borderRadius: 900,
          opacity: 0.6,
          background: 'linear-gradient(63deg, #4272D1 0%, #83ACFF 100%)',
          boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
          filter: 'blur(177.5px)',
        }}
      />
      <div
        className="absolute left-[calc(15%-490px)] top-[100px]"
        style={{
          width: 258,
          height: 410,
          transform: 'rotate(-165deg)',
          borderRadius: 900,
          opacity: 0.6,
          background: 'linear-gradient(64deg, #773FCA 0%, #8E42FF 71.51%)',
          boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
          filter: 'blur(177.5px)',
        }}
      />
      <div
        className="absolute right-[calc(15%-350px)] top-[300px] xl:top-[680px]"
        style={{
          width: 260,
          height: 413,
          transform: 'rotate(30deg)',
          borderRadius: 900,
          opacity: 0.6,
          background: 'linear-gradient(63deg, #4272D1 0%, #83ACFF 100%)',
          boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
          filter: 'blur(177.5px)',
        }}
      />
      <div
        className="absolute right-[calc(15%-340px)] top-[700px] xl:top-[1080px]"
        style={{
          width: 209,
          height: 332,
          transform: 'rotate(90deg)',
          borderRadius: 900,
          opacity: 0.6,
          background: 'linear-gradient(64deg, #773FCA 0%, #8E42FF 71.51%)',
          boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
          filter: 'blur(177.5px)',
        }}
      />
    </div>
  )
}

export default GalleryBlock
