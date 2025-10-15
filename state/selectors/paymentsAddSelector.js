import { atom } from 'jotai'
import asyncPaymentsAtom from '@state/async/asyncPaymentsAtom'

const paymentsAddSelector = atom(
  (get) => get(asyncPaymentsAtom),
  (get, set, items) => {
    if (typeof items !== 'object') return
    const payments = get(asyncPaymentsAtom)
    set(asyncPaymentsAtom, [...payments, ...items])
  }
)

export default paymentsAddSelector
