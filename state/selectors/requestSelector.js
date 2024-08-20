import { DEFAULT_REQUEST } from '@helpers/constants'
import requestsAtom from '@state/atoms/requestsAtom'
import { selectorFamily } from 'recoil'

export const requestSelector = selectorFamily({
  key: 'requestSelector',
  get:
    (id) =>
    ({ get }) => {
      if (!id) return DEFAULT_REQUEST
      return get(requestsAtom).find((item) => item._id === id)
    },
  // set:
  //   (id) =>
  //   ({ set }, event) => {
  //     set(eventsSelector, event)
  //   },
})

export default requestSelector
