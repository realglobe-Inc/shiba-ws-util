/**
 * Test for CallTypes.
 * Runs with mocha.
 */
'use strict'

const CallTypes = require('../lib/constants/CallTypes')
const {ok, equal} = require('assert')

describe('call-types', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    for (const [name, value] of Object.entries(CallTypes)) {
      ok(name)
      ok(value)
    }
  })
})

/* global describe, before, after, it */
