const socket = io()

const teams = {
  'team-1': { clip: 'bell.mp3', class: 'green' },
  'team-2': { clip: 'bell.mp3', class: 'blue' },
}

const buttons = document.querySelectorAll('ul button')

const setDisabled = (elms, isDisabled) => {
  return elms.forEach(elm => elm.disabled = isDisabled)
}

buttons.forEach((button, idx) => {
  button.addEventListener('click', e => {
    const { id } = e.target.dataset
    const data = id ? { id } : {}
    socket.emit(e.target.dataset.action, data)
  })
})

const lockButton = document.querySelector('[data-action="lock"]')
const player = document.querySelector('audio')
const code = document.querySelector('code')

socket.on('buzz', buzzed => {
  const { log, team } = buzzed
  player.src = `/clips/${teams[team.id].clip}`
  document.body.classList = 'admin'
  document.body.classList.add(teams[team.id].class)
  player.load()
  player.play()
  code.innerText = JSON.stringify(log)
  code.scrollTo(0, code.scrollHeight)
})

socket.on('lock', () => {
  lockButton.innerText = '🔒 Locked'
})

socket.on('clear', () => {
  lockButton.innerText = 'Lock'
  document.body.classList = 'admin'
})
