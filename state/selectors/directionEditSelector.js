import { atom } from 'jotai'
import { DEFAULT_DIRECTION } from '@helpers/constants'
import directionsAtom from '@state/atoms/directionsAtom'

const directionEditSelector = atom(
  () => DEFAULT_DIRECTION,
  (get, set, newItem) => {
    const items = get(directionsAtom)
    if (!newItem?._id) return
    const findedItem = items.find((event) => event._id === newItem._id)
    if (findedItem) {
      const newItemsList = items.map((event) => {
        if (event._id === newItem._id) return newItem
        return event
      })
      set(directionsAtom, newItemsList)
    } else {
      set(directionsAtom, [...items, newItem])
    }
  }
)

export default directionEditSelector
