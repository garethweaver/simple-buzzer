const socket = io()

const teams = {
  'team-1': { clip: 'voice-bob-ross-canvas-world.mp3', class: 'green' },
  'team-2': { clip: 'voice-slightly-rippled.mp3', class: 'blue' },
}

const buttons = document.querySelectorAll('ul button')

const setDisabled = (elms, isDisabled) => {
  return elms.forEach(elm => elm.disabled = isDisabled)
}

buttons.forEach((button, idx) => {
  button.addEventListener('click', e => {
    socket.emit(e.target.dataset.action, e.target.dataset)
  })
})

const lockButton = document.querySelector('[data-action="lock"]')
const player = document.querySelector('audio')
const logs = document.querySelector('.logs')
const score = document.querySelector('.score')

socket.on('buzz', buzzed => {
  const { log, team } = buzzed
  player.src = `/clips/${teams[team.id].clip}`
  document.body.classList = 'admin'
  document.body.classList.add(teams[team.id].class)
  player.load()
  player.play()
  logs.innerText = JSON.stringify(log)
  logs.scrollTo(0, logs.scrollHeight)
})

socket.on('scores', scores => {
  score.innerText = JSON.stringify(scores)
  player.src = `/clips/bell.mp3`
  player.load()
  player.play()
})

socket.on('lock', () => {
  lockButton.innerText = '🔒 Locked'
})

socket.on('clear', () => {
  lockButton.innerText = 'Lock'
  document.body.classList = 'admin'
})
