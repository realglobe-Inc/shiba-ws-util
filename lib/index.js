/**
 * WebSocket utility for shiba(v/w)
 * @module shiba-ws-util
 */
'use strict'

const constants = require('./constants')
const wsCall = require('./wsCall')
const wsAlive = require('./wsAlive')
const wsProxy = require('./wsProxy')

const lib = wsCall.bind(this)

Object.assign(lib, {
  wsCall,
  wsProxy,
  wsAlive,
  constants
})

module.exports = lib
