import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { getData } from '@helpers/CRUD'
import isLoadedAtom from '@state/atoms/isLoadedAtom'
// import loggedUserActiveAtom from '@state/atoms/loggedUserActiveAtom'
import { setAtomValue } from '@state/storeHelpers'
import asyncPaymentsAtom from './asyncPaymentsAtom'

export const asyncPaymentsOfUserIdSelector = atomFamily((userId) =>
  atom(async (get) => {
    if (!userId) return []

    if (get(isLoadedAtom('asyncPaymentsAtom'))) {
      const allPayments = await get(asyncPaymentsAtom)
      setAtomValue(isLoadedAtom('asyncPaymentsOfUserIdAtom' + userId), true)
      return allPayments.filter((payment) => payment.userId === userId)
    }

    const res = await getData('/api/payments', { userId }, null, null, false)
    setAtomValue(isLoadedAtom('asyncPaymentsOfUserIdAtom' + userId), true)

    return res
  })
)

export default asyncPaymentsOfUserIdSelector
