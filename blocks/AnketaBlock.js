'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivContent from './components/DivContent'
import DivText from './components/DivText'
import MaskedInput from 'react-text-mask'
import { postData } from '@/helpers/CRUD'

const Title = ({ className }) => (
  <div
    className={cn(
      'text-left font-buyan text-[29px] font-bold leading-[100%] text-white phoneH:text-[32px] sm:text-[36px] md:text-center md:text-[42px] tablet:text-[64px] xl:text-left',
      className
    )}
  >
    <SpanGradientTitle>Заполните анкету</SpanGradientTitle>, чтобы
    <br />
    договориться о шоу
  </div>
)

const Item = ({ num, text }) => (
  <div className="flex items-center gap-x-[15px]">
    <div
      className="flex h-[45px] w-[45px] items-center justify-center rounded-[90px] text-[16px] font-semibold text-white"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.05)',
        background:
          'linear-gradient(343deg, rgba(96, 139, 246, 0.20) 0%, rgba(96, 139, 246, 0.00) 83.72%), linear-gradient(63deg, rgba(11, 11, 21, 0.20) 0%, rgba(26, 26, 50, 0.20) 100%)',
        backgroundBlendMode: 'color-dodge, normal',
        boxShadow: '6px 6px 30px 0px rgba(255, 255, 255, 0.05) inset',
        backdropFilter: 'blur(3px)',
      }}
    >
      {num}
    </div>
    <div className="text-[12px] font-medium leading-[135%] text-white md:text-[21px] xl:max-w-[239px]">
      {text}
    </div>
  </div>
)

const AnketaBlock = () => {
  const [phone, setPhone] = useState()
  const [name, setName] = useState()

  const onSubmit = async () => {
    await postData(
      `/api/request`,
      { phone, name }
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
    <div className="relative mt-[85px] flex w-full flex-col items-center md:mt-[161px] xl:mt-[185px]">
      <DivContent className="flex flex-col items-center gap-y-[20px] xl:flex-row">
        <div className="flex flex-col items-center justify-center xl:items-start">
          <Title />
          <div className="mt-[52px] flex w-full max-w-[490px] flex-col gap-x-[30px] gap-y-[5px] xl:max-w-full xl:flex-row">
            <Item num="01" text="Обсудим программу" />
            <Item num="02" text="Если необходимо, договоримся о встрече" />
          </div>
          <div className="mt-[59px] flex w-full max-w-[490px] flex-col items-center gap-y-[15px] md:items-start">
            <input
              className="h-[60px] w-full rounded-[7px] bg-white px-[20px] text-[13px] font-normal leading-[125%] outline-none md:h-[85px] md:px-[35px] md:text-[19px]"
              style={{
                color: 'rgba(14, 14, 28, 0.90)',
                border: '1px solid rgba(255, 255, 255, 0.30)',
                letterSpacing: '0.76px',
              }}
              placeholder="Введите имя"
              onChange={(e) => setName(e.target.value)}
            />
            {/* <input
            className="rounded-[7px] bg-white px-[35px] py-[30px] text-[19px] font-normal leading-[125%] outline-none"
            style={{
              color: 'rgba(14, 14, 28, 0.90)',
              border: '1px solid rgba(255, 255, 255, 0.30)',
              letterSpacing: '0.76px',
            }}
            placeholder="Номер телефона"
          /> */}
            <MaskedInput
              className="h-[60px] w-full rounded-[7px] bg-white px-[20px] text-[13px] font-normal leading-[125%] outline-none md:h-[85px] md:px-[35px] md:text-[19px]"
              style={{
                color: 'rgba(14, 14, 28, 0.90)',
                border: '1px solid rgba(255, 255, 255, 0.30)',
                letterSpacing: '0.76px',
              }}
              // showMask={value == '7'}
              // showMask
              placeholder="Номер телефона"
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
            <Button
              fullWidth
              onClick={onSubmit}
              disabled={!phone || phone.length < 11}
            >
              Получить звонок
            </Button>
            <div className="mt-[10px] w-[80%] text-center text-[11px] font-normal leading-[145%] text-[#A8A8CA] md:text-left md:text-[16px]">
              Нажимая на кнопку, вы соглашаетесь на{' '}
              <span className="underline">обработку персональных данных</span>
            </div>
          </div>
        </div>
        <div
          className="mt-[30px] aspect-[1584/1021] w-[80%] opacity-100 xl:-mr-[200px] xl:mt-0 xl:w-[700px]"
          style={{
            background: 'url("/img/hands_with_cards.png")',
            mixBlendMode: 'screen',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </DivContent>
    </div>
  )
}

export default AnketaBlock
