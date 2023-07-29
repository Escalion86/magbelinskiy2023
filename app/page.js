import cn from 'classnames'
import Image from 'next/image'

const MenuItem = ({ name, active }) => (
  <li
    className="cursor-pointer"
    style={{
      color: active ? '#FFF' : '#A8A8CA',
      textAlign: 'center',
      // fontFamily: 'Inter Tight',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '125%' /* 20px */,
    }}
  >
    {name}
  </li>
)

const ContactButton = ({ children }) => (
  <div
    className="cursor-pointer w-[36px] h-[36px] sm:w-[50px] sm:h-[50px] p-[8px] sm:p-[13px]"
    style={{
      display: 'flex',
      // padding: '30px 50px',
      justifyContent: 'center',
      alignItems: 'center',
      // gap: 20,
      // flexShrink: 0,
      borderRadius: '7px',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      background: 'linear-gradient(63deg, #0B0B15 0%, #1A1A32 100%)',
      boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.06) inset',
    }}
  >
    {children}
  </div>
)

const TelegramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clipPath="url(#clip0_72_1821)">
      <path
        d="M23.53 1.9663C23.3401 1.79249 23.1073 1.67238 22.8556 1.6183C22.6039 1.56421 22.3423 1.57811 22.0978 1.65857L0.995214 8.61486C0.420104 8.80443 0.0301044 9.3178 0.00165128 9.92263C-0.026755 10.5275 0.313323 11.0752 0.868042 11.318L6.08687 13.6014L7.66145 20.9043C7.72684 21.2076 7.88082 21.4779 8.20703 21.561C8.53698 21.645 8.77009 21.4647 9.01628 21.2804L12.8891 18.3805L17.4167 22.0854C17.6804 22.3013 18.0027 22.4139 18.3314 22.4139C18.4906 22.4138 18.6487 22.3875 18.7995 22.3363C19.276 22.1747 19.6292 21.7858 19.7444 21.296L23.9616 3.36618C24.0204 3.11554 24.0114 2.85377 23.9356 2.60775C23.8597 2.36173 23.7197 2.14033 23.53 1.9663ZM9.35364 14.9098C9.35106 14.9159 9.34853 14.9228 9.34614 14.931L8.47313 17.9811L7.49889 13.4626L14.1981 9.74047L9.51432 14.6379C9.44087 14.7152 9.38593 14.8082 9.35364 14.9098ZM9.63071 19.0594L10.0272 17.674L10.4065 16.3489L11.7654 17.461L9.63071 19.0594ZM22.5894 3.04339L18.3723 20.9732C18.3702 20.9821 18.3674 20.9944 18.3468 21.0013C18.3264 21.0083 18.3164 21.0004 18.3094 20.9946L13.3551 16.9404L13.3547 16.9401L11.0593 15.0617L18.4338 7.35088C18.5504 7.22901 18.6194 7.06939 18.6283 6.90099C18.6372 6.7326 18.5854 6.56659 18.4824 6.43311C18.3793 6.29962 18.2318 6.2075 18.0666 6.17348C17.9015 6.13946 17.7296 6.1658 17.5822 6.24772L6.66259 12.3147L1.43307 10.0266C1.41714 10.0197 1.40837 10.0158 1.40964 9.98882C1.4109 9.96196 1.42 9.95891 1.4365 9.95347L22.5391 2.99722C22.5493 2.99389 22.5608 2.99005 22.5778 3.00552C22.5947 3.02108 22.5919 3.03289 22.5894 3.04339Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_72_1821">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const WhatsappIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clipPath="url(#clip0_72_1825)">
      <path
        d="M17.5071 14.3069L17.4981 14.3819C15.2991 13.2859 15.0691 13.1399 14.7851 13.5659C14.5881 13.8609 14.0141 14.5299 13.8411 14.7279C13.6661 14.9229 13.4921 14.9379 13.1951 14.8029C12.8951 14.6529 11.9321 14.3379 10.7921 13.3179C9.90414 12.5229 9.30814 11.5479 9.13214 11.2479C8.83914 10.7419 9.45214 10.6699 10.0101 9.61393C10.1101 9.40393 10.0591 9.23893 9.98514 9.08993C9.91014 8.93993 9.31314 7.46993 9.06314 6.88393C8.82314 6.29993 8.57614 6.37393 8.39114 6.37393C7.81514 6.32393 7.39414 6.33193 7.02314 6.71793C5.40914 8.49193 5.81614 10.3219 7.19714 12.2679C9.91114 15.8199 11.3571 16.4739 14.0011 17.3819C14.7151 17.6089 15.3661 17.5769 15.8811 17.5029C16.4551 17.4119 17.6481 16.7819 17.8971 16.0769C18.1521 15.3719 18.1521 14.7869 18.0771 14.6519C18.0031 14.5169 17.8071 14.4419 17.5071 14.3069Z"
        fill="white"
      />
      <path
        d="M20.52 3.44894C12.831 -3.98406 0.106 1.40694 0.101 11.8929C0.101 13.9889 0.65 16.0329 1.696 17.8379L0 23.9999L6.335 22.3479C14.24 26.6179 23.996 20.9479 24 11.8989C24 8.72295 22.76 5.73394 20.505 3.48794L20.52 3.44894ZM22.002 11.8659C21.996 19.4989 13.617 24.2659 6.99 20.3699L6.63 20.1559L2.88 21.1309L3.885 17.4859L3.646 17.1109C-0.478 10.5459 4.26 1.96594 12.072 1.96594C13.3766 1.96266 14.6688 2.21817 15.874 2.71767C17.0791 3.21717 18.1733 3.95075 19.093 4.87594C20.0178 5.78952 20.7513 6.87815 21.2507 8.07829C21.7502 9.27843 22.0056 10.566 22.002 11.8659Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_72_1825">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const BurgerIcon = () => (
  <svg
    width="34"
    height="18"
    viewBox="0 0 34 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 2H32" stroke="white" strokeWidth="2.3" strokeLinecap="round" />
    <path d="M6 9H28" stroke="white" strokeWidth="2.3" strokeLinecap="round" />
    <path d="M2 16H32" stroke="white" strokeWidth="2.3" strokeLinecap="round" />
  </svg>
  // <svg
  //   width="50"
  //   height="50"
  //   viewBox="0 0 50 50"
  //   fill="none"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <g>
  //     <rect width="50" height="50" rx="7" fill="url(#paint0_linear_72_2258)" />
  //     <path
  //       d="M10 18H40"
  //       stroke="white"
  //       strokeWidth="2.3"
  //       strokeLinecap="round"
  //     />
  //     <path
  //       d="M14 25H36"
  //       stroke="white"
  //       strokeWidth="2.3"
  //       strokeLinecap="round"
  //     />
  //     <path
  //       d="M10 32H40"
  //       stroke="white"
  //       strokeWidth="2.3"
  //       strokeLinecap="round"
  //     />
  //   </g>
  // </svg>
)

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

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <div className="relative h-[560px] phoneH:h-[620px] sm:h-[700px] flex flex-col items-center w-screen md:h-screen overflow-hidden">
        {/* Шапка */}
        <div
          className="mt-[30px] gap-x-[10px] max-w-[1264px] w-full px-[17px] md:px-[52px] relative flex justify-between"
          style={{
            height: 60,
            // flexShrink: 0,
            // backgroundColor: 'transparent',
          }}
        >
          <div className="flex-1 flex gap-x-[19px] items-center">
            <Image
              className="sm:hidden"
              alt="logo"
              src="/img/logo.png"
              width={46}
              height={46}
            />
            <Image
              className="hidden sm:block"
              alt="logo"
              src="/img/logo.png"
              width={60}
              height={60}
            />
            <div
              className="flex-col hidden whitespace-nowrap md:flex text-[15px] tablet:text-[16px]"
              style={{
                color: '#fff', //'#8383A7',
                // fontFamily: 'Inter Tight',
                // fontSize: 16,
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '125%' /* 20px */,
              }}
            >
              <span>Алексей Белинский</span>
              <span
                style={{
                  color: '#A8A8CA',
                }}
              >
                Иллюзионист
              </span>
            </div>
          </div>
          <ol
            className="items-center justify-center hidden xl:flex"
            style={{
              padding: '18px 40px',
              gap: 40,
              borderRadius: 900,
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <MenuItem name="Об иллюзионисте" active />
            <MenuItem name="Фотографии" />
            <MenuItem name="Отзывы" />
          </ol>
          <div className="flex-1 flex items-center gap-x-[13px] md:gap-x-[20px] justify-end">
            <div className="flex items-center gap-x-[3px] md:gap-x-[10px]">
              <ContactButton>
                <WhatsappIcon />
              </ContactButton>
              <ContactButton>
                <TelegramIcon />
              </ContactButton>
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap text-[15px] sm:text-[22px]">
              <div
                className="cursor-pointer"
                style={{
                  color: '#FFF',
                  textAlign: 'right',
                  // fontFamily: 'Inter Tight',
                  // fontSize: 22,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '125%' /* 27.5px */,
                }}
              >
                8(913)837-00-20
              </div>
              <div
                className="cursor-pointer w-fit text-[12px] sm:text-[15px] md:text-[16px]"
                style={{
                  color: '#A8A8CA',
                  // fontFamily: 'Inter Tight',
                  // fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '125%' /* 20px */,
                  borderBottom: '1px dashed rgba(168, 168, 202, 0.5)',
                  webkitBackgroundClip: 'padding-box',
                  backgroundClip: 'padding-box',
                }}
              >
                Заказать звонок
              </div>
            </div>
            <div className="xl:hidden md:ml-[50px]">
              <ContactButton>
                <BurgerIcon />
              </ContactButton>
            </div>
          </div>
        </div>
        {/* Контент */}
        <div className="md:mt-[124px] max-w-[1264px] w-full px-[18px] md:px-[52px]">
          <div className="flex gap-x-[13px] mt-[40px] phoneH:mt-[20px] md:mt-auto">
            <InfoCard>
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
                <span style={{ color: '#A8A8CA' }}>
                  специально под ваше мероприятие
                </span>
              </div>
            </InfoCard>
            <InfoCard className="hidden tablet:flex">
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
                  stroke-linecap="round"
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
          </div>
          <div
            className="flex flex-col mt-[20px] md:mt-[40px] text-[38px] phoneH:text-[44px] sm:text-[50px] md:text-[60px] tablet:text-[84px]"
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
                  background:
                    'var(--title-h-1-gold-gradient, linear-gradient(67deg, #C17C0E 0%, #FFCA45 63.68%))',
                  backgroundClip: 'text',
                  webkitBackgroundClip: 'text',
                  webkitTextFillColor: 'transparent',
                }}
              >
                шоу иллюзиониста
              </span>
            </div>
            <span>на свой праздник</span>
          </div>
          <div className="w-[260px] md:w-[460px] tablet:w-[592px] mt-[20px] md:mt-[10px] flex-row-reverse md:flex-row flex items-center">
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
              className="w-[80px] md:w-[100px] tablet:w-[132px] object-contain -ml-[22px] -mr-[8px]"
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
        </div>
        {/* Фон */}
        <div
          style={{
            maskMode: 'alpha',
            background:
              'linear-gradient(180deg, #D9D9D9 83.34%, rgba(217, 217, 217, 0.00) 100%);',
          }}
          className="absolute top-0 w-screen h-full -z-10 shrink-0"
        >
          {/* Фон */}
          <div
            className="absolute w-full h-full"
            style={{
              background:
                'linear-gradient(0deg, rgba(11, 11, 21, 0.20) 0%, rgba(11, 11, 21, 0.20) 100%), linear-gradient(0deg, #0F0F1E 0%, #0F0F1E 100%), linear-gradient(180deg, #D9D9D9 83.34%, rgba(217, 217, 217, 0.00) 100%);',
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
              'linear-gradient(180deg, #D9D9D9 83.34%, rgba(217, 217, 217, 0.00) 100%);',
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
            className="absolute right-0 z-10 w-[74px] h-[95px] sm:w-[135px] sm:h-[173px] 2xl:w-[235px] 2xl:h-[303px] bottom-[4%] top-auto 2xl:bottom-auto 2xl:top-[24%] aspect-[235/303]"
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
          {/* Подпись фотографии */}
          <div
            className="absolute z-20 top-[58%] right-[15%] sm:top-[63.5%] sm:left-[min(calc(100%-330px-52px),67%)] w-[105px] sm:w-[264px] xl:w-[330px]"
            style={{
              // width: 330,
              // height: 121,
              flexShrink: 0,
              borderRadius: 7,
              border: '1px solid rgba(255, 255, 255, 0.05)',
              background:
                'linear-gradient(343deg, rgba(96, 139, 246, 0.30) 0%, rgba(96, 139, 246, 0.00) 83.72%), linear-gradient(63deg, rgba(11, 11, 21, 0.70) 0%, rgba(26, 26, 50, 0.70) 100%)',
              backgroundBlendMode: 'color-dodge, normal',
              boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
              backdropFilter: 'blur(3px)',
            }}
          >
            <div className="relative pb-[8px] pt-[6px] pl-[12px] pr-[20px] sm:pb-[18.4px] sm:pt-[17px] sm:pl-[32px] sm:pr-[50px] xl:pb-[23px] xl:pt-[21px] xl:pl-[40px] xl:pr-[60px]">
              <div
                className="absolute w-[4.5px] h-[4.5px] sm:w-[11.2px] sm:h-[11.2px] xl:w-[15px] xl:h-[15px] top-[5px] right-[5px] sm:top-[12px] sm:right-[12px] xl:top-[15px] xl:right-[15px]"
                style={{
                  // width: 14,
                  // height: 14,
                  flexShrink: 0,
                  borderRadius: 100,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
                }}
              />
              <div
                className="text-[7.6px] sm:text-[19.2px] xl:text-[24px]"
                style={{
                  color: '#FFF',
                  // fontFamily: 'Inter Tight',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '135%',
                }}
              >
                Алексей Белинский
              </div>
              <div
                className="text-[5px] sm:text-[12.8px] xl:text-[16px]"
                style={{
                  color: '#A8A8CA',
                  // fontFamily: 'Inter Tight',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '125%',
                }}
              >
                Иллюзионист с опытом 20 лет, снимается на телеканале ТНТ
              </div>
            </div>
          </div>
          {/* <div className="relative z-10 left-[70%] -translate-x-[40%] aspect-[715/743] max-w-[996px] max-h-[1035px] w-[min(60%, 996px)">
          <img
            className="absolute top-0 right-0 z-10 h-full"
            alt="foto"
            src="/img/magican1.png"
            // width={996}
            // height="75%"
          /> */}
          {/* right-[max(calc(-50%+134px),-500px)] */}
          {/* left-[min(calc(100%-650px),calc(72%-450px))] */}
          <div className="absolute flex justify-center z-10 left-[min(calc(37%),calc(12%+260px))] bottom-0 sm:bottom:auto top-auto sm:top-0 w-[88%] sm:w-[max(300px,97%)] sm:h-full max-h-[1035px]">
            <div className="relative z-10 h-full">
              <img
                className="object-contain w-full h-full"
                alt="foto"
                src="/img/magican1.png"
                // width={996}
                // height="75%"
              />
              <div
                className="-z-10 absolute w-[43%] aspect-[4/6] top-[50%] -rotate-[30deg] -translate-y-1/2"
                style={{
                  // top: 'calc(22%',
                  left: '35%',
                  // width: 384,
                  // height: 603.004,
                  // transform: 'rotate(-30deg)',
                  flexShrink: 0,
                  borderRadius: 900,
                  opacity: 0.6000000238418579,
                  background:
                    'linear-gradient(63deg, #4272D1 0%, #83ACFF 100%)',
                  boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
                  filter: 'blur(137.5px)',
                }}
              />
            </div>
          </div>

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
      </div>
    </main>
  )
}
