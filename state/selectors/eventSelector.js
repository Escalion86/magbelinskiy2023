import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { DEFAULT_EVENT } from '@helpers/constants'
import eventsAtom from '@state/atoms/eventsAtom'

export const eventSelector = atomFamily((id) =>
  atom((get) => {
    if (!id) return DEFAULT_EVENT
    return get(eventsAtom).find((item) => item._id === id)
  })
)

export default eventSelector
