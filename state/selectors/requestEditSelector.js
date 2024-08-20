import { DEFAULT_REQUEST } from '@helpers/constants'
import requestsAtom from '@state/atoms/requestsAtom'
import { selector } from 'recoil'

const requestEditSelector = selector({
  key: 'requestEditSelector',
  get: () => DEFAULT_REQUEST,
  set: ({ set, get }, newItem) => {
    const items = get(requestsAtom)
    if (!newItem?._id) return
    const findedItem = items.find((event) => event._id === newItem._id)
    // Если мы обновляем существующий атом
    if (findedItem) {
      const newItemsList = items.map((event) => {
        if (event._id === newItem._id) return newItem
        return event
      })
      set(requestsAtom, newItemsList)
    } else {
      // Если такого атома нет и мы добавляем новый, то просто добавляем атом в список
      set(requestsAtom, [...items, newItem])
    }
  },
})

export default requestEditSelector
