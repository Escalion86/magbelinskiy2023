import React from 'react'
import Content from './titleComponents/Content'
import Header from './titleComponents/Header'
import Background from './titleComponents/Background'
// h-[660px] sm:h-[680px] md:h-[900px]
const TitleBlock = () => {
  return (
    <div className="titleblock relative min-w-[375px] flex flex-col items-center w-full h-screen min-h-[670px] tablet:min-h-[950px] max-h-[800px] md:max-h-max">
      <Background />
      {/* <Header /> */}
      <Content />
    </div>
  )
}

export default TitleBlock
