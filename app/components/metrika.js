// app/components/metrika.js
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

export const reachGoal = (goal) => {
  console.log('goal :>> ', goal)
  ym(38403125, 'reachGoal', goal)
  return true
}

const Metrika = () => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    ym(38403125, 'hit', window.location.href)
  }, [pathName, searchParams])
  return null
}

export default Metrika
