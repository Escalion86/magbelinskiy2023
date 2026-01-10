import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import colleaguesAtom from '@state/atoms/colleaguesAtom'

const colleagueSelector = atomFamily((id) =>
  atom((get) => {
    if (!id) return null
    return get(colleaguesAtom).find((item) => item._id === id)
  })
)

export default colleagueSelector
