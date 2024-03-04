import { atom } from 'recoil'

const showModalFocusResultAtom = atom({
  key: 'showModalFocusResultAtom', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export default showModalFocusResultAtom
