import { atom } from 'recoil'

const transactionsAtom = atom({
  key: 'transactions',
  default: [],
})

export default transactionsAtom
