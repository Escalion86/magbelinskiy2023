'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivContent from './components/DivContent'
import DivText from './components/DivText'
import MaskedInput from 'react-text-mask'
import { useSetRecoilState } from 'recoil'
import showModalZakazAtom from '@/state/showModalZakazAtom'

const Social = ({ text, href }) => (
  <a
    className="text-[12px] font-medium leading-[135%] text-white underline duration-300 hover:text-[#FFCA45] md:text-[19px]"
    href={href}
    target="_blank"
  >
    {text}
  </a>
)

const FooterBlock = () => {
  const setShowModalZakaz = useSetRecoilState(showModalZakazAtom)

  return (
    <div
      className="flex w-full justify-center bg-opacity-70 pb-[15px] pt-[10px] md:pb-[60px] md:pt-[60px]"
      style={{
        background:
          'linear-gradient(343deg, rgba(96, 139, 246, 0.10) 0%, rgba(96, 139, 246, 0.00) 83.72%), #191929',
        backgroundBlendMode: 'color-dodge, normal',
      }}
    >
      <DivContent
        className="flex flex-col justify-between md:flex-row"
        noMargin
      >
        <div className="flex-1">
          <div className="max-w-full md:max-w-[360px] xl:max-w-[460px]">
            <div className="flex flex-1 items-center gap-x-[19px]">
              <Image
                className="min-w-[60px]"
                alt="logo"
                src="/img/logo.png"
                width={60}
                height={60}
              />
              <div className="flex flex-col whitespace-nowrap text-[15px] font-normal leading-[125%] text-white">
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
            <div className="mt-[15px] text-[16px] font-medium leading-[135%] text-[#A8A8CA] md:mt-[20px]">
              Опытный иллюзионист Алексей Белинский, международный лауреат и
              победитель Всероссийских конкурсов превратит обычный праздник в
              современное и престижное событие, которое запомнится на долго.
              <br />
              <br />
              Увлекательное выступление покажет, что фокусы - это не паралоновые
              шарики и веревочки, а действительно нечто невообразимое. Удивите
              гостей, и насладитесь захватывающими трюками. Эмоции гостей
              гарантированы!
            </div>
            <a
              href="/doc/privacy.doc"
              download
              className="mt-[25px] hidden cursor-pointer text-[13px] font-normal leading-[135%] text-white duration-300 hover:text-[#FFCA45] md:mt-[20px] md:block md:text-[16px] xl:mt-[45px]"
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>
        <div className="flex flex-1 justify-start md:justify-center tablet:justify-end">
          <div className="mt-[30px] max-w-full md:mt-0 md:w-[212px] md:max-w-[460px] tablet:w-[460px] xl:w-[460px] xl:max-w-[460px]">
            <div className="font-buyan text-[29px] font-bold leading-[100%] text-white md:text-[64px]">
              Контакты
            </div>
            <div className="mt-[15px] hidden text-[19px] font-medium leading-[135%] text-[#A8A8CA] md:mt-[20px] md:block">
              Красноярск
              <br />
              круглосуточно
            </div>
            <div className="mt-[10px] flex items-center gap-x-[36px] gap-y-[15px] md:mt-[20px] md:flex-col md:items-start">
              <a
                className="cursor-pointer text-[15px] font-bold leading-[135%] text-white duration-300 hover:text-[#FFCA45] md:text-[21px]"
                href="tel:+79138370020"
                target="_blank"
              >
                +7-913-837-00-20
              </a>
              <button
                className="h-[40px] cursor-pointer rounded-[10px] border border-white border-opacity-20 px-[20px] text-[15px] font-medium text-white duration-300 hover:border-[#FFCA45] hover:text-[#FFCA45] md:h-[46px] md:text-[19px]"
                onClick={() => setShowModalZakaz(true)}
              >
                Заказать звонок
              </button>
            </div>
            <div className="mt-[20px] text-[16px] font-medium leading-[135%] text-[#A8A8CA] md:mt-[30px]">
              Социальные сети:
            </div>
            <div className="mt-[5px] flex flex-wrap gap-x-[20px] md:mt-[10px] md:gap-x-[30px]">
              <Social
                text="Instagram"
                href="https://instagram.com/magbelinskiy"
              />
              <Social text="Telegram" href="https://t.me/escalion" />
              <Social text="VKontakte" href="https://vk.com/escalion" />
              <Social
                text="Whatsapp"
                href="https://api.whatsapp.com/send?phone=79138370020"
              />
            </div>
            <a
              href="/doc/privacy.doc"
              download
              className="mt-[25px] cursor-pointer text-[13px] font-normal leading-[135%] text-white duration-300 hover:text-[#FFCA45] md:hidden"
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </DivContent>
    </div>
  )
}

export default FooterBlock