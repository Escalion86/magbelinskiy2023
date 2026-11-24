'use client'

import Link from 'next/link'
import PropTypes from 'prop-types'
import DivContent from './components/DivContent'

const formats = [
  { slug: 'korporativ', title: 'Корпоратив' },
  { slug: 'svadba', title: 'Свадьба' },
  { slug: 'yubiley', title: 'Юбилей' },
  { slug: 'detskiy-prazdnik', title: 'Детский праздник' },
]

export default function OtherFormatsBlock({ current = 'home' }) {
  return (
    <section aria-labelledby="other-formats-title" className="relative w-full bg-[#0E0E1C] py-[70px] md:py-[100px]">
      <DivContent noMargin>
        <h2 id="other-formats-title" className="font-buyan text-[38px] leading-[100%] font-bold text-white md:text-[64px]">
          Другие форматы шоу
        </h2>
        <div className="mt-[35px] grid gap-[14px] sm:grid-cols-2 xl:grid-cols-4">
          {formats.filter(({ slug }) => slug !== current).map(({ slug, title }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="flex items-center justify-between gap-[12px] rounded-[14px] border border-white/10 bg-[#1A1A32] p-[24px] text-[20px] font-semibold text-[#D7D7EA] transition-colors hover:border-[#FFCA45] hover:text-[#FFCA45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCA45]"
            >
              <span>{title}</span>
              <span aria-hidden="true" className="text-[#FFCA45]">
                →
              </span>
            </Link>
          ))}
        </div>
      </DivContent>
    </section>
  )
}

OtherFormatsBlock.propTypes = { current: PropTypes.string }
