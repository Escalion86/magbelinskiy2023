// import formatDate from '@helpers/formatDate'
// import { NextResponse } from 'next/server'
import Requests from '@models/Requests'
// import Clients from '@models/Clients'
// import dbConnect from '@server/dbConnect'
// import { AUDIENCE, EVENT_TYPES } from '@helpers/constants'

// import Events from '@models/Events'
import CRUD from '@server/CRUD'

export const GET = async (req, res) => {
  console.log('GET REQUEST')
}

export const POST = async (req, res) => {
  console.log('POST REQUEST')
  return await CRUD(Requests, req, res)
}

export const PUT = async (req, res) => {
  console.log('PUT REQUEST')
  return await CRUD(Requests, req, res)
}
