'use client'

import PropTypes from 'prop-types'
import DivContent from './components/DivContent'

export default function FaqBlock({ items }) {
  return (
    <section aria-labelledby="faq-title" className="relative w-full bg-[#0E0E1C] py-[70px] md:py-[100px]">
      <DivContent noMargin>
        <h2 id="faq-title" className="font-buyan text-[38px] leading-[100%] font-bold text-white md:text-[64px]">
          Частые вопросы
        </h2>
        <div className="mt-[35px] grid gap-[14px]">
          {items.map(({ question, answer }) => (
            <details key={question} className="rounded-[14px] border border-white/10 bg-[#1A1A32] p-[22px] text-[#D7D7EA] md:p-[28px]">
              <summary className="cursor-pointer text-[18px] font-semibold transition-colors hover:text-[#FFCA45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCA45] md:text-[22px]">
                {question}
              </summary>
              <p className="mt-[16px] text-[16px] leading-[150%] md:text-[19px]">{answer}</p>
            </details>
          ))}
        </div>
      </DivContent>
    </section>
  )
}

FaqBlock.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  })).isRequired,
}
