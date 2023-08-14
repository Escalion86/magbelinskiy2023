'use client'

import React, { useState } from 'react'
import cn from 'classnames'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivText from './components/DivText'
import { useRecoilState, useSetRecoilState } from 'recoil'
import showModalZakazAtom from '@/state/showModalZakazAtom'
import MaskedInput from 'react-text-mask'
import { postData } from '@/helpers/CRUD'

const Title = ({ className }) => (
  <div
    className={cn(
      'w-[250px] text-center font-buyan text-[29px] font-bold leading-[100%] text-black phoneH:w-[280px] phoneH:text-[32px] sm:w-[320px] sm:text-[36px] md:w-[360px] md:text-[42px] tablet:w-[560px] tablet:text-[64px]',
      className
    )}
  >
    <SpanGradientTitle>Оставьте заявку</SpanGradientTitle>, чтобы
    <br />
    обсудить шоу для вас
  </div>
)

const ModalZakaz = () => {
  const [showModalZakaz, setShowModalZakaz] = useRecoilState(showModalZakazAtom)
  const [phone, setPhone] = useState()

  const onSubmit = async () => {
    await postData(
      `/api/request`,
      { phone }
      // (data) => console.log('data :>> ', data)
      // (data) => {
      //   snackbar.success(messages[itemName]?.add?.success)
      //   if (props['set' + capitalizeFirstLetter(itemName)])
      //     props['set' + capitalizeFirstLetter(itemName)](data)
      //   // setEvent(data)
      // },
      // (error) => {
      //   snackbar.error(messages[itemName]?.add?.error)
      //   setErrorCard(itemName + item._id)
      //   const data = {
      //     errorPlace: 'CREATE ERROR',
      //     itemName,
      //     item,
      //     error,
      //   }
      //   addErrorModal(data)
      //   console.log(data)
      // }
    )
  }

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-50 flex h-screen items-center justify-center overflow-hidden bg-black bg-opacity-80 transition-opacity duration-500',
        showModalZakaz ? 'w-full opacity-100' : 'w-0 opacity-0'
      )}
      onClick={() => setShowModalZakaz(false)}
    >
      <div
        className="relative mx-[18px] flex flex-col items-center rounded-[30px] bg-white px-[18px] py-[60px] md:px-[65px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="group absolute right-[16px] top-[16px] flex h-[28px] w-[28px] cursor-pointer items-center justify-center md:right-[29px] md:top-[24px]"
          onClick={() => setShowModalZakaz(false)}
        >
          <svg
            className="duration-300 group-hover:scale-125"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
          >
            <g>
              <path
                d="M0 19.6L6.84 9.84L0.16 0H4.2L9.12 7.76L13.64 0H17.84L11.4 9.52L18.08 19.6H14.04L9.08 11.88L4.04 19.6H0Z"
                fill="black"
              />
            </g>
          </svg>
        </div>
        <Title />
        <DivText
          className="mt-[25px] text-center leading-[135%]"
          textColorClass="text-[#8888AB]"
          textFontClass="font-medium"
        >
          Заполните форму и мы свяжемся с вами{' '}
          <span className="font-bold">
            в течение
            <br />
            15 минут
          </span>
          , чтобы подробно обсудить шоу.
        </DivText>
        <DivText
          className="mt-[15px] text-center leading-[135%]"
          size="small"
          textColorClass="text-[#8888AB]"
        >
          При необходимости договоримся о личной встрече.
        </DivText>
        <div
          className="mt-[20px] flex w-full items-center rounded-[7px] md:mt-[35px]"
          style={{
            background:
              'linear-gradient(341deg, rgba(96, 139, 246, 0.16) 0%, rgba(96, 139, 246, 0.00) 100%), linear-gradient(0deg, #EDEDED 0%, #EDEDED 100%), #FFF',
            boxShadow: '0px 25px 36px 0px rgba(255, 255, 255, 0.20) inset',
          }}
        >
          {/* <input
            className="w-full text-[#0e0e1ce6] py-[30px] px-[35px] text-[19px] font-medium bg-transparent outline-none"
            style={{
              lineHeight: '125%',
              letterSpacing: '0.76px',
            }}
            placeholder="+7 ("
          /> */}
          <MaskedInput
            className="w-full bg-transparent px-[15px] py-[20px] text-[18px] text-[#0e0e1ce6] outline-none md:px-[35px] md:py-[25px] md:text-[20px] tablet:text-[22px]"
            // showMask={value == '7'}
            // showMask
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            // keepCharPositions
            mask={[
              '+',
              '7',
              ' ',
              '(',
              /[1-9]/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            // value={
            //   value
            //     ? value.toString().substr(0, 1) == '7'
            //       ? value.toString().substring(1)
            //       : value.toString()
            //     : ''
            // }
          />
        </div>
        <div className="w-full">
          <Button
            noShadow
            fullWidth
            className="mt-[15px] max-w-full"
            onClick={onSubmit}
            disabled={!phone || phone.length < 11}
            addIcon={false}
          >
            Перезвоните мне
          </Button>
        </div>
        <DivText
          className="mt-[25px] text-center leading-[135%]"
          size="small"
          textColorClass="text-[#8888AB]"
          textFontClass="font-normal"
        >
          Нажимая на кнопку, вы соглашаетесь на{' '}
          <span className="underline">обработку персональных данных</span>
        </DivText>
      </div>
    </div>
  )
}

export default ModalZakaz
