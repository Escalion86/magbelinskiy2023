// UTC keeps the career anniversary independent of the server's timezone.
export const CAREER_START = new Date('2003-10-01T00:00:00.000Z')

export function experienceYears(now = new Date()) {
  const years = now.getUTCFullYear() - CAREER_START.getUTCFullYear()
  const beforeAnniversary =
    now.getUTCMonth() < CAREER_START.getUTCMonth() ||
    (now.getUTCMonth() === CAREER_START.getUTCMonth() &&
      now.getUTCDate() < CAREER_START.getUTCDate())

  return years - (beforeAnniversary ? 1 : 0)
}

export function yearsWord(n) {
  const lastTwo = n % 100
  if (lastTwo >= 11 && lastTwo <= 14) return 'лет'
  const last = n % 10
  if (last === 1) return 'год'
  if (last >= 2 && last <= 4) return 'года'
  return 'лет'
}

export function experienceLabel(now = new Date()) {
  const years = experienceYears(now)
  return `${years} ${yearsWord(years)}`
}
