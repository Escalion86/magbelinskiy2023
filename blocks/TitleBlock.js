import React from 'react'
import Content from './titleComponents/Content'
import Header from './titleComponents/Header'
import Background from './titleComponents/Background'
// h-[660px] sm:h-[680px] md:h-[900px]
const TitleBlock = () => {
  return (
    <div className="titleblock relative flex h-screen max-h-[800px] min-h-[670px] w-full min-w-[375px] flex-col items-center md:max-h-max tablet:min-h-[950px]">
      <Background />
      {/* <Header /> */}
      <Content />
    </div>
  )
}

export default TitleBlock
