'use client'

import React from 'react'
import Image from 'next/image'
import DivContent from './components/DivContent'
import { useSetRecoilState } from 'recoil'
import showModalZakazAtom from '@/state/showModalZakazAtom'
import Link from 'next/link'
import yandexAimAtom from '@/state/yandexAimAtom'
import { useMetrica } from 'next-yandex-metrica'

const Social = ({ text, href, yandexAim }) => {
  const { reachGoal } = useMetrica()
  return (
    <Link
      className="text-[12px] font-medium leading-[135%] text-white underline duration-300 hover:text-[#FFCA45] md:text-[19px]"
      href={href}
      target="_blank"
      onClick={yandexAim ? () => reachGoal(yandexAim) : undefined}
    >
      {text}
    </Link>
  )
}

const FooterBlock = () => {
  const setShowModalZakaz = useSetRecoilState(showModalZakazAtom)
  const setYandexAim = useSetRecoilState(yandexAimAtom)
  const { reachGoal } = useMetrica()

  return (
    <div
      className="z-10 flex w-full justify-center bg-opacity-70 pb-[15px] pt-[10px] md:pb-[60px] md:pt-[60px]"
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
              <Link
                className="cursor-pointer text-[15px] font-bold leading-[135%] text-white duration-300 hover:text-[#FFCA45] sm:text-[17px] md:text-[21px]"
                href="tel:+79138370020"
                target="_blank"
                onClick={reachGoal('klick_nomber')}
              >
                +7-913-837-00-20
              </Link>
              <button
                className="h-[40px] cursor-pointer rounded-[10px] border border-white border-opacity-20 px-[20px] text-[15px] font-medium text-white duration-300 hover:border-[#FFCA45] hover:text-[#FFCA45] md:h-[46px] md:text-[19px]"
                onClick={() => {
                  setYandexAim('zakaz_zvonok')
                  setShowModalZakaz(true)
                }}
              >
                Заказать звонок
              </button>
            </div>
            <div className="mt-[20px] text-[16px] font-medium leading-[135%] text-[#A8A8CA] md:mt-[30px]">
              Социальные сети:
            </div>
            <div className="mt-[5px] flex flex-wrap gap-x-[20px] gap-y-[10px] md:mt-[10px] md:gap-x-[30px]">
              <Social
                text="Instagram"
                href="https://instagram.com/magbelinskiy"
              />
              <Social
                text="Telegram"
                href="https://t.me/escalion"
                yandexAim="klick_TG"
              />
              <Social
                text="VKontakte"
                href="https://vk.com/escalion"
                yandexAim="klick_VK"
              />
              <Social
                text="Whatsapp"
                href="https://api.whatsapp.com/send?phone=79138370020"
                yandexAim="klick_WA"
              />
            </div>
            <Link
              href="/doc/privacy.doc"
              download
              className="mt-[25px] block w-fit cursor-pointer text-[13px] font-normal leading-[135%] text-white duration-300 hover:text-[#FFCA45] md:hidden"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </DivContent>
    </div>
  )
}

export default FooterBlock
