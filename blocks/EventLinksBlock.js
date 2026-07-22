import Image from 'next/image'
import Link from 'next/link'

import SpanGradientTitle from './components/SpanGradientTitle'

const eventLinks = [
  {
    title: 'Корпоратив',
    description: 'Для команды, клиентов и больших событий',
    href: '/korporativ',
    image: '/img/event-links/corporate.jpg',
    imageAlt: 'Сценический номер с левитацией на корпоративе',
  },
  {
    title: 'Свадьба',
    description: 'Интерактив для пары и гостей',
    href: '/svadba',
    image: '/img/quiz/wedding.webp',
    imageAlt: 'Алексей Белинский показывает фокус молодожёнам',
  },
  {
    title: 'Юбилей',
    description: 'Персональное шоу с участием юбиляра',
    href: '/yubiley',
    image: '/img/quiz/birthday.webp',
    imageAlt: 'Алексей Белинский показывает фокус гостю на юбилее',
  },
  {
    title: 'Детский праздник',
    description: 'Современная магия для детей и родителей',
    href: '/detskiy-prazdnik',
    image: '/img/quiz/kids.webp',
    imageAlt: 'Алексей Белинский и юный участник шоу фокусов',
  },
]

const EventLinksBlock = () => (
  <section
    aria-labelledby="event-links-title"
    className="relative mt-[110px] w-full px-[18px] sm:mt-[140px] md:px-[52px] xl:mt-[180px]"
  >
    <div className="pointer-events-none absolute top-[42%] left-1/2 -z-10 h-[380px] w-[70%] -translate-x-1/2 rounded-full bg-[#7441D8]/20 blur-[150px]" />

    <div className="mx-auto w-full max-w-[1360px]">
      <div className="mx-auto max-w-[760px] text-center">
        <h2
          id="event-links-title"
          className="font-buyan text-[36px] leading-[100%] font-bold text-white uppercase sm:text-[44px] md:text-[54px] xl:text-[68px]"
        >
          Шоу для вашего <SpanGradientTitle>события</SpanGradientTitle>
        </h2>
        <p className="mx-auto mt-5 max-w-[670px] text-[16px] leading-[150%] text-[#A8A8CA] md:text-[20px]">
          Выберите формат — программа будет адаптирована под гостей, площадку и
          сценарий вечера.
        </p>
      </div>

      <div className="mt-[42px] grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-[58px] xl:grid-cols-4">
        {eventLinks.map((event) => (
          <Link
            key={event.href}
            href={event.href}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-[20px] border border-[#6F61C8]/70 bg-[#111124] shadow-[0_22px_70px_rgba(14,10,47,0.45)] transition duration-300 hover:-translate-y-2 hover:border-[#A56BFF] hover:shadow-[0_28px_85px_rgba(100,65,216,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E69FF]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={event.image}
                alt={event.imageAlt}
                fill
                sizes="(max-width: 639px) calc(100vw - 36px), (max-width: 1279px) calc(50vw - 62px), 320px"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111124] via-[#111124]/10 to-transparent" />
            </div>

            <div className="flex min-h-[205px] flex-1 flex-col px-6 pt-1 pb-7 sm:min-h-[225px] xl:px-7">
              <h3 className="font-buyan text-[34px] leading-none font-bold text-white uppercase xl:text-[38px]">
                {event.title}
              </h3>
              <p className="mt-5 text-[16px] leading-[145%] text-[#B5B5CB] xl:text-[17px]">
                {event.description}
              </p>
              <span className="mt-auto flex items-center gap-3 pt-7 text-[16px] text-[#78A0FF] transition-colors group-hover:text-[#B783FF]">
                Смотреть программу
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

export default EventLinksBlock
