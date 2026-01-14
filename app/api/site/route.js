import { NextResponse } from 'next/server'
import SiteSettings from '@models/SiteSettings'
import dbConnect from '@server/dbConnect'

const normalizeTowns = (towns = []) =>
  Array.from(
    new Set(
      towns
        .map((town) => (typeof town === 'string' ? town.trim() : ''))
        .filter(Boolean)
    )
  )

export const GET = async () => {
  await dbConnect()
  const siteSettings = await SiteSettings.findOne({}).lean()
  return NextResponse.json(
    { success: true, data: siteSettings ?? {} },
    { status: 200 }
  )
}

export const POST = async (req) => {
  const body = await req.json().catch(() => ({}))
  await dbConnect()

  const update = {}
  if (body.eventsTags !== undefined) update.eventsTags = body.eventsTags ?? []
  if (body.towns !== undefined) update.towns = normalizeTowns(body.towns)
  if (body.defaultTown !== undefined)
    update.defaultTown = body.defaultTown ?? ''
  if (body.custom !== undefined) update.custom = body.custom ?? {}
  if (body.fabMenu !== undefined) update.fabMenu = body.fabMenu ?? []
  if (body.supervisor !== undefined) update.supervisor = body.supervisor ?? {}
  if (body.dateStartProject !== undefined)
    update.dateStartProject = body.dateStartProject ?? null
  if (body.headerInfo !== undefined) update.headerInfo = body.headerInfo ?? {}
  if (body.codeSendService !== undefined)
    update.codeSendService = body.codeSendService ?? 'telefonip'
  if (body.email !== undefined) update.email = body.email ?? null
  if (body.phone !== undefined) update.phone = body.phone ?? null
  if (body.whatsapp !== undefined) update.whatsapp = body.whatsapp ?? null
  if (body.viber !== undefined) update.viber = body.viber ?? null
  if (body.telegram !== undefined) update.telegram = body.telegram ?? null
  if (body.instagram !== undefined) update.instagram = body.instagram ?? null
  if (body.vk !== undefined) update.vk = body.vk ?? null
  if (body.timeZone !== undefined)
    update.timeZone = body.timeZone ?? 'Asia/Krasnoyarsk'

  const siteSettings = await SiteSettings.findOneAndUpdate(
    {},
    { $set: update },
    { new: true, upsert: true }
  )

  return NextResponse.json(
    { success: true, data: siteSettings },
    { status: 200 }
  )
}
