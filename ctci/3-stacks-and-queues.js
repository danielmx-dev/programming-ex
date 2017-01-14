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

describe('3.2 stack design', () => {
  // How would you design a stack which, in addition to push and pop, 
  // also has a function min which returns the minimum element? 
  // Push, pop and min should all operate in O(1) time.

  const minStack = () => {
    const model = []
    let minElement = Infinity
    const push = element => {
      const entry = [element, minElement]
      minElement = Math.min(minElement, element)
      model.push(entry)
    }

    const pop = () => {
      if (model.length === 0) {
        return null
      }
      const [element, possibleMinElement] = model.pop()
      if (element === minElement && model.length > 0) {
        const [lastElement, lastPossibleMinElement] = model[model.length - 1]
        if (lastElement !== element) {
          minElement = lastPossibleMinElement
        }
        
      } else {
        minElement = Math.min(minElement, possibleMinElement)
      }
      return element
    }

    const min = element => {
      if (model.length === 0) {
        return null
      }
      return minElement
    }

    return {push, pop, min}
  }

  it('returns the min element correctly', () => {
    const s = minStack()
    s.push(3)
    s.push(15)
    s.push(2)
    s.push(2)
    s.push(2)
    s.push(8)

    assert.equal(s.min(), 2)
    assert.equal(s.pop(), 8)
    assert.equal(s.min(), 2)
    assert.equal(s.pop(), 2)
    assert.equal(s.min(), 2)
    assert.equal(s.pop(), 2)
    assert.equal(s.min(), 2)
    assert.equal(s.pop(), 2)
    assert.equal(s.min(), 3)

    s.push(1)
    s.push(12)

    assert.equal(s.min(), 1)
    assert.equal(s.pop(), 12)
    assert.equal(s.min(), 1)
    assert.equal(s.pop(), 1)
    assert.equal(s.min(), 3)
    assert.equal(s.pop(), 15)
    assert.equal(s.min(), 3)
    assert.equal(s.pop(), 3)
    assert.equal(s.min(), null)
    assert.equal(s.pop(), null)
  })
})