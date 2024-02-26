import { atom } from 'recoil'

const yandexAimAtom = atom({
  key: 'yandexAimAtom', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
})

export default yandexAimAtom
