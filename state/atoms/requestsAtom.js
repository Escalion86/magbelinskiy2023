import { atom } from 'recoil'

const requestsAtom = atom({
  key: 'requests',
  default: [],
})

export default requestsAtom
