import { NextResponse } from 'next/server'
import Events from '@models/Events'
import dbConnect from '@server/dbConnect'

export const POST = async () => {
  await dbConnect()

  const filter = {
    importedFromCalendar: true,
    calendarImportChecked: { $ne: true },
  }

  const result = await Events.deleteMany(filter)

  return NextResponse.json(
    {
      success: true,
      data: { deleted: result?.deletedCount ?? 0 },
    },
    { status: 200 }
  )
}
