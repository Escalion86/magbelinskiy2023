import { atom } from 'recoil'

const showModalZakazAtom = atom({
  key: 'showModalZakazAtom', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export default showModalZakazAtom
