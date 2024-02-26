import { getRecoil } from 'recoil-nexus'
import getDiffBetweenDates from './getDiffBetweenDates'
import serverSettingsAtom from '@state/atoms/serverSettingsAtom'

const isEventExpired = (event) => {
  const serverDate = new Date(getRecoil(serverSettingsAtom)?.dateTime)
  return getDiffBetweenDates(event?.dateEnd, serverDate) >= 0
}

export default isEventExpired
