/**
 * Method call via ws
 * @function wsCall
 * @param {Object} ws - WS instance
 * @param {string} id - Invocation id
 * @param {string} method - Method to invoke
 * @param {Array} param - Method params
 * @returns Promise
 */
'use strict'

const {CallTypes} = require('./constants')

/** @lends wsCall */
function wsCall (ws, id, method, params) {
  const isRes = (data) => data.type === CallTypes.RES && String(data.id) === id
  return new Promise((resolve, reject) => {
    function onMessage (message) {
      const data = JSON.parse(message)
      if (isRes(data)) {
        ws.removeListener('message', onMessage)
        const {error, result} = data
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    }

    ws.send(JSON.stringify({
      type: CallTypes.REQ,
      method,
      params,
      id
    }), (err) => {
      if (err) {
        reject(`[shiba:ws] Failed to call with web socket error: "${err.message}"`)
      }
    })
    ws.addListener('message', onMessage)
  })
}

module.exports = wsCall