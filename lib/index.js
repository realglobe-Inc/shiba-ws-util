/**
 * WebSocket utility for shiba(v/w)
 * @module shiba-ws-util
 */
'use strict'

const constants = require('./constants')
const wsCall = require('./wsCall')

const lib = wsCall.bind(this)

Object.assign(lib, {
  wsCall,
  constants
})

module.exports = lib
