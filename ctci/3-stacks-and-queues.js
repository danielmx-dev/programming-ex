const assert = require('assert')
const {Node, Stack, Queue} = require('./classes')



describe('3.1 array 3 stacks', () => {
  // Describe how you could use a single array to implement three stacks.

  const tripleStack = () => {
    const array = []

    const push = (element, stackIndex) => {
      array.unshift([element, stackIndex])
    }

    const pop = stackIndex => {
      const elementIndex = array.findIndex(([_, i]) => i === stackIndex)
      
      if (elementIndex === -1) {
        return null
      }
      const element = array[elementIndex][0]
      array.splice(elementIndex, 1)

      return element
    }

    return {pop, push}
  }

  it('handles the three stacks', () => {
    const stacks = tripleStack()

    stacks.push('0::first', 0)
    stacks.push('1::first', 1)
    stacks.push('0::second', 0)
    stacks.push('1::second', 1)

    assert.equal(stacks.pop(0), '0::second')

    stacks.push('2::first', 2)
    stacks.push('2::second', 2)

    assert.equal(stacks.pop(1), '1::second')
    assert.equal(stacks.pop(1), '1::first')

    stacks.push('1::third', 1)
    stacks.push('2::third', 2)    
    stacks.push('0::third', 0)

    assert.equal(stacks.pop(0), '0::third')
    assert.equal(stacks.pop(0), '0::first')
    assert.equal(stacks.pop(1), '1::third')
    assert.equal(stacks.pop(2), '2::third')
    assert.equal(stacks.pop(2), '2::second')
    assert.equal(stacks.pop(2), '2::first')

    assert.equal(stacks.pop(0), null)
    assert.equal(stacks.pop(1), null)
    assert.equal(stacks.pop(2), null)
  })
})
