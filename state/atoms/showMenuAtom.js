import { atom } from 'recoil'

const showMenuAtom = atom({
  key: 'showMenuAtom', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export default showMenuAtom
