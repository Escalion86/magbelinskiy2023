import React from 'react'
import cn from 'classnames'
import Image from 'next/image'

const InfoCard = ({ className, children }) => (
  <div
    className={cn(
      'max-w-[420px] w-full h-[32px] md:h-[70px] md:w-[310px] flex justify-center items-center gap-[10px] md:gap-[15px] pl-[10px] md:pl-[20px] pr-[9px] md:pr-[18px] py-[7px] md:py-[13px]',
      className
    )}
    style={{
      // width: 310,
      minWidth: 310,
      // height: 70,
      borderRadius: 7,
      border: '1px solid rgba(255, 255, 255, 0.05)',
      background:
        'linear-gradient(63deg, rgba(11, 11, 21, 0.30) 0%, rgba(26, 26, 50, 0.30) 100%)',
      boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
    }}
  >
    {children}
  </div>
)

const Button = ({ className }) => (
  <div
    className={cn(
      'relative cursor-pointer group w-[250px] h-[70px] tablet:w-[360px] tablet:h-[100px]',
      className
    )}
  >
    <div
      className="absolute w-[220px] h-[48px] tablet:w-[330px] tablet:h-[78px] top-[25px] tablet:top-[31px] transition-all duration-300 from-[#692DC1] bg-gradient-to-r to-[#AC80EC] via-[47%] group-hover:via-[#AC80EC] group-hover:to-[#A676EC] bg-size-200 bg-pos-0 group-hover:bg-pos-100 group-active:from-[#642bb7] group-active:via-[#a270ea] group-active:to-[#9c66ea]"
      style={{
        borderRadius: 900,
        opacity: 0.8,
        // background: 'linear-gradient(63deg, #692DC1 0%, #AC80EC 100%)',
        boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
        filter: 'blur(32.5px)',
      }}
    />
    <div
      className="absolute rounded-[35px] tablet:rounded-[35px] w-[250px] h-[30px] tablet:w-[360px] tablet:h-[60px] group-hover:h-[20px] group-active:h-[10px] tablet:group-hover:h-[45px] tablet:group-active:h-[30px] -bottom-[7px] tablet:-bottom-[9px] transition-all duration-300 from-[#5f29ae] bg-gradient-to-r to-[#9760e7] via-[47%] group-hover:via-[#9760e7] group-hover:to-[#9257e8] bg-size-200 bg-pos-0 group-hover:bg-pos-100 group-active:from-[#5a27a5] group-active:via-[#8e52e6] group-active:to-[#8948e6]"
      style={{
        // borderRadius: 900,
        // background:
        //   'linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), linear-gradient(63deg, #692DC1 0%, #AC80EC 100%)',
        boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
      }}
    />
    <div
      className={cn(
        'rounded-[10px] tablet:rounded-[15px] absolute z-10 bottom-0 group-hover:-bottom-[3px] group-active:-bottom-[7px] tablet:group-hover:-bottom-[4px] tablet:group-active:-bottom-[9px] w-[250px] h-[70px] tablet:w-[360px] tablet:h-[100px] transition-all duration-300 flex gap-x-[20px] justify-center items-center py-[25px] px-[20px] from-[#692DC1] bg-gradient-to-r to-[#AC80EC] via-[47%] group-hover:via-[#AC80EC] group-hover:to-[#A676EC] bg-size-200 bg-pos-0 group-hover:bg-pos-100 group-active:from-[#642bb7] group-active:via-[#a270ea] group-active:to-[#9c66ea]'
      )}
      style={{
        // borderRadius: 15,
        // background: 'linear-gradient(63deg, #692DC1 0%, #AC80EC 100%)',
        boxShadow:
          '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset, 0px 25px 36px 0px rgba(255, 255, 255, 0.20) inset',
      }}
    >
      <div
        className="text-[16px] tablet:text-[22px] tracking-[0.64px] tablet:leading-[125%] tablet:tracking-[0.88px]"
        style={{
          color: 'rgba(255, 255, 255, 0.90)',
          textAlign: 'center',
          fontStyle: 'normal',
          // fontWeight: 600,
          // lineHeight: '100%',
          // letterSpacing: 0.64,
        }}
      >
        Заказать шоу
      </div>
      <img
        className="w-[36px] h-[36px] tablet:w-[50px] tablet:h-[50px] object-contain opacity-60"
        // style={{}}
        alt="logo"
        src="/img/logo_white.png"
        // width={996}
        // height="75%"
      />
    </div>
  </div>
)

const Title = ({ className }) => (
  <div
    className={cn(
      'flex flex-col mt-[20px] md:mt-[40px] text-[38px] phoneH:text-[44px] sm:text-[50px] md:text-[60px] tablet:text-[84px]',
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
    <span>Закажите незабываемое</span>
    <div className="flex">
      <img
        className="object-contain -ml-[15px] w-[50px] sm:w-[60px] md:w-[80px] tablet:w-[107px] -mr-[5px] -mt-[4px] -mb-[12px] sm:-ml-[17px] sm:-mr-[6px] sm:-mt-[5px] sm:-mb-[15px] md:-ml-[22px] md:-mr-[8px] md:-mt-[5px] md:-mb-[15px] tablet:-ml-[30px] tablet:-mr-[6px] tablet:-mt-[6px] tablet:-mb-[17px]"
        alt="star"
        src="/img/star.png"
        // width={996}
        // height="75%"
      />
      <span
        style={{
          background: 'linear-gradient(67deg, #C17C0E 0%, #FFCA45 63.68%)',
          // backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          // color: '#0B2349',
        }}
      >
        шоу иллюзиониста
      </span>
    </div>
    <span>на свой праздник</span>
  </div>
)

const SvgParty = () => (
  <svg
    className="w-[18px] min-w-[18px] md:min-w-[36px] md:w-[36px]"
    xmlns="http://www.w3.org/2000/svg"
    width="37"
    height="36"
    viewBox="0 0 37 36"
    fill="none"
  >
    <path
      d="M9.2 16.95L3.5 33L19.55 27.3149"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 4.5H6.51333"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.5 12H33.5133"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 3H23.0133"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.5 30H33.5133"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.5 3L30.14 4.125C29.1836 4.44358 28.3675 5.08446 27.8312 5.93809C27.295 6.79171 27.0719 7.80509 27.2 8.805V8.805C27.35 10.095 26.345 11.25 25.025 11.25H24.455C23.165 11.25 22.055 12.15 21.815 13.41L21.5 15"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.5 19.4999L32.27 19.0049C30.98 18.4949 29.54 19.3049 29.3 20.6699C29.135 21.7199 28.22 22.4999 27.155 22.4999H26"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 3L17.495 4.23C18.005 5.52 17.195 6.96 15.83 7.2C14.78 7.35 14 8.28 14 9.345V10.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.9998 19.5C19.8948 22.395 21.2448 25.755 19.9998 27C18.7548 28.245 15.3948 26.895 12.4998 24C9.60478 21.105 8.25478 17.745 9.49978 16.5C10.7448 15.255 14.1048 16.605 16.9998 19.5Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const SvgDiamond = () => (
  <svg
    className="w-[18px] min-w-[18px] md:min-w-[36px] md:w-[36px]"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M7.99984 4H23.9998L29.3332 12L15.9998 29.3333L2.6665 12L7.99984 4Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 29.3333L21.3333 12L17.3333 4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9998 29.3333L10.6665 12L14.6665 4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.6665 12H29.3332"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const InfoCardSpecial = () => (
  <InfoCard>
    <SvgDiamond />
    <div
      className="text-[11px] md:text-[16px]"
      style={{
        // width: 211,
        color: '#FFF',
        // fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '135%' /* 21.6px */,
      }}
    >
      Продумаю шоу{' '}
      <span style={{ color: '#A8A8CA' }}>специально под ваше мероприятие</span>
    </div>
  </InfoCard>
)

const InfoCardInclusive = () => (
  <InfoCard className="hidden tablet:flex">
    <SvgParty />
    <div
      className="text-[11px] md:text-[16px]"
      style={{
        // width: 211,
        color: '#FFF',
        // fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '135%' /* 21.6px */,
      }}
    >
      Приеду со своим реквизитом{' '}
      <span style={{ color: '#A8A8CA' }}>и сделаю все сам</span>
    </div>
  </InfoCard>
)

const CupInfo = ({ className }) => (
  <div
    className={cn(
      'w-[252px] md:w-[420px] tablet:w-[592px] mt-[20px] md:mt-[10px] flex-row-reverse md:flex-row flex items-center',
      className
    )}
  >
    {/* <div
style={{
  width: 99.109,
  height: 148.664,
  // transform: 'rotate(-15deg)',
  flexShrink: 0,
  background:
    'url("/img/cup.png"), lightgray 50% / cover no-repeat',
}}
></div> */}
    <img
      className="w-[80px] md:w-[100px] tablet:w-[132px] object-contain md:-ml-[22px] -mr-[8px]"
      alt="cup"
      src="/img/cup.png"
      // width={996}
      // height="75%"
    />
    <div
      className="text-[12px] md:text-[15px] tablet:text-[21px]"
      style={{
        color: '#A8A8CA',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '145%' /* 30.45px */,
      }}
    >
      Вы получите{' '}
      <span
        style={{
          color: '#FFF',
          fontWeight: 600,
        }}
      >
        представление телевизионного уровня
      </span>
      , которое подарит массу эмоций и запомнится на всю жизнь.
    </div>
  </div>
)

const DiscountInfo = ({ className }) => (
  <div
    className={cn(
      'items-center gap-x-[10px] md:gap-x-[15px] mb-[25px] mt-[30px]',
      className
    )}
  >
    <div
      className="w-[7px] h-[7px] min-w-[7px] rounded-full"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'linear-gradient(63deg, #4272D1 0%, #83ACFF 100%)',
        boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
      }}
    />
    <div
      className="text-[11px] md:text-[15px] tablet:text-[16px]"
      style={{
        color: '#A8A8CA',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '115%',
      }}
    >
      Если закажите сейчас, получите{' '}
      <span className="tablet:font-medium" style={{ color: '#FFF' }}>
        бесплатную консультацию и скидку 5%
      </span>
    </div>
  </div>
)

const Content = () => (
  <div className="relative z-10 md:mt-[124px] max-w-[1264px] w-full px-[18px] md:px-[52px]">
    <div className="flex gap-x-[13px] mt-[40px] phoneH:mt-[20px] md:mt-auto">
      <InfoCardSpecial />
      <InfoCardInclusive />
    </div>
    <Title className="" />
    <CupInfo className="" />
    <div className="items-center gap-x-[10px] md:gap-x-[15px] mb-[25px] mt-[30px] flex tablet:hidden">
      <SvgParty />
      <div
        className="flex flex-col text-[11px] md:text-[15px]"
        style={{
          color: '#FFF',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '115%',
        }}
      >
        <span>Приеду со своим реквизитом</span>
        <span style={{ color: '#A8A8CA' }}>и сделаю все сам</span>
      </div>
    </div>
    <div className="relative h-[70px] tablet:h-[100px] w-fit pr-[20px]">
      <div
        className="hidden tablet:block absolute left-8 right-0 h-full mt-[9px] rounded-r-[10px] tablet:rounded-r-[15px]"
        style={{
          // borderRadius: 7,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          background:
            'linear-gradient(343deg, rgba(96, 139, 246, 0.10) 0%, rgba(96, 139, 246, 0.00) 83.72%), linear-gradient(63deg, rgba(11, 11, 21, 0.10) 0%, rgba(26, 26, 50, 0.10) 100%)',
          backgroundBlendMode: 'color-dodge, normal',
          boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
          backdropFilter: 'blur(3px)',
        }}
      />
      <div className="relative flex items-center gap-x-[30px]">
        <Button className="-mt-[9px]" />
        <DiscountInfo className="hidden tablet:flex w-[220px]" />
      </div>
    </div>
    <DiscountInfo className="flex tablet:hidden w-[220px] md:w-[290px]" />
  </div>
)

export default Content
