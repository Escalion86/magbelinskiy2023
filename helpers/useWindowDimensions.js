import { useState, useEffect } from 'react'
import setRecoilFunc from './setRecoilFunc'
import windowDimensionsAtom from '@state/atoms/windowDimensionsAtom'

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  } else {
    return { width: 0, height: 0 }
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    // getWindowDimensions()
    { width: undefined, height: undefined }
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(
        // getWindowDimensions()
        {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      )
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export const useWindowDimensionsTailwind = () => {
  const { width } = useWindowDimensions()
  if (!width) return null
  if (width > 1920) return '3xl' // desktop
  if (width > 1536) return '2xl'
  if (width > 1280) return 'xl'
  if (width > 1024) return 'lg' // tablet
  if (width > 768) return 'md'
  if (width > 640) return 'sm'
  if (width > 420) return 'phoneH'
  return 'xs'
}

export const useWindowDimensionsRecoil = () => {
  useEffect(() => {
    function handleResize() {
      setRecoilFunc(windowDimensionsAtom)({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
}
