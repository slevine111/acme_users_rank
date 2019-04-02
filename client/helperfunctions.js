export const getHighestRankedUsers = users => {
  const bestRank = users.map(user => Number(user.rank)).sort((a, b) => a - b)[0]
  return users.filter(user => user.rank === bestRank)
}

export const makeStringTitleCase = string => {
  return string
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
      }
      return word.toLowerCase()
    })
    .join(' ')
}
