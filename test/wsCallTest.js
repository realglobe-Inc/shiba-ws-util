/**
 * Test for wsCall.
 * Runs with mocha.
 */
'use strict'

const WebSocket = require('ws')
const aport = require('aport')
const wsCall = require('../lib/wsCall')
const wsProxy = require('../lib/wsProxy')
const {ok, equal} = require('assert')
const asleep = require('asleep')

describe('ws-call', function () {
  this.timeout(4000)
  let wss
  let port
  before(async () => {
    port = await aport()
    wss = new WebSocket.Server({port})
  })

  after(async () => {
    wss.close()
  })

  it('Do test', async () => {
    const clients = []
    wss.on('connection', async function onConnection (ws) {
      clients.push(ws)
    })

    const ws = new WebSocket(`http://localhost:${port}`)
    await new Promise((resolve, reject) => {
      ws.on('open', async function onOpen () {
        wsProxy(ws, {
          async sayHello () {
            return 'Hello you!'
          }
        })
        ws.on('close', async function onClose () {
        })
      })
      ws.on('error', (e) => reject(new Error(e)))
      resolve()
    })
    await asleep(100)

    const hello = await wsCall(clients[0], '123', 'sayHello', [])
    equal(hello, 'Hello you!')
    return hello
  })
})

/* global describe, before, after, it */
