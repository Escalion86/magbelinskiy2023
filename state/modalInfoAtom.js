import { atom } from 'recoil'

const modalInfoAtom = atom({
  key: 'modalInfoAtom', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
})

export default modalInfoAtom
