const socket = io()
const myCanvas = document.createElement('canvas')
document.body.appendChild(myCanvas)

const myConfetti = confetti.create(myCanvas, {
  resize: true,
  useWorker: true
})

const teams = {
  'team-1': { class: 'green', name: 'Team 1' },
  'team-2': { class: 'blue', name: 'Team 2' },
}

const h1 = document.querySelector('h1')
const h2 = document.querySelector('h2')

socket.on('buzz', (buzzed) => {
  const { log, team } = buzzed
  document.body.classList = 'display'
  document.body.classList.add(teams[team.id].class)

  h1.innerText = teams[team.id].name
  h2.innerText = team.name

  myConfetti({
    particleCount: 200,
    spread: 200,
  })
  myConfetti({
    particleCount: 400,
    spread: 100,
    origin: { x: 0, y: 0.95 }
  })
  myConfetti({
    particleCount: 400,
    spread: 100,
    origin: { x: 1, y: 0.95 }
  })
  myConfetti({
    particleCount: 150,
    spread: 500,
  })
})

socket.on('clear', () => {
  document.body.classList = 'display'
})

socket.on('scores', scores => {
  for (const [key, value] of Object.entries(scores)) {
    const score = document.querySelector(`.${key} .score`)
    score.innerText = value
  }
})
