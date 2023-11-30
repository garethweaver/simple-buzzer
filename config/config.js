const TEAMS = 3

let scores = [...Array(TEAMS).keys()]

scores = scores.reduce((acc, cur) => {
  acc[`team-${cur + 1}`] = 0
  return acc
}, {})

const state = {
  locked: false,
  log: [],
  timeout: null,
  scores,
}

module.exports = {
  teams: TEAMS,
  state,
}
