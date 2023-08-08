import React from 'react'

const MagicanImage = () => (
  <div className="absolute flex justify-center z-10 left-[min(calc(40%),calc(12%+260px))] bottom-[80px] phoneH:bottom-0 phoneH:top-[70px] sm:bottom-auto top-auto sm:top-0 w-[96%] sm:w-[max(300px,97%)] sm:h-full max-h-full tablet:max-h-[1035px]">
    <div className="relative z-10 h-full">
      <img
        className="object-contain w-full h-full"
        alt="foto"
        src="/img/magican1.png"
        draggable={false}
      />
      <div
        className="-z-10 absolute w-[43%] aspect-[4/6] top-[50%] -rotate-[30deg] -translate-y-1/2"
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
        className="absolute z-20 top-[60%] right-[40%] tablet:right-[36%] laptop:right-[20%] sm:top-[65%] w-[140px] sm:w-[264px] xl:w-[330px]"
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
        <div className="relative pb-[8px] pt-[6px] pl-[12px] pr-[20px] sm:pb-[18.4px] sm:pt-[17px] sm:pl-[32px] sm:pr-[50px] xl:pb-[23px] xl:pt-[21px] xl:pl-[40px] xl:pr-[60px]">
          <div
            className="absolute w-[4.5px] h-[4.5px] sm:w-[11.2px] sm:h-[11.2px] xl:w-[15px] xl:h-[15px] top-[5px] right-[5px] sm:top-[12px] sm:right-[12px] xl:top-[15px] xl:right-[15px]"
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
