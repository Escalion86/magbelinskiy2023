'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivContent from './components/DivContent'
import DivText from './components/DivText'

var progress

const SvgProgressDynamyc = () => {
  useEffect(() => {
    progress = document.querySelector('.progress')
    setInterval(() => {
      if (progress.style.left === '0px') progress.style.left = '-18px'
      else progress.style.left = parseInt(progress.style.left) + 1 + 'px'
    }, 50)
  }, [])

  return (
    <svg
      style={{
        left: '-18px',
      }}
      className="absolute progress"
      width="1177"
      height="30"
      viewBox="0 0 1177 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g style={{ mixBlendMode: 'soft-light' }} opacity="0.3">
        <rect
          x="21.9084"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 21.9084 -42.8025)"
          fill="white"
        />
        <rect
          x="297.908"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 297.908 -42.8025)"
          fill="white"
        />
        <rect
          x="40.3723"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 40.3723 -42.8025)"
          fill="white"
        />
        <rect
          x="316.372"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 316.372 -42.8025)"
          fill="white"
        />
        <rect
          x="58.8362"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 58.8362 -42.8025)"
          fill="white"
        />
        <rect
          x="334.836"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 334.836 -42.8025)"
          fill="white"
        />
        <rect
          x="77.3"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 77.3 -42.8025)"
          fill="white"
        />
        <rect
          x="353.3"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 353.3 -42.8025)"
          fill="white"
        />
        <rect
          x="95.7639"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 95.7639 -42.8025)"
          fill="white"
        />
        <rect
          x="371.764"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 371.764 -42.8025)"
          fill="white"
        />
        <rect
          x="592.764"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 592.764 -42.8025)"
          fill="white"
        />
        <rect
          x="813.764"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 813.764 -42.8025)"
          fill="white"
        />
        <rect
          x="114.228"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 114.228 -42.8025)"
          fill="white"
        />
        <rect
          x="390.228"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 390.228 -42.8025)"
          fill="white"
        />
        <rect
          x="611.228"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 611.228 -42.8025)"
          fill="white"
        />
        <rect
          x="832.228"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 832.228 -42.8025)"
          fill="white"
        />
        <rect
          x="132.692"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 132.692 -42.8025)"
          fill="white"
        />
        <rect
          x="408.691"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 408.691 -42.8025)"
          fill="white"
        />
        <rect
          x="629.691"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 629.691 -42.8025)"
          fill="white"
        />
        <rect
          x="850.691"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 850.691 -42.8025)"
          fill="white"
        />
        <rect
          x="151.156"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 151.156 -42.8025)"
          fill="white"
        />
        <rect
          x="427.155"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 427.155 -42.8025)"
          fill="white"
        />
        <rect
          x="648.155"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 648.155 -42.8025)"
          fill="white"
        />
        <rect
          x="869.155"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 869.155 -42.8025)"
          fill="white"
        />
        <rect
          x="1035.16"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1035.16 -42.8025)"
          fill="white"
        />
        <rect
          x="169.619"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 169.619 -42.8025)"
          fill="white"
        />
        <rect
          x="445.619"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 445.619 -42.8025)"
          fill="white"
        />
        <rect
          x="666.619"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 666.619 -42.8025)"
          fill="white"
        />
        <rect
          x="887.619"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 887.619 -42.8025)"
          fill="white"
        />
        <rect
          x="1053.62"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1053.62 -42.8025)"
          fill="white"
        />
        <rect
          x="188.083"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 188.083 -42.8025)"
          fill="white"
        />
        <rect
          x="464.083"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 464.083 -42.8025)"
          fill="white"
        />
        <rect
          x="685.083"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 685.083 -42.8025)"
          fill="white"
        />
        <rect
          x="906.083"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 906.083 -42.8025)"
          fill="white"
        />
        <rect
          x="1072.08"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1072.08 -42.8025)"
          fill="white"
        />
        <rect
          x="206.547"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 206.547 -42.8025)"
          fill="white"
        />
        <rect
          x="482.547"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 482.547 -42.8025)"
          fill="white"
        />
        <rect
          x="703.547"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 703.547 -42.8025)"
          fill="white"
        />
        <rect
          x="924.547"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 924.547 -42.8025)"
          fill="white"
        />
        <rect
          x="1090.55"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1090.55 -42.8025)"
          fill="white"
        />
        <rect
          x="225.011"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 225.011 -42.8025)"
          fill="white"
        />
        <rect
          x="501.011"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 501.011 -42.8025)"
          fill="white"
        />
        <rect
          x="722.011"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 722.011 -42.8025)"
          fill="white"
        />
        <rect
          x="943.011"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 943.011 -42.8025)"
          fill="white"
        />
        <rect
          x="1109.01"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1109.01 -42.8025)"
          fill="white"
        />
        <rect
          x="243.475"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 243.475 -42.8025)"
          fill="white"
        />
        <rect
          x="519.475"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 519.475 -42.8025)"
          fill="white"
        />
        <rect
          x="740.475"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 740.475 -42.8025)"
          fill="white"
        />
        <rect
          x="961.475"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 961.475 -42.8025)"
          fill="white"
        />
        <rect
          x="1127.47"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1127.47 -42.8025)"
          fill="white"
        />
        <rect
          x="261.938"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 261.938 -42.8025)"
          fill="white"
        />
        <rect
          x="537.938"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 537.938 -42.8025)"
          fill="white"
        />
        <rect
          x="758.938"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 758.938 -42.8025)"
          fill="white"
        />
        <rect
          x="979.938"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 979.938 -42.8025)"
          fill="white"
        />
        <rect
          x="1145.94"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1145.94 -42.8025)"
          fill="white"
        />
        <rect
          x="279.938"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 279.938 -42.8025)"
          fill="white"
        />
        <rect
          x="555.938"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 555.938 -42.8025)"
          fill="white"
        />
        <rect
          x="776.938"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 776.938 -42.8025)"
          fill="white"
        />
        <rect
          x="997.938"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 997.938 -42.8025)"
          fill="white"
        />
        <rect
          x="1163.94"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1163.94 -42.8025)"
          fill="white"
        />
        <rect
          x="573.938"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 573.938 -42.8025)"
          fill="white"
        />
        <rect
          x="794.938"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 794.938 -42.8025)"
          fill="white"
        />
        <rect
          x="1015.94"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1015.94 -42.8025)"
          fill="white"
        />
        <rect
          x="1181.94"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1181.94 -42.8025)"
          fill="white"
        />
        <rect
          x="1200.39"
          y="-42.8025"
          width="10"
          height="115"
          transform="rotate(17.1489 1200.39 -42.8025)"
          fill="white"
        />
      </g>
    </svg>
  )
}

const Title = ({ className }) => (
  <div
    className={cn(
      'text-center w-[240px] phoneH:w-[260px] sm:w-[320px] md:w-[340px] tablet:w-[520px] text-[29px] phoneH:text-[32px] sm:text-[36px] md:text-[42px] tablet:text-[64px]',
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
    <SpanGradientTitle>Пройдите квиз</SpanGradientTitle>, чтобы сделать
    идеальное шоу
  </div>
)

const QuizBackground = () => (
  <div className="absolute flex w-full h-full bg-white md:bg-transparent rounded-[18px] md:rounded-[30px]">
    <div
      className="hidden md:block flex-1 rounded-l-[30px] rounded-r-[30px] xl:rounded-r-none"
      style={{
        backgroundImage:
          'radial-gradient(48px at -20px 50%, transparent 48px, #fff 49px)',
        // backgroundImage:
        //   'radial-gradient(circle at 0% 0%, transparent, 30% 30%)',
      }}
    />
    <div
      className="flex-1 rounded-r-[30px] hidden xl:block"
      style={{
        backgroundImage:
          'radial-gradient(48px 48px at calc(100% + 20px) 50%, transparent 48px, #fff 49px)',
      }}
    />
  </div>
)

const QuizHeader = () => (
  <div
    className="flex justify-center rounded-[10px] md:rounded-[18px] py-[20px] h-[102px] sm:h-[87px] px-[30px] md:px-[50px]"
    style={{
      border: '1px solid rgba(14, 14, 28, 0.05)',
      background:
        'linear-gradient(343deg, rgba(96, 139, 246, 0.20) 0%, rgba(96, 139, 246, 0.00) 83.72%), linear-gradient(63deg, #0B0B15 0%, #1A1A32 100%)',
      backgroundBlendMode: 'color-dodge, normal',
      boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
      backdropFilter: 'blur(3px)',
    }}
  >
    <div className="flex flex-col gap-x-[12px] justify-between w-full sm:flex-row sm:items-center">
      <div
        className="text-[13px] md:text-[16px] tablet:text-[19px] whitespace-nowrap"
        style={{
          color: '#fff',
          fontWeight: 500,
          lineHeight: '135%',
        }}
      >
        В конце теста вас ждет <span className="md:font-bold">подарок</span>:
      </div>
      <svg
        className="hidden tablet:block w-[120px] tablet:w-[131px] xl:w-[173px] h-[14px]"
        xmlns="http://www.w3.org/2000/svg"
        // width="175"
        // height="17"
        viewBox="0 0 175 17"
        fill="none"
      >
        <path
          opacity="0.6"
          d="M173.825 12.6759C174.198 12.4964 174.355 12.0483 174.176 11.675L171.251 5.59174C171.071 5.21844 170.623 5.06133 170.25 5.24083C169.877 5.42034 169.719 5.86847 169.899 6.24177L172.499 11.6491L167.092 14.2492C166.718 14.4287 166.561 14.8769 166.741 15.2502C166.92 15.6235 167.368 15.7806 167.742 15.6011L173.825 12.6759ZM0.290503 12.7202C0.790297 12.8656 1.28816 13.0058 1.78416 13.1411L2.17885 11.694C1.691 11.5609 1.20123 11.4229 0.709497 11.2799L0.290503 12.7202ZM4.73812 13.8935C5.74502 14.1318 6.74444 14.3497 7.73688 14.548L8.03088 13.0771C7.05566 12.8822 6.07338 12.6681 5.08353 12.4338L4.73812 13.8935ZM10.7295 15.0913C11.7496 15.2578 12.7627 15.4041 13.7692 15.5312L13.9571 14.043C12.9684 13.9182 11.9733 13.7745 10.9711 13.6109L10.7295 15.0913ZM16.8082 15.8594C17.8285 15.951 18.8425 16.0234 19.8509 16.0778L19.9317 14.58C18.9409 14.5265 17.9446 14.4554 16.9423 14.3654L16.8082 15.8594ZM22.915 16.189C23.9381 16.2083 24.9558 16.2097 25.9688 16.1945L25.9463 14.6947C24.9498 14.7096 23.949 14.7082 22.9432 14.6893L22.915 16.189ZM29.0215 16.0991C30.0426 16.0509 31.0594 15.9867 32.0727 15.9078L31.9563 14.4124C30.9577 14.4901 29.956 14.5533 28.9507 14.6008L29.0215 16.0991ZM35.1112 15.6278C36.1239 15.5202 37.1336 15.3991 38.1412 15.2658L37.9444 13.7788C36.949 13.9105 35.952 14.03 34.9528 14.1361L35.1112 15.6278ZM41.1588 14.8303C42.162 14.6739 43.1637 14.5066 44.1646 14.3297L43.9035 12.8526C42.9119 13.0279 41.9202 13.1935 40.9278 13.3482L41.1588 14.8303ZM47.1599 13.7723C48.153 13.5787 49.1462 13.3769 50.14 13.1681L49.8315 11.7002C48.8442 11.9076 47.8582 12.108 46.8729 12.3L47.1599 13.7723ZM53.1132 12.5244C54.0999 12.3049 55.088 12.0797 56.0782 11.8501L55.7394 10.3889C54.7529 10.6176 53.7692 10.8418 52.7875 11.0601L53.1132 12.5244ZM59.0308 11.1552C60.0124 10.9212 60.9967 10.684 61.9843 10.4448L61.6312 8.98695C60.6447 9.22586 59.6622 9.4626 58.683 9.69606L59.0308 11.1552ZM64.9318 9.72878C65.9085 9.49119 66.889 9.25281 67.8742 9.01465L67.5217 7.55665C66.5354 7.79508 65.554 8.03369 64.5772 8.27128L64.9318 9.72878ZM70.8259 8.30629C71.8018 8.07421 72.7826 7.84343 73.769 7.61496L73.4305 6.15365C72.4408 6.38289 71.4571 6.61436 70.4789 6.84699L70.8259 8.30629ZM76.719 6.94342C77.7004 6.72425 78.6877 6.50831 79.6816 6.29657L79.369 4.8295C78.3699 5.04236 77.3778 5.25935 76.3921 5.47948L76.719 6.94342ZM82.6335 5.68486C83.6176 5.48695 84.6084 5.29397 85.6065 5.10681L85.33 3.6325C84.3251 3.82095 83.3278 4.01519 82.3378 4.2143L82.6335 5.68486ZM88.5762 4.57178C89.5615 4.40172 90.5543 4.23802 91.5549 4.0815L91.3231 2.59952C90.3143 2.75731 89.3138 2.9223 88.3211 3.09363L88.5762 4.57178ZM94.5495 3.6387C95.5358 3.50143 96.5301 3.37171 97.5327 3.25028L97.3524 1.76116C96.3407 1.88369 95.3376 2.01457 94.3427 2.15301L94.5495 3.6387ZM100.549 2.91341C101.536 2.81253 102.532 2.72014 103.536 2.63693L103.412 1.14205C102.398 1.22607 101.393 1.31934 100.396 1.42118L100.549 2.91341ZM106.557 2.41672C107.549 2.35435 108.549 2.30128 109.559 2.25815L109.495 0.759515C108.475 0.803087 107.465 0.856689 106.463 0.919676L106.557 2.41672ZM112.582 2.15987C113.576 2.13775 114.579 2.12552 115.591 2.12376L115.588 0.62376C114.566 0.625543 113.553 0.637899 112.548 0.660245L112.582 2.15987ZM118.613 2.14966C119.607 2.16843 120.61 2.19748 121.622 2.23732L121.681 0.73848C120.659 0.698234 119.646 0.66889 118.641 0.649928L118.613 2.14966ZM124.642 2.38721C125.633 2.44652 126.633 2.51631 127.642 2.59702L127.762 1.1018C126.743 1.02028 125.733 0.949799 124.732 0.889888L124.642 2.38721ZM130.662 2.86908C131.647 2.96772 132.64 3.07686 133.643 3.19689L133.821 1.70753C132.809 1.58635 131.806 1.47615 130.811 1.37654L130.662 2.86908ZM136.665 3.58852C137.641 3.72458 138.625 3.871 139.618 4.02814L139.852 2.54658C138.851 2.388 137.857 2.24022 136.872 2.10288L136.665 3.58852ZM142.622 4.53207C143.595 4.70449 144.576 4.8872 145.565 5.08051L145.853 3.60836C144.855 3.41336 143.865 3.22904 142.883 3.05508L142.622 4.53207ZM148.53 5.68675C149.507 5.89525 150.491 6.11407 151.484 6.3435L151.822 4.88202C150.821 4.65071 149.828 4.43007 148.843 4.2198L148.53 5.68675ZM154.402 7.04281C155.382 7.28612 156.37 7.53972 157.367 7.80388L157.751 6.35401C156.747 6.08781 155.751 5.83222 154.763 5.58698L154.402 7.04281ZM160.243 8.59013C161.205 8.86078 162.174 9.14123 163.151 9.43169L163.578 7.99394C162.595 7.70138 161.618 7.41888 160.649 7.14621L160.243 8.59013ZM166.062 10.3204C167.003 10.6152 167.951 10.9192 168.906 11.2327L169.374 9.80749C168.412 9.49191 167.458 9.18579 166.51 8.88895L166.062 10.3204ZM171.793 12.2017C172.277 12.368 172.764 12.5366 173.252 12.7078L173.748 11.2922C173.257 11.12 172.767 10.9502 172.28 10.7829L171.793 12.2017Z"
          fill="#A8A8CA"
        />
      </svg>
      <div className="flex flex-col 2xl:flex-row gap-x-[47px] text-[12px] md:text-[16px] tablet:text-[19px] font-normal text-[#A8A8CA]">
        <div className="flex items-center gap-x-[8px] md:gap-x-[15px]">
          <div
            className="-mt-[4px] w-[8px] md:w-[14px] h-[8px] md:h-[14px]"
            style={{
              borderRadius: 100,
              border: '1px solid rgba(14, 14, 28, 0.05)',
              background:
                'linear-gradient(67deg, #C17C0E 0%, #FFCA45 63.68%), rgba(14, 14, 28, 0.04)',
              boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
            }}
          />
          <div className="whitespace-nowrap">
            Бесплатная{' '}
            <span className="font-medium text-white">консультация</span>
          </div>
        </div>
        <div className="flex items-center gap-x-[8px] md:gap-x-[15px]">
          <div
            className="-mt-[4px] w-[8px] md:w-[14px] h-[8px] md:h-[14px]"
            style={{
              borderRadius: 100,
              border: '1px solid rgba(14, 14, 28, 0.05)',
              background:
                'linear-gradient(67deg, #C17C0E 0%, #FFCA45 63.68%), rgba(14, 14, 28, 0.04)',
              boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
            }}
          />
          <div className="whitespace-nowrap">
            Скидка <span className="font-medium text-white">-5%</span> на шоу
          </div>
        </div>
      </div>
      <svg
        className="sm:hidden absolute left-[calc(50%+30px)] top-[30px]"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="46"
        viewBox="0 0 64 46"
        fill="none"
      >
        <path
          opacity="0.6"
          d="M0.309221 41.5894C0.11396 41.7846 0.113961 42.1012 0.309221 42.2965L3.4912 45.4785C3.68647 45.6737 4.00305 45.6737 4.19831 45.4785C4.39357 45.2832 4.39357 44.9666 4.19831 44.7714L1.36988 41.9429L4.19831 39.1145C4.39357 38.9192 4.39357 38.6027 4.19831 38.4074C4.00304 38.2121 3.68646 38.2121 3.4912 38.4074L0.309221 41.5894ZM48.4574 0.998232C48.9662 1.04135 49.4612 1.09543 49.9425 1.16005L50.0756 0.168937C49.5776 0.102086 49.0663 0.0462521 48.5418 0.00180331L48.4574 0.998232ZM52.8046 1.70529C53.7953 1.95586 54.7101 2.25883 55.5493 2.60834L55.9338 1.6852C55.0459 1.31543 54.0843 0.997456 53.0498 0.73582L52.8046 1.70529ZM58.1048 3.96266C58.9391 4.52033 59.6567 5.14006 60.2593 5.81097L61.0032 5.14276C60.3412 4.40568 59.5593 3.73208 58.6605 3.13129L58.1048 3.96266ZM61.8167 8.16028C62.2107 9.01183 62.4696 9.91776 62.592 10.8666L63.5837 10.7387C63.4487 9.69145 63.1621 8.68682 62.7243 7.74042L61.8167 8.16028ZM62.5667 13.7003C62.4419 14.6066 62.2078 15.5396 61.8621 16.4905L62.8019 16.8322C63.1698 15.8202 63.4221 14.8185 63.5573 13.8368L62.5667 13.7003ZM60.6496 19.1049C60.1936 19.9144 59.6596 20.7299 59.0467 21.5458L59.8462 22.1464C60.4837 21.2978 61.0421 20.4458 61.5209 19.5956L60.6496 19.1049ZM57.1587 23.7894C56.5177 24.4756 55.8201 25.1583 55.0654 25.834L55.7325 26.579C56.5083 25.8843 57.2273 25.1809 57.8895 24.472L57.1587 23.7894ZM52.8016 27.7067C52.046 28.2856 51.2465 28.8567 50.4028 29.4178L50.9565 30.2505C51.8182 29.6775 52.6359 29.0934 53.4097 28.5005L52.8016 27.7067ZM47.8945 30.9787C47.0634 31.4628 46.1968 31.9372 45.2945 32.4003L45.7511 33.29C46.6688 32.819 47.551 32.3361 48.3979 31.8427L47.8945 30.9787ZM42.6449 33.6794C41.7707 34.0762 40.8674 34.4626 39.935 34.8373L40.3079 35.7652C41.2537 35.3851 42.1704 34.993 43.0582 34.59L42.6449 33.6794ZM37.1683 35.8836C36.253 36.2089 35.3127 36.5233 34.3472 36.8258L34.6462 37.7801C35.6235 37.4739 36.5758 37.1555 37.5032 36.8259L37.1683 35.8836ZM31.5084 37.6604C30.5774 37.9166 29.6252 38.1621 28.6518 38.3962L28.8855 39.3685C29.8694 39.1319 30.8321 38.8837 31.7738 38.6245L31.5084 37.6604ZM25.7468 39.0466C24.7959 39.2443 23.8264 39.4312 22.8381 39.6069L23.0131 40.5915C24.0108 40.4141 24.9899 40.2253 25.9503 40.0257L25.7468 39.0466ZM19.9215 40.084C18.949 40.2296 17.9596 40.3645 16.9533 40.4882L17.0753 41.4807C18.0902 41.3559 19.0883 41.2198 20.0696 41.073L19.9215 40.084ZM14.034 40.8106C13.0584 40.9064 12.0678 40.9919 11.0622 41.0668L11.1364 42.064C12.1497 41.9886 13.1482 41.9024 14.1317 41.8058L14.034 40.8106ZM8.11168 41.253C7.13466 41.3038 6.14426 41.3447 5.14045 41.3753L5.17097 42.3749C6.18185 42.344 7.1794 42.3028 8.16362 42.2516L8.11168 41.253ZM2.17437 41.4353C1.67368 41.4404 1.16982 41.4429 0.662776 41.4429L0.662774 42.4429C1.17316 42.4429 1.68039 42.4404 2.18445 42.4353L2.17437 41.4353Z"
          fill="#A8A8CA"
        />
      </svg>
    </div>
  </div>
)

const QuizCard = ({ title, imageName }) => (
  <div
    className="flex flex-col items-center px-[10px] pt-[10px] pb-[10px] md:px-[20px] md:pt-[20px] md:pb-[25px] rounded-[8px] md:rounded-[8px] w-[140px] h-[164px] md:w-[260px] md:h-[330px]"
    style={{
      background:
        'linear-gradient(341deg, rgba(96, 139, 246, 0.16) 0%, rgba(96, 139, 246, 0.00) 100%), #EDEDED',
      boxShadow:
        '3px 3px 25px 0px rgba(255, 255, 255, 0.03) inset, 0px 25px 36px 0px rgba(255, 255, 255, 0.20) inset',
    }}
  >
    <div className="relative">
      <img
        className="object-cover rounded-[5px] md:rounded-[10px] w-[120px] h-[75px] md:w-[220px] md:h-[167px]"
        alt={imageName}
        src={'/img/quiz/' + imageName + '.png'}
      />
      <I />
    </div>
    <div
      className="font-medium text-[#0E0E1C] text-[12px] md:text-[19px] mt-[11px] mb-[11px] md:mt-[20px] md:mb-[25px]"
      // style={{
      //   fontFamily: 'Montserrat',
      // }}
    >
      {title}
    </div>
    <div className="select-none group cursor-pointer duration-300 transition-all px-[15px] bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-r from-white to-white hover:from-[#692DC1] hover:to-[#AC80EC] h-[30px] md:h-[45px] rounded-[7px] w-full flex items-center gap-x-[12px] justify-between md:justify-center">
      <span className="text-[#0E0E1C] group-hover:text-white text-opacity-90 font-semibold text-[11px] md:text-[17px]">
        Выбрать
      </span>
      <svg
        className="group-hover:hidden"
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="12"
        viewBox="0 0 17 12"
        fill="none"
      >
        <path
          opacity="0.3"
          d="M1.5 5.2C1.05817 5.2 0.7 5.55817 0.7 6C0.7 6.44183 1.05817 6.8 1.5 6.8V5.2ZM16.0657 6.56569C16.3781 6.25327 16.3781 5.74673 16.0657 5.43431L10.9745 0.343146C10.6621 0.0307264 10.1556 0.0307264 9.84315 0.343146C9.53073 0.655565 9.53073 1.1621 9.84315 1.47452L14.3686 6L9.84315 10.5255C9.53073 10.8379 9.53073 11.3444 9.84315 11.6569C10.1556 11.9693 10.6621 11.9693 10.9745 11.6569L16.0657 6.56569ZM1.5 6.8H15.5V5.2H1.5V6.8Z"
          fill="#0E0E1C"
        />
      </svg>
      <svg
        className="hidden group-hover:block"
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="12"
        viewBox="0 0 16 13"
        fill="none"
      >
        <path
          d="M1 5.7C0.558172 5.7 0.2 6.05817 0.2 6.5C0.2 6.94183 0.558172 7.3 1 7.3V5.7ZM15.5657 7.06569C15.8781 6.75327 15.8781 6.24673 15.5657 5.93431L10.4745 0.843146C10.1621 0.530726 9.65557 0.530726 9.34315 0.843146C9.03073 1.15557 9.03073 1.6621 9.34315 1.97452L13.8686 6.5L9.34315 11.0255C9.03073 11.3379 9.03073 11.8444 9.34315 12.1569C9.65557 12.4693 10.1621 12.4693 10.4745 12.1569L15.5657 7.06569ZM1 7.3H15V5.7H1V7.3Z"
          fill="white"
        />
      </svg>
    </div>
  </div>
)

const QuizProgress = ({ progress }) => (
  <div className="h-[20px] w-full">
    <div
      className="relative h-[20px] md:h-[30px] only:w-full"
      style={{
        borderRadius: 90,
        background:
          'linear-gradient(341deg, rgba(96, 139, 246, 0.16) 0%, rgba(96, 139, 246, 0.00) 100%), #EDEDED',
        boxShadow:
          '3px 3px 25px 0px rgba(255, 255, 255, 0.03) inset, 0px 25px 36px 0px rgba(255, 255, 255, 0.20) inset',
      }}
    >
      <div
        className="absolute overflow-hidden z-10 left-0 h-full text-[#0E0E1C] flex items-center justify-center font-bold text-[12px] md:text-[17px]"
        style={{
          width: progress + '%',
          fontFamily: 'Montserrat',
          borderRadius: 90,
          background:
            'linear-gradient(67deg, #C17C0E 0%, #FFCA45 63.68%), linear-gradient(63deg, #692DC1 0%, #AC80EC 100%), #C4C4C4',
        }}
      >
        <SvgProgressDynamyc />
        <div className="z-10">{progress}%</div>
      </div>
    </div>
  </div>
)

const I = ({ onClick }) => (
  <div
    className="absolute hidden text-white rounded-full md:flex justify-center items-center cursor-pointer top-[10px] right-[10px] w-[30px] h-[30px] text-[20px] transition-all bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-r from-[#4272D1] to-[#83ACFF] hover:via-[#83ACFF] hover:to-[#4272D1]"
    style={{
      fontFamily: 'Montserrat',
      boxShadow:
        '3px 3px 8px 0px rgba(255, 255, 255, 0.25) inset, 0px 10px 25px 0px rgba(66, 114, 209, 0.55)',
    }}
    onClick={onClick}
  >
    i
  </div>
)

const Info = ({ className }) => (
  <div
    className={className}
    style={{
      display: 'inline',
      color: '#A8A8CA',
    }}
  >
    Нажмите на{' '}
    <span
      className="min-w-[22px] min-h-[22px]"
      style={{
        display: 'inline-block',
        width: 22,
        height: 22,
        borderRadius: 660,
        opacity: '0.8',
        background:
          'linear-gradient(59deg, #4272D1 0%, #83ACFF 100%), linear-gradient(63deg, #692DC1 0%, #AC80EC 100%)',
      }}
    >
      <div
        style={{
          color: '#fff',
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        i
      </div>
    </span>
    , чтобы узнать подробнее о каждом направлении
  </div>
)

const Quiz = () => {
  return (
    <div className="px-[18px] md:px-[52px] w-full">
      <div className="relative w-full max-w-[1360px] min-w-[339px] mt-[30px] md:[mt-60px]">
        <QuizBackground />
        <div className="flex flex-col gap-y-[30px] md:gap-y-[40px] xl:gap-y-[57px] relative px-[10px] md:px-[40px] xl:px-[100px] pt-[10px] md:pt-[40px] pb-[25px] md:pb-[50px]">
          <QuizHeader />
          <div className="px-[10px] md:px-0">
            <div className="relative z-10 font-bold text-[18px] md:text-[36px]">
              <span
                style={{
                  color: 'rgba(14, 14, 28, 0.17)',
                }}
              >
                01/03.
              </span>{' '}
              <span
                style={{
                  color: '#0E0E1C',
                }}
              >
                Что у вас за мероприятие?
              </span>
            </div>
          </div>
          {/* grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-2 tablet:grid-cols-3 2xl:grid-cols-4 */}
          <div className="w-full grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-2 tablet:grid-cols-3 2xl:grid-cols-4 gap-x-[20px] gap-y-[10px] md:gap-x-[30px] md:gap-y-[20px] 2xl:gap-x-[40px] 2xl:gap-y-[30px]">
            {/* <div className="inline-flex flex-wrap justify-evenly gap-x-[20px] gap-y-[10px] md:gap-x-[30px] md:gap-y-[20px] 2xl:gap-x-[40px] 2xl:gap-y-[30px]"> */}
            <QuizCard title="День рождения" imageName="birthday" />
            <QuizCard title="Свадьба" imageName="wedding" />
            <QuizCard title="Корпоратив" imageName="corporate" />
            <QuizCard title="Открытие заведения" imageName="opening" />
            <QuizCard title="Клуб" imageName="club" />
            <QuizCard title="Презентация" imageName="presentation" />
            <QuizCard title="Детский праздник" imageName="kids" />
            <QuizCard title="Другое" imageName="other" />
            <div className="hidden md:col-span-2 tablet:col-auto 2xl:hidden md:flex flex-col justify-end w-full h-auto tablet:w-[260px] tablet:h-[330px] text-center tablet:text-left">
              <Info />
            </div>
          </div>
          <QuizProgress progress={33} />
        </div>
      </div>
    </div>
  )
}

const QuizBlock = () => {
  return (
    <div className="relative flex justify-center w-full">
      <div className="flex flex-col items-center w-fit">
        <DivContent
          noMargin
          fullWidth={false}
          className="flex flex-col items-center mt-[123px] tablet:mt-[162px] xl:mt-[230px]"
        >
          <div className="flex flex-col items-center justify-center w-full sm:flex-row">
            <img
              className=" object-contain w-[50px] sm:w-[60px] md:w-[80px] tablet:w-[107px] -mr-[5px] -mt-[4px] -mb-[2px] sm:-mt-[5px] sm:-mb-[15px]  md:-mt-[5px] md:-mb-[15px] tablet:-mt-[6px] tablet:-mb-[17px]"
              alt="star"
              src="/img/star.png"
            />
            <Title />
            <img
              className="hidden sm:block -scale-x-100 object-contain w-[50px] sm:w-[60px] md:w-[80px] tablet:w-[107px] -mr-[5px] -mt-[4px] -mb-[12px]  sm:-mt-[5px] sm:-mb-[15px]  md:-mt-[5px] md:-mb-[15px] tablet:-mt-[6px] tablet:-mb-[17px]"
              alt="star"
              src="/img/star.png"
            />
          </div>
          <DivText className="text-center tablet:max-w-[600px] max-w-[320px] sm:max-w-[340px] md:max-w-[460px] mt-[18px] tablet:mt-[35px]">
            Этот тест поможет сделать представление именно под ваш праздник.{' '}
            <span
              style={{
                color: '#A8A8CA',
              }}
            >
              Не волнуйтесь, он проходится за 30 секунд.
            </span>
          </DivText>
        </DivContent>
        <Quiz />
      </div>
      <div
        className="absolute hidden xl:block right-0 z-10 w-[207px] h-[265px] 2xl:w-[235px] 2xl:h-[303px] top-[75px] aspect-[235/303]"
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
    </div>
  )
}

export default QuizBlock
