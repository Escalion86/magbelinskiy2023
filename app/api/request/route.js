import { postData } from '@/helpers/CRUD'
import formatDate from '@/helpers/formatDate'
import { NextResponse } from 'next/server'

export const AUDIENCE = [
  { value: 'adults', name: 'Взрослые (18-99 лет)' },
  { value: 'teenagers', name: 'Подростки (10-18 лет)' },
  { value: 'kids', name: 'Дети (5-12 лет)' },
  { value: 'other', name: 'Смешанная аудитория' },
]

export const EVENT_TYPES = [
  { value: 'birthday', name: 'День рождения' },
  { value: 'wedding', name: 'Свадьба' },
  { value: 'corporate', name: 'Корпоратив' },
  { value: 'presentation', name: 'Презентация' },
  { value: 'opening', name: 'Открытие заведения' },
  { value: 'club', name: 'Клуб' },
  { value: 'other', name: 'Другое' },
]

const sendTelegramMassage = async (text, url) =>
  await postData(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    // `https://api.telegram.org/bot5982479442:AAFm5dx1Kk9MQGyZI_oQ6mcKnMRUbv_ZhJ/sendMessage`,
    {
      chat_id: 261102161,
      text,
      parse_mode: 'html',
      // reply_markup:
      //   process.env.NODE_ENV === 'production'
      //     ? JSON.stringify({
      //         inline_keyboard: [
      //           [
      //             {
      //               text: 'Позвонить клиенту',
      //               url: url,
      //             },
      //           ],
      //         ],
      //       })
      //     : undefined,
    },
    (data) => console.log('data', data),
    (data) => console.log('error', data),
    true
  )

export const GET = async (req, res) => {
  console.log('GET REQUEST')
}

export const POST = async (req, res) => {
  console.log('POST REQUEST')
  // const { query, method, body } = await req.json()
  const request = await req.json()
  try {
    const {
      source,
      name,
      audience,
      type,
      customType,
      date,
      spectators,
      town,
      address,
      phone,
      official,
      comment,
    } = request

    // const data = await Requests.create(body)
    // if (!data) {
    //   return res?.status(400).json({ success: false })
    // // }
    const audienceName =
      AUDIENCE.find((item) => item.value === audience)?.name ?? undefined
    const typeName =
      EVENT_TYPES.find((item) => item.value === type)?.name ?? undefined
    // await sendTelegramMassage(
    //   `Заявка на cigam.ru\n\n<b>Аудитория:</b> ${audienceName}\n<b>Тип:</b> ${typeName}${
    //     customType ? ' - ' + customType + ' ' : ''
    //   }\n<b>Дата:</b> ${
    //     !!date ? formatDate(date, false, true) : '-'
    //   }\n<b>Кол-во зрителей:</b> ${
    //     !!spectators ? spectators : '-'
    //   }\n<b>Город:</b> ${!!town ? town : '-'}\n<b>Адрес:</b> ${
    //     !!address ? address : '-'
    //   }\n<b>Телефон:</b> +${phone}\n<b>Комментарий:</b> ${
    //     !!comment ? comment : '-'
    //   }\n<b>Юр. лицо:</b> ${official ? 'Нет' : 'Да'}`,
    //   `tel:+${phone}`,
    //   req
    // )

    const result = await sendTelegramMassage(
      `Заявка с ${process.env.DOMAIN}\n${
        name ? `\n<b>Имя клиента:</b> ${name}` : ''
      }${audienceName ? `\n<b>Аудитория:</b> ${audienceName}` : ''}${
        typeName
          ? `\n<b>Тип:</b> ${typeName}${
              customType ? ' - ' + customType + ' ' : ''
            }`
          : ''
      }${date ? `\n<b>Дата:</b> ${formatDate(date, false, true)}` : ''}${
        spectators ? `\n<b>Кол-во зрителей:</b> ${spectators}` : ''
      }${town ? `\n<b>Город:</b> ${town}` : ''}${
        address ? `\n<b>Адрес:</b> ${address}` : ''
      }${phone ? `\n<b>Телефон:</b> +${phone}` : ''}${
        comment ? `\n<b>Комментарий:</b> ${comment}` : ''
      }${
        official && typeof official === 'boolean'
          ? `\n<b>Юр. лицо:</b> ${official === false ? 'Нет' : 'Да'}`
          : ''
      }`,
      `tel:+${phone}`
    )

    if (!result.ok)
      return NextResponse.json({ success: false, result }, { status: 400 })

    return NextResponse.json({ success: true, result }, { status: 201 })
    // return res?.status(201).json({ success: true, data })

    // return res?.status(201).json({ success: true, data: eventUser })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error }, { status: 400 })
    // return res?.status(400).json({ success: false, error })
  }
}
