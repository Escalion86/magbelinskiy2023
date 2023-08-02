import React from 'react'
import cn from 'classnames'

const Button = ({ className }) => (
  <div
    className={cn(
      'relative cursor-pointer group select-none w-[250px] h-[70px] tablet:w-[360px] tablet:h-[100px]',
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

export default Button
