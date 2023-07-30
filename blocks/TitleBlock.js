import React from 'react'
import Content from './titleComponents/Content'
import Header from './titleComponents/Header'
import Background from './titleComponents/Background'
import MagicanImage from './titleComponents/MagicanImage'

const TitleBlock = () => {
  return (
    <div className="relative min-w-[375px] h-[660px] sm:h-[680px] md:h-[900px] flex flex-col items-center w-full tablet:h-screen tablet:min-h-[950px]">
      <Background />
      <Header />
      <Content />
    </div>
  )
}

export default TitleBlock
