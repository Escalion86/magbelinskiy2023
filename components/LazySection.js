'use client'

import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const LazySection = ({
  children,
  className = '',
  placeholderHeight = 320,
  rootMargin = '500px 0px',
}) => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { rootMargin }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [isVisible, rootMargin])

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? (
        children
      ) : (
        <div
          className="w-full animate-pulse rounded-3xl bg-zinc-900/40"
          style={{ minHeight: `${placeholderHeight}px` }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

LazySection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  placeholderHeight: PropTypes.number,
  rootMargin: PropTypes.string,
}

export default LazySection
