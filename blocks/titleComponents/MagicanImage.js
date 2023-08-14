import React from 'react'

const MagicanImage = () => (
  <div className="absolute bottom-0 left-[min(calc(40%),calc(12%+260px))] top-[70px] z-10 flex max-h-full w-[96%] justify-center sm:bottom-auto sm:h-full sm:w-[max(300px,97%)] tablet:max-h-[1035px]">
    <div className="relative z-10 h-full">
      <img
        className="h-full w-full object-contain"
        alt="foto"
        src="/img/magican1.png"
        draggable={false}
      />
      <div
        className="absolute top-[50%] -z-10 aspect-[4/6] w-[43%] -translate-y-1/2 -rotate-[30deg]"
        style={{
          left: '35%',
          flexShrink: 0,
          borderRadius: 900,
          opacity: 0.6000000238418579,
          background: 'linear-gradient(63deg, #4272D1 0%, #83ACFF 100%)',
          boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
          filter: 'blur(137.5px)',
        }}
      />
      <div
        className="laptop:right-[20%] absolute right-[40%] top-[60%] z-20 w-[140px] sm:top-[65%] sm:w-[264px] tablet:right-[36%] xl:w-[330px]"
        style={{
          borderRadius: 7,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          background:
            'linear-gradient(343deg, rgba(96, 139, 246, 0.30) 0%, rgba(96, 139, 246, 0.00) 83.72%), linear-gradient(63deg, rgba(11, 11, 21, 0.70) 0%, rgba(26, 26, 50, 0.70) 100%)',
          backgroundBlendMode: 'color-dodge, normal',
          boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
          backdropFilter: 'blur(3px)',
        }}
      >
        <div className="relative pb-[8px] pl-[12px] pr-[20px] pt-[6px] sm:pb-[18.4px] sm:pl-[32px] sm:pr-[50px] sm:pt-[17px] xl:pb-[23px] xl:pl-[40px] xl:pr-[60px] xl:pt-[21px]">
          <div
            className="absolute right-[5px] top-[5px] h-[4.5px] w-[4.5px] sm:right-[12px] sm:top-[12px] sm:h-[11.2px] sm:w-[11.2px] xl:right-[15px] xl:top-[15px] xl:h-[15px] xl:w-[15px]"
            style={{
              flexShrink: 0,
              borderRadius: 100,
              border: '1px solid rgba(255, 255, 255, 0.05)',
              background: 'rgba(255, 255, 255, 0.04)',
              boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
            }}
          />
          <div
            className="text-[9px] sm:text-[19.2px] xl:text-[24px]"
            style={{
              color: '#FFF',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '135%',
            }}
          >
            Алексей Белинский
          </div>
          <div
            className="text-[7px] sm:text-[12.8px] xl:text-[16px]"
            style={{
              color: '#A8A8CA',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '125%',
            }}
          >
            Иллюзионист с опытом 20 лет, снимается на телеканале ТНТ
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default MagicanImage
