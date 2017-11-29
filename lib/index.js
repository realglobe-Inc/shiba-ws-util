/**
 * WebSocket utility for shiba(v/w)
 * @module shiba-ws-util
 */
'use strict'

const constants = require('./constants')
const wsCall = require('./wsCall')
const wsProxy = require('./wsProxy')

const lib = wsCall.bind(this)

Object.assign(lib, {
  wsCall,
  wsProxy,
  constants
})

module.exports = lib
