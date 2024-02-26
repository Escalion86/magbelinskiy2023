import { atom } from 'recoil'

const clientsAtom = atom({
  key: 'clients',
  default: [],
})

export default clientsAtom
