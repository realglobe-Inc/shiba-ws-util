/**
 * @function wsProxy
 */
'use strict'

const {CallTypes} = require('./constants')

/** @lends wsProxy */
function wsProxy (ws, target) {
  ws.on('message', async function onMessage (message) {
    const data = JSON.parse(message)
    if (data.type === CallTypes.REQ) {
      const {method, params, id} = data
      const {result, error} = await target[method](...params)
        .then((result) => ({result}))
        .catch((error) => ({error: String(error)}))
      ws.send(JSON.stringify({
        type: CallTypes.RES,
        id,
        result,
        error
      }), (err) => {
        if (err) {
          console.error(`[shiba:ws] Failed to response for call request "${id}" with web socket error: ${err.message}`)
        }
      })
    }
  })
}

module.exports = wsProxy
