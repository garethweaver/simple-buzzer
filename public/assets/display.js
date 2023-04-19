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

const title = document.querySelector('h1')

socket.on('buzz', (buzzed) => {
  const { log, team } = buzzed
  document.body.classList = 'display'
  document.body.classList.add(teams[team.id].class)

  title.innerText = teams[team.id].name

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
