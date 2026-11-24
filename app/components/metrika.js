// app/components/metrika.js
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const reachGoal = (goal, params) => {
  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    window.ym(38403125, 'reachGoal', goal, params)
  }
  return true
}

const Metrika = () => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(38403125, 'hit', window.location.href)
    }
  }, [pathName, searchParams])
  return null
}

export default Metrika
