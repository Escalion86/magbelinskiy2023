// Shared by visible FAQ/price blocks and their structured data.
const bookingAnswer =
  'Позвоните 8 (913) 837-00-20 или оставьте номер в форме — обсудим детали и закрепим дату.'
const adultPriceAnswer =
  'От 15 000 ₽ — точная цена зависит от даты, длительности и формата.'

export const eventSeo = {
  home: {
    priceLabel: 'от 12 000 ₽',
    faq: [
      { question: 'Сколько стоит шоу?', answer: 'Свадьба, корпоратив и взрослый день рождения — от 15 000 ₽, детский праздник — от 12 000 ₽. Точная стоимость зависит от даты, формата и длительности — её называют до бронирования.' },
      { question: 'Можно ли увидеть шоу перед заказом?', answer: 'Да: видео с выступлений, фотографии и отзывы есть на сайте, а карточку с фокусом можно перевернуть прямо в браузере.' },
      { question: 'Для какого события подходит шоу?', answer: 'Корпоративы, свадьбы, юбилеи, дни рождения и детские праздники — формат подбирается под повод и площадку.' },
      { question: 'Как забронировать дату?', answer: 'Оставьте номер в форме или позвоните: 8 (913) 837-00-20. После обсуждения деталей дата закрепляется за вами.' },
    ],
  },
  svadba: {
    price: '15000',
    priceLabel: 'от 15 000 ₽',
    faq: [
      { question: 'Сколько стоит шоу на свадьбу?', answer: adultPriceAnswer },
      { question: 'Не перетянет ли фокусник внимание на себя?', answer: 'Программа встраивается в сценарий вечера и работает на атмосферу.' },
      { question: 'Как забронировать дату?', answer: bookingAnswer },
    ],
  },
  korporativ: {
    price: '15000',
    priceLabel: 'от 15 000 ₽',
    faq: [
      { question: 'Сколько стоит шоу на корпоратив?', answer: adultPriceAnswer },
      { question: 'Не перетянет ли фокусник внимание на себя?', answer: 'Программа встраивается в сценарий вечера и работает на атмосферу.' },
      { question: 'Как забронировать дату?', answer: bookingAnswer },
    ],
  },
  yubiley: {
    price: '15000',
    priceLabel: 'от 15 000 ₽',
    faq: [
      { question: 'Сколько стоит шоу на юбилей?', answer: adultPriceAnswer },
      { question: 'Можно ли включить поздравление юбиляра?', answer: 'Да, персональный номер с упоминанием юбиляра обсуждается заранее.' },
      { question: 'Как забронировать дату?', answer: bookingAnswer },
    ],
  },
  'detskiy-prazdnik': {
    price: '12000',
    priceLabel: 'от 12 000 ₽',
    faq: [
      { question: 'Сколько стоит шоу на детский праздник?', answer: 'От 12 000 ₽ — точная цена зависит от даты, длительности и формата.' },
      { question: 'Дети участвуют в шоу?', answer: 'Да, интерактив построен так, что дети становятся участниками, а не только зрителями.' },
      { question: 'Как забронировать дату?', answer: bookingAnswer },
    ],
  },
}

export function faqStructuredData(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

export function serviceOffer(price) {
  return {
    '@type': 'Offer',
    priceCurrency: 'RUB',
    price,
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: price,
      priceCurrency: 'RUB',
    },
  }
}
