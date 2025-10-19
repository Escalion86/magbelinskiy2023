import { atomFamily, atomWithDefault } from 'jotai/utils'
import asyncPaymentsOfUserIdSelector from './asyncPaymentsOfUserIdSelector'

const asyncPaymentsOfUserIdAtom = atomFamily((userId) =>
  atomWithDefault((get) => get(asyncPaymentsOfUserIdSelector(userId)))
)

export default asyncPaymentsOfUserIdAtom
