import formatAddress from '@helpers/formatAddress'
import Events from '@models/Events'
import Histories from '@models/Histories'
import dbConnect from './dbConnect'
import DOMPurify from 'isomorphic-dompurify'
// import { DEFAULT_ROLES } from '@helpers/constants'
// import Roles from '@models/Roles'
import mongoose from 'mongoose'
import compareObjectsWithDif from '@helpers/compareObjectsWithDif'
import { NextResponse } from 'next/server'

function isJson(str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

// const test_callback = {
//   update_id: 173172137,
//   callback_query: {
//     id: '1121425242543370968',
//     from: {
//       id: 261102161,
//       is_bot: false,
//       first_name: 'Алексей',
//       last_name: 'Белинский Иллюзионист',
//       username: 'Escalion',
//       language_code: 'ru',
//       is_premium: true,
//     },
//     message: {
//       message_id: 91,
//       from: '[Object]',
//       chat: ' [Object]',
//       date: 1683689196,
//       text: 'Неизвестная команда',
//       reply_markup: '[Object]',
//     },
//     chat_instance: '3955131192076482535',
//     data: '/createTeam',
//   },
// }
// const rtest = {
//   body: {
//     update_id: 173172081,
//     message: {
//       message_id: 14,
//       from: {
//         id: 261102161,
//         is_bot: false,
//         first_name: 'Алексей',
//         last_name: 'Белинский Иллюзионист',
//         username: 'Escalion',
//         language_code: 'ru',
//         is_premium: true,
//       },
//       chat: {
//         id: 261102161,
//         first_name: 'Алексей',
//         last_name: 'Белинский Иллюзионист',
//         username: 'Escalion',
//         type: 'private',
//       },
//       date: 1683645745,
//       text: '/new_team',
//       entities: [{ offset: 0, length: 12, type: 'bot_command' }],
//     },
//   },
// }

const linkAReformer = (link) => {
  const textLink = link.substring(link.indexOf('>') + 1, link.lastIndexOf('<'))
  const text = link.substring(link.indexOf(`href="`) + 6).split('"')[0]
  return text === textLink || textLink === 'about:blank' || !textLink
    ? text
    : `${textLink} (${text})`
}

const { google } = require('googleapis')
const SCOPES = ['https://www.googleapis.com/auth/calendar']
const {
  GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PROJECT_NUMBER,
  GOOGLE_CALENDAR_ID,
} = process.env

const connectToGoogleCalendar = () => {
  if (
    !GOOGLE_CLIENT_EMAIL ||
    !GOOGLE_PRIVATE_KEY ||
    !SCOPES ||
    !GOOGLE_PROJECT_NUMBER
  )
    return undefined

  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  )

  const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient,
  })

  return calendar
}

const addBlankEventToCalendar = async () => {
  const calendar = connectToGoogleCalendar()
  if (!calendar) return undefined

  const calendarEvent = {
    summary: '[blank]',
    description: '',
    start: {
      dateTime: new Date(),
      timeZone: 'Asia/Krasnoyarsk',
    },
    end: {
      dateTime: new Date(),
      timeZone: 'Asia/Krasnoyarsk',
    },
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: './google_calendar_token.json',
    scopes: SCOPES,
  })

  const authProcess = await auth.getClient()

  const calendarEventData = await new Promise((resolve, reject) => {
    calendar.events.insert(
      {
        auth: authProcess,
        calendarId: GOOGLE_CALENDAR_ID,
        resource: calendarEvent,
      },
      (error, result) => {
        if (error) {
          console.log({ error })
          reject(error)
          // res.send(JSON.stringify({ error: error }))
        } else {
          if (result) {
            console.log(result)
            resolve(result)
            // res.send(JSON.stringify({ events: result.data.items }))
          } else {
            console.log({ message: 'Что-то пошло не так' })
            reject('Что-то пошло не так')
            // res.send(JSON.stringify({ message: 'No upcoming events found.' }))
          }
        }
      }
    )
  })

  return calendarEventData?.data?.id
}

const deleteEventFromCalendar = async (googleCalendarId) => {
  if (!googleCalendarId) return

  const calendar = connectToGoogleCalendar()
  if (!calendar) return undefined

  const auth = new google.auth.GoogleAuth({
    keyFile: './google_calendar_token.json',
    scopes: SCOPES,
  })

  const authProcess = await auth.getClient()

  const calendarEventData = await new Promise((resolve, reject) => {
    calendar.events.delete(
      {
        auth: authProcess,
        calendarId: GOOGLE_CALENDAR_ID,
        eventId: googleCalendarId,
      },
      (error, result) => {
        if (error) {
          console.log({ error })
          reject(error)
          // res.send(JSON.stringify({ error: error }))
        } else {
          if (result) {
            console.log(result)
            resolve(result)
            // res.send(JSON.stringify({ events: result.data.items }))
          } else {
            console.log({ message: 'Что-то пошло не так' })
            reject('Что-то пошло не так')
            // res.send(JSON.stringify({ message: 'No upcoming events found.' }))
          }
        }
      }
    )
  })

  return calendarEventData
}

const updateEventInCalendar = async (event, req) => {
  const calendar = connectToGoogleCalendar()
  if (!calendar) return undefined

  // calendar.events.list(
  //   {
  //     calendarId: GOOGLE_CALENDAR_ID,
  //     timeMin: new Date().toISOString(),
  //     maxResults: 10,
  //     singleEvents: true,
  //     orderBy: 'startTime',
  //   },
  //   (error, result) => {
  //     if (error) {
  //       console.log({ error })
  //       // res.send(JSON.stringify({ error: error }))
  //     } else {
  //       if (result.data.items.length) {
  //         console.log({ events: result.data.items })
  //         // res.send(JSON.stringify({ events: result.data.items }))
  //       } else {
  //         console.log({ message: 'No upcoming events found.' })
  //         // res.send(JSON.stringify({ message: 'No upcoming events found.' }))
  //       }
  //     }
  //   }
  // )
  var preparedText = event.description
  const aTags = event.description.match(/<a[^>]*>([^<]+)<\/a>/g)
  // const linksReformated = []
  if (aTags?.length > 0) {
    for (let i = 0; i < aTags.length; i++)
      preparedText = preparedText.replaceAll(aTags[i], linkAReformer(aTags[i]))
  }

  const calendarEvent = {
    summary: `${event.showOnSite ? '' : '[СКРЫТО] '}${
      event.status === 'canceled' ? '[ОТМЕНЕНО] ' : ''
    }${event.title}`,
    description:
      DOMPurify.sanitize(
        preparedText
          .replaceAll('<p><br></p>', '\n')
          .replaceAll('</blockquote>', '\n</blockquote>')
          // .replaceAll('<ul>', '\n<ul>')
          // .replaceAll('<ol>', '\n<ol>')
          .replaceAll('<li>', '\u{2764} <li>')
          .replaceAll('</li>', '\n</li>')
          .replaceAll('</p>', '\n</p>')
          .replaceAll('<br>', '\n')
          .replaceAll('&nbsp;', ' ')
          .trim('\n'),
        {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: [],
        }
      ) +
      `\n\nСсылка на мероприятие:\n${
        process.env.DOMAIN + '/event/' + event._id
      }`,
    start: {
      dateTime: event.dateStart,
      timeZone: 'Asia/Krasnoyarsk',
    },
    end: {
      dateTime: event.dateEnd,
      timeZone: 'Asia/Krasnoyarsk',
    },
    location: formatAddress(event.address),
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
    // visibility: event.showOnSite ? 'default' : 'private',
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: './google_calendar_token.json',
    scopes: SCOPES,
  })

  const authProcess = await auth.getClient()

  if (!event.googleCalendarId) {
    console.log('Создаем новое событие в календаре')
    const createdCalendarEvent = await new Promise((resolve, reject) => {
      calendar.events.insert(
        {
          auth: authProcess,
          calendarId: GOOGLE_CALENDAR_ID,
          resource: calendarEvent,
        },
        (error, result) => {
          if (error) {
            console.log({ error })
            reject(error)
            // res.send(JSON.stringify({ error: error }))
          } else {
            if (result) {
              // console.log(result)
              resolve(result)
              // res.send(JSON.stringify({ events: result.data.items }))
            } else {
              console.log({ message: 'Что-то пошло не так' })
              reject('Что-то пошло не так')
              // res.send(JSON.stringify({ message: 'No upcoming events found.' }))
            }
          }
        }
      )
    })

    await dbConnect()
    const updatedEvent = await Events.findByIdAndUpdate(
      event._id,
      { googleCalendarId: createdCalendarEvent.data.id },
      {
        new: true,
        runValidators: true,
      }
    ).lean()

    return createdCalendarEvent
  }

  console.log('Обновляем событие в календаре')
  const updatedCalendarEvent = await new Promise((resolve, reject) => {
    calendar.events.update(
      {
        auth: authProcess,
        calendarId: GOOGLE_CALENDAR_ID,
        eventId: event.googleCalendarId ?? undefined,
        resource: calendarEvent,
      },
      (error, result) => {
        if (error) {
          console.log({ error })
          reject(error)
          // res.send(JSON.stringify({ error: error }))
        } else {
          if (result) {
            console.log(result)
            resolve(result)
            // res.send(JSON.stringify({ events: result.data.items }))
          } else {
            console.log({ message: 'Что-то пошло не так' })
            reject('Что-то пошло не так')
            // res.send(JSON.stringify({ message: 'No upcoming events found.' }))
          }
        }
      }
    )
  })

  return updatedCalendarEvent
}

export default async function handler(Schema, req, res, params = null) {
  const { query, method } = req
  const body = await req.json()
  // console.log('req :>> ', req)
  // console.log('res.params :>> ', res.params)

  const id = query?.id || res.params?.id

  await dbConnect()

  let data
  console.log('CRUD', { Schema, method, params, id, body, query })

  switch (method) {
    case 'GET':
      try {
        if (id) {
          data = await Schema.findById(id).select({ password: 0 })
          if (!data) {
            return NextResponse.json({ success: false }, { status: 400 })
          }
          return NextResponse.json({ success: true }, { status: 200 })
        } else if (Object.keys(query).length > 0) {
          const preparedQuery = { ...query }
          for (const [key, value] of Object.entries(preparedQuery)) {
            if (isJson(value)) preparedQuery[key] = JSON.parse(value)
          }
          if (preparedQuery['data._id'])
            preparedQuery['data._id'] = new mongoose.Types.ObjectId(
              preparedQuery['data._id']
            )
          data = await Schema.find(preparedQuery).select({ password: 0 })
          if (!data) {
            return NextResponse.json({ success: false }, { status: 400 })
          }
          return NextResponse.json({ success: true }, { status: 200 })
        } else if (params) {
          data = await Schema.find(params).select({ password: 0 })
          if (!data) {
            return NextResponse.json({ success: false }, { status: 400 })
          }
          return NextResponse.json({ success: true, data }, { status: 200 })
        } else {
          data = await Schema.find().select({ password: 0 })
          return NextResponse.json({ success: true, data }, { status: 200 })
        }
      } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error }, { status: 400 })
      }
      break
    case 'POST':
      try {
        if (id) {
          return NextResponse.json(
            { success: false, error: 'No need to set Id' },
            { status: 400 }
          )
        } else {
          const clearedBody = { ...body.data }
          delete clearedBody._id

          // Создаем пустой календарь и получаем его id
          if (Schema === Events) {
            clearedBody.googleCalendarId = await addBlankEventToCalendar()
          }

          data = await Schema.create(clearedBody)
          if (!data) {
            return NextResponse.json({ success: false }, { status: 400 })
          }
          const jsonData = data.toJSON()

          if (Schema === Events) {
            // Вносим данные в календарь так как теперь мы имеем id мероприятия
            const calendarEvent = updateEventInCalendar(jsonData, req)
          }

          await Histories.create({
            schema: Schema.collection.collectionName,
            action: 'add',
            data: jsonData,
            userId: body.userId,
          })

          return NextResponse.json(
            { success: true, data: jsonData },
            { status: 201 }
          )
        }
      } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error }, { status: 400 })
      }
      break
    case 'PUT':
      try {
        if (id) {
          const oldData = await Schema.findById(id).lean()
          if (!oldData) {
            return NextResponse.json({ success: false }, { status: 400 })
          }

          data = await Schema.findByIdAndUpdate(id, body.data, {
            new: true,
            runValidators: true,
          }).lean()

          if (!data) {
            return NextResponse.json({ success: false }, { status: 400 })
          }

          if (Schema === Events) {
            const calendarEvent = updateEventInCalendar(data, req)
          }

          const difference = compareObjectsWithDif(oldData, data)
          difference._id = new mongoose.Types.ObjectId(id)

          await Histories.create({
            schema: Schema.collection.collectionName,
            action: 'update',
            data: difference,
            userId: body.userId,
            difference: true,
          })

          return NextResponse.json({ success: true, data }, { status: 200 })
        } else {
          return NextResponse.json(
            { success: false, error: 'No Id' },
            { status: 400 }
          )
        }
      } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false }, { status: 400 })
      }
      break
    case 'DELETE':
      try {
        if (params) {
          data = await Schema.deleteMany(params)
          if (!data) {
            return NextResponse.json({ success: false }, { status: 400 })
          }
          await Histories.create({
            schema: Schema.collection.collectionName,
            action: 'delete',
            data,
            userId: body.userId,
          })
          return res?.status(200).json({ success: true, data })
        } else if (id) {
          const existingData = await Schema.findById(id)
          if (!existingData) {
            return NextResponse.json({ success: false }, { status: 400 })
          }
          data = await Schema.deleteOne({
            _id: id,
          })
          if (!data) {
            return NextResponse.json({ success: false }, { status: 400 })
          }

          if (Schema === Events) {
            deleteEventFromCalendar(existingData.googleCalendarId)
          }

          await Histories.create({
            schema: Schema.collection.collectionName,
            action: 'delete',
            data,
            userId: body.userId,
          })
          return NextResponse.json({ success: true }, { status: 200 })
        } else if (body?.params) {
          data = await Schema.deleteMany({
            _id: { $in: body.params },
          })
          if (!data) {
            return NextResponse.json({ success: false }, { status: 400 })
          }
          await Histories.create({
            schema: Schema.collection.collectionName,
            action: 'delete',
            data,
            userId: body.userId,
          })
          return NextResponse.json({ success: true }, { status: 200 })
        } else {
          return NextResponse.json({ success: false }, { status: 400 })
        }
      } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error }, { status: 400 })
      }
      break
    default:
      return NextResponse.json({ success: false }, { status: 400 })
      break
  }
}
