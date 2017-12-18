/**
 * Bind ws alive function
 * @function wsAlive
 */
'use strict'

/** @lends wsAlive */
function wsAlive (ws, options = {}) {
  const {onDead} = options

  function setAlive (isAlive) {
    ws.isAlive = isAlive
  }

  setAlive(true)
  ws.on('pong', () => setAlive(true))

  function invalidate () {
    if (!ws.isAlive) {
      ws.terminate()
      onDead && onDead()
    }
    ws.isAlive = false
    ws.ping('', false, true)
  }

  return invalidate
}

module.exports = wsAlive
