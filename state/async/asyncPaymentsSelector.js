import { atom } from 'jotai'
import { getData } from '@helpers/CRUD'
import isLoadedAtom from '@state/atoms/isLoadedAtom'
import { setAtomValue } from '@state/storeHelpers'

export const asyncPaymentsSelector = atom(async () => {
  const res = await getData('/api/payments', null, null, null, false)
  setAtomValue(isLoadedAtom('asyncPaymentsAtom'), true)

  return res
})

export default asyncPaymentsSelector
