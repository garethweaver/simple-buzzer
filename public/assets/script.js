const socket = io()
const myCanvas = document.createElement('canvas')
document.body.appendChild(myCanvas)

const myConfetti = confetti.create(myCanvas, {
  resize: true,
  useWorker: true
})

const teams = {
  'team-1': { clip: 'bell.mp3', class: 'green' },
  'team-2': { clip: 'bell.mp3', class: 'blue' },
}

const input = document.querySelector('input')
const buttons = document.querySelectorAll('ul button')

input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    document.activeElement.blur()
  }
})

const setDisabled = (elms, isDisabled) => {
  return elms.forEach(elm => elm.disabled = isDisabled)
}

buttons.forEach((button, idx) => {
  button.addEventListener('click', e => {
    e.preventDefault()
    socket.emit(e.target.dataset.action, { id: e.target.dataset.id, name: input.value })
    setDisabled(buttons, true)
  })
})

socket.on('buzz', (buzzed) => {
  const { log, team } = buzzed
  setDisabled(buttons, true)
  document.body.classList = 'teams'
  document.body.classList.add(teams[team.id].class)
  myConfetti({
    particleCount: 150,
    spread: 150,
  })
})

socket.on('lock', () => {
  setDisabled(buttons, true)
})

socket.on('clear', () => {
  setDisabled(buttons, false)
  document.body.classList = 'teams'
})
