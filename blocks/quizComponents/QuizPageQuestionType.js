'use client'

import React from 'react'
import cn from 'classnames'
import QuizCard from './QuizCard'
import modalInfoAtom from '@state/atoms/modalInfoAtom'
import { useSetRecoilState } from 'recoil'
import QuizInfo from './QuizInfo'

const QuizPageQuestionType = ({ show, onChoose }) => {
  const setModalInfo = useSetRecoilState(modalInfoAtom)

  const infos = {
    birthday: {
      title: 'День рождения',
      text: () => (
        <>
          Увлекательный и профессиональный иллюзионист подарит вам и ваши гостям
          зрелищное шоу. Иллюзии доставят вам незабываемые ощущения и захватят
          за душу.
          <br />
          <br />
          Удивите гостей и создайте праздник, который запомнится на всю жизнь.
          Контактируйте со мной, чтобы узнать больше о том, как я могу оживить
          ваш день рождения через мои фокусы и иллюзии!
        </>
      ),
      buttonName: 'Да, мне подходит!',
      onConfirm: () => onChoose('birthday'),
    },
    wedding: {
      title: 'Свадьба',
      text: () => (
        <>
          Предлагаю добавить яркие моменты и незабываемые эмоции на ваше
          свадебное торжество. Я профессиональный иллюзионист, который создаст
          невероятное зрелище для вас и ваших гостей. Шоу моих фокусов позволит
          сделать вашу свадьбу по-настоящему запоминающейся, оставив яркие
          впечатления.
          <br />
          <br />Я сделаю все возможное, чтобы каждый гость чувствовал себя
          особенным в этот особенный день. Свяжитесь со мной, чтобы узнать
          больше о том, как я могу оживить вашу свадьбу!
        </>
      ),
      buttonName: 'Да, мне подходит!',
      onConfirm: () => onChoose('wedding'),
    },
    corporate: {
      title: 'Корпоратив',
      text: () => (
        <>
          Удивительный и запоминающийся корпоративный ивент не может обойтись
          без профессионального иллюзиониста. Моё элегантное и динамичное шоу
          твёрдо впишется в программу праздника или тимбилдинга. Сотрудники
          вашей компании будут в восторге от моих фокусов, которые придадут
          вечеру дополнительную ноту развлечения и разнообразия.
          <br />
          <br />Я создаю незабываемую атмосферу, которая поможет всем гостям
          по-настоящему расслабиться и насладиться вечером. Ваше мероприятие
          будет запомнено как одно из лучших и незабываемых. Обратитесь ко мне в
          любое время, чтобы узнать больше о том, как я могу внести свою часть в
          ваш корпоративный ивент.
        </>
      ),
      buttonName: 'Да, мне подходит!',
      onConfirm: () => onChoose('corporate'),
    },
    opening: {
      title: 'Открытие заведения',
      text: () => (
        <>
          Первое впечатление - это всегда самое важное. Сделайте запоминающимся
          вечер на открытии вашего нового заведения, наняв профессионального
          иллюзиониста. Благодаря моему уникальному шоу я создам уникальную
          атмосферу в вашем заведении, которая запомнится гостям на долгое
          время.
          <br />
          <br />
          Мои фокусы и трюки удивят и порадуют ваших гостей, а также подарят им
          множество положительных эмоций. Разнообразьте вечер за счёт зрелищного
          и интерактивного иллюзионного шоу. Обратитесь к моим услугам, чтобы
          узнать, как я могу помочь сделать ваше открытие заведения незабываемым
          и успешным.
        </>
      ),
      buttonName: 'Да, мне подходит!',
      onConfirm: () => onChoose('opening'),
    },
    club: {
      title: 'Клуб',
      text: () => (
        <>
          С удовольствием помогу сделать ваше выступление в клубе незабываемым
          для всех присутствующих. Иллюзионное шоу - идеальный вариант для
          добавления разнообразия в программу вечера. Я могу предложить
          уникальные и оригинальные иллюзии, которые будут восхищать и
          заставлять улыбаться ваших зрителей.
          <br />
          <br />В зависимости от длительности выступления и вашего бюджета, я
          готов предложить различные варианты иллюзий, которые удивят и покорят
          сердца вашей аудитории. Опыт и профессионализм гарантируют, что ваше
          выступление станет ярким и неповторимым. Свяжитесь со мной, чтобы
          обсудить детали и организовать незабываемое шоу в вашем клубе.
        </>
      ),
      buttonName: 'Да, мне подходит!',
      onConfirm: () => onChoose('club'),
    },
    presentation: {
      title: 'Презентация',
      text: () => (
        <>
          Презентация - это важная часть любого мероприятия, поэтому я смогу
          предложить оригинальное и интригующее иллюзионное шоу, которое красиво
          дополнит вашу презентацию и заставит аудиторию восхищаться и
          удивляться во время показа. Моя задача - внести энергию и
          дополнительную значимость в ваши корпоративные мероприятия или
          бизнес-презентации, используя мои способности и техники иллюзии.
          <br />
          <br />Я могу внести некоторые мистические элементы и эффекты, которые
          помогут заинтересовать зрителей, сделав вашу презентацию более
          запоминающейся и приятной для всех присутствующих. Свяжитесь со мной,
          чтобы обсудить детали и создать индивидуальное шоу-презентацию,
          которое подойдет именно для вашего мероприятия.
        </>
      ),
      buttonName: 'Да, мне подходит!',
      onConfirm: () => onChoose('presentation'),
    },
    kids: {
      title: 'Детский праздник',
      text: () => (
        <>
          Для детского праздника я могу предложить интерактивно-иллюзионное шоу,
          в котором дети смогут участвовать и взаимодействовать со мной и моими
          магическими предметами. Я могу показать свои детские иллюзии с яркими
          и красочными картинками, животными, цветами и всем, что связано с
          детскими интересами.
          <br />
          <br />Я также могу провести игры и конкурсы, чтобы дети могли
          попробовать себя в роли магов, раскрывая тайны иллюзии. В целом, я
          смогу создать интересное и позитивное атмосферное во время праздника,
          которое дети и их родители будут помнить долгое время. Буду рад
          обсудить наши возможности и детали, свяжитесь со мной для более
          подробной информации.
        </>
      ),
      buttonName: 'Да, мне подходит!',
      onConfirm: () => onChoose('kids'),
    },
    other: {
      title: 'Другое мероприятие',
      text: () => (
        <>
          Как иллюзионист, я могу выступать на различных мероприятиях, таких как
          свадьбы, юбилеи, дни рождения, национальные праздники, фестивали и
          конгрессы, а также на более интимных мероприятиях, таких как домашние
          вечеринки и дни влюбленных.
          <br />
          <br />Я могу разработать концепцию шоу в соответствии с тематикой
          мероприятия, чтобы создать уникальную и незабываемую атмосферу,
          которая запомнится гостям на долгое время. Кроме того, я могу
          настроиться на конкретные потребности и пожелания клиента, чтобы
          предоставить индивидуальный подход к каждому мероприятию.
          <br />
          <br />
          Если у вас есть какие-либо специальные запросы или требования,
          пожалуйста, свяжитесь со мной, и мы найдем оптимальное решение для
          вашего мероприятия.
        </>
      ),
      buttonName: 'Да, мне подходит!',
      onConfirm: () => onChoose('other'),
    },
  }

  return (
    <div
      className={cn(
        'grid w-full grid-cols-2 justify-items-center gap-x-[20px] gap-y-[10px] transition-all duration-500 sm:grid-cols-3 md:grid-cols-2 md:gap-x-[30px] md:gap-y-[20px] tablet:grid-cols-3 2xl:grid-cols-4 2xl:gap-x-[40px] 2xl:gap-y-[30px]',
        show
          ? 'relative z-10 opacity-100'
          : 'absolute left-0 right-0 top-0 opacity-0'
      )}
    >
      {/* <div className="inline-flex flex-wrap justify-evenly gap-x-[20px] gap-y-[10px] md:gap-x-[30px] md:gap-y-[20px] 2xl:gap-x-[40px] 2xl:gap-y-[30px]"> */}
      <QuizCard
        title="День рождения"
        imageName="birthday"
        infoOpen={() => setModalInfo(infos.birthday)}
        onChoose={() => onChoose('birthday')}
      />
      <QuizCard
        title="Свадьба"
        imageName="wedding"
        infoOpen={() => setModalInfo(infos.wedding)}
        onChoose={() => onChoose('wedding')}
      />
      <QuizCard
        title="Корпоратив"
        imageName="corporate"
        infoOpen={() => setModalInfo(infos.corporate)}
        onChoose={() => onChoose('corporate')}
      />
      <QuizCard
        title="Открытие заведения"
        imageName="opening"
        infoOpen={() => setModalInfo(infos.opening)}
        onChoose={() => onChoose('opening')}
      />
      <QuizCard
        title="Клуб"
        imageName="club"
        infoOpen={() => setModalInfo(infos.club)}
        onChoose={() => onChoose('club')}
      />
      <QuizCard
        title="Презентация"
        imageName="presentation"
        infoOpen={() => setModalInfo(infos.presentation)}
        onChoose={() => onChoose('presentation')}
      />
      <QuizCard
        title="Детский праздник"
        imageName="kids"
        infoOpen={() => setModalInfo(infos.kids)}
        onChoose={() => onChoose('kids')}
      />
      <QuizCard
        title="Другое"
        imageName="other"
        infoOpen={() => setModalInfo(infos.other)}
        onChoose={() => onChoose('other')}
      />
      <div className="hidden h-auto w-full flex-col justify-end text-center md:col-span-2 md:flex tablet:col-auto tablet:h-[330px] tablet:w-[260px] tablet:text-left 2xl:hidden">
        <QuizInfo />
      </div>
    </div>
  )
}

export default QuizPageQuestionType
