import React from 'react'
import QuizCard from './QuizCard'
import cn from 'classnames'

const QuizPageQuestionAges = ({ show, onChoose }) => {
  return (
    <div
      className={cn(
        'grid w-full grid-cols-2 justify-items-center gap-x-[20px] gap-y-[10px] transition-all duration-500 md:gap-x-[30px] md:gap-y-[20px] 2xl:grid-cols-2 2xl:gap-x-[40px] 2xl:gap-y-[30px]',
        show
          ? 'relative z-10 opacity-100'
          : 'absolute top-0 right-0 left-0 opacity-0'
      )}
    >
      <QuizCard
        title="Взрослые (18-99 лет)"
        imageName="adults.webp"
        onChoose={() => onChoose('adults')}
        big
      />
      <QuizCard
        title="Подростки (10-18 лет)"
        imageName="teenagers.webp"
        onChoose={() => onChoose('teenagers')}
        big
      />
      <QuizCard
        title="Дети (5-12 лет)"
        imageName="kids2.webp"
        onChoose={() => onChoose('kids')}
        big
      />
      <QuizCard
        title="Смешанная аудитория"
        imageName="different.webp"
        onChoose={() => onChoose('other')}
        big
      />
    </div>
  )
}

export default QuizPageQuestionAges
