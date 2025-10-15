import { atomWithDefault } from 'jotai/utils'
import asyncPaymentsSelector from './asyncPaymentsSelector'

const asyncPaymentsAtom = atomWithDefault((get) => get(asyncPaymentsSelector))

export default asyncPaymentsAtom
