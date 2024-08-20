import { DEFAULT_REQUEST } from '@helpers/constants'
import requestsAtom from '@state/atoms/requestsAtom'
import { selector } from 'recoil'

const requestDeleteSelector = selector({
  key: 'requestDeleteSelector',
  get: () => DEFAULT_REQUEST,
  set: ({ set, get }, itemId) => {
    const items = get(requestsAtom)
    const newItemsList = items.filter((item) => item._id !== itemId)
    set(requestsAtom, newItemsList)
  },
})

export default requestDeleteSelector
