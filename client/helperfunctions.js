export const getHighestRankedUsers = users => {
  const bestRank = users.map(user => user.rank).sort()[0]
  return users.filter(user => user.rank === bestRank)
}
