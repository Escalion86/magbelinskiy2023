import { atom } from 'jotai'
import { DEFAULT_PAYMENT } from '@helpers/constants'
import asyncPaymentsAtom from '@state/async/asyncPaymentsAtom'

const paymentEditSelector = atom(
  () => DEFAULT_PAYMENT,
  (get, set, newItem) => {
    const items = get(asyncPaymentsAtom)
    if (!newItem?._id) return
    const findedItem = items.find((event) => event._id === newItem._id)
    if (findedItem) {
      const newItemsList = items.map((event) => {
        if (event._id === newItem._id) return newItem
        return event
      })
      set(asyncPaymentsAtom, newItemsList)
    } else {
      set(asyncPaymentsAtom, [...items, newItem])
    }
  }
)

export default paymentEditSelector
