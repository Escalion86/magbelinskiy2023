import Events from '@models/Events'
import SiteSettings from '@models/SiteSettings'
import Clients from '@models/Clients'
import Requests from '@models/Requests'
import Transactions from '@models/Transactions'
import Services from '@models/Services'
import dbConnect from './dbConnect'

const fetchProps = async (user) => {
  const serverDateTime = new Date()
  try {
    const db = await dbConnect()

    const clients = await Clients.find({}).select('-password').lean()
    const events = await Events.find({}).lean()
    const siteSettings = await SiteSettings.find({}).lean()
    const requests = await Requests.find({}).lean()
    const transactions = await Transactions.find({}).lean()
    const services = await Services.find({}).lean()

    const fetchResult = {
      clients: JSON.parse(JSON.stringify(clients)),
      events: JSON.parse(JSON.stringify(events)),
      siteSettings: JSON.parse(
        JSON.stringify(siteSettings?.length > 0 ? siteSettings[0] : {})
      ),
      requests: JSON.parse(JSON.stringify(requests)),
      transactions: JSON.parse(JSON.stringify(transactions)),
      services: JSON.parse(JSON.stringify(services)),
      serverSettings: JSON.parse(
        JSON.stringify({
          dateTime: serverDateTime,
        })
      ),
    }

    return fetchResult
  } catch (error) {
    return {
      clients: [],
      events: [],
      siteSettings: {},
      requests: [],
      transactions: [],
      services: [],
      serverSettings: JSON.parse(
        JSON.stringify({
          dateTime: serverDateTime,
        })
      ),
      error: JSON.parse(JSON.stringify(error)),
    }
  }
}

export default fetchProps
