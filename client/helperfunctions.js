export const getHighestRankedUsers = users => {
  const bestRank = users.map(user => Number(user.rank)).sort((a, b) => a - b)[0]
  return users.filter(user => user.rank === bestRank)
}
