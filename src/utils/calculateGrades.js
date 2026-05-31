export function calculateGrade(score) {
  if (score >= 70) return 'A'
  if (score >= 60) return 'B'
  if (score >= 50) return 'C'
  if (score >= 45) return 'D'
  if (score >= 40) return 'E'
  return 'F'
}

export function calculateAverage(scores) {
  if (!scores.length) return 0
  return Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)
}
