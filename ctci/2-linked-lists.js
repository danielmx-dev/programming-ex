const assert = require('assert')

class LinkedListNode {
  constructor(data) {
    this.data = data
    this.next = null
  }
  appendToTail(d) {
    const tail = new LinkedListNode(d)
    let iterator = this
    while (iterator.next !== null) {
      iterator = iterator.next
    }
    iterator.next = tail
  }

  inspect() {
    return `N(${ this.data })${ this.next ? `->${this.next.inspect()}` : '' }`
  }

  static from(...elements) {
    const head = new LinkedListNode(elements[0])
    elements.slice(1).forEach(element =>
      head.appendToTail(element))
    return head
  }
}

describe('2.1 remove duplicates', () => {
  // Write code to remove duplicates from an unsorted linked list. FOLLOW UP
  // How would you solve this problem if a temporary bu er is not allowed? 

  const removeDuplicates = head => {
    let newHead = head
    let iterator = head.next
    
    while (iterator.next !== null) {
      let runner = newHead
      let previous = null

      while (runner !== iterator) {
        if (runner.data === iterator.data) {
          if (previous === null) {
            newHead = runner.next
          } else {
            previous.next = runner.next
          }
          break
        }
        previous = runner
        runner = runner.next
      }
      iterator = iterator.next
    }

    return newHead
  }

  it('removes all the duplicates from the linked list', () =>
    assert.deepEqual(
      removeDuplicates(LinkedListNode.from(1, 2, 3, 2, 1, 4, 1, 5)),
      LinkedListNode.from(3, 2, 4, 1, 5)))
})

describe('2.2 last nth', () => {
  // Implement an algorithm to  nd the nth to last element of a singly linked list.

  const lastN = (head, n) => _lastN(head, n)[0]

  const _lastN = (node, n) => {
    if (node === null) {
      return [null, 0]
    }
    const [head, count] = _lastN(node.next, n)
    const counter = 1 + count
    if (counter === n) {
      return [node, counter]
    }    
    return [head, counter]
  }

  it('gets the last n elements from the linked list', () =>
    assert.deepEqual(
      lastN(LinkedListNode.from(1, 2, 3, 4, 5), 3),
      LinkedListNode.from(3, 4, 5)))
  
  it('returns null if the list has less than n elements', () =>
    assert.deepEqual(
      lastN(LinkedListNode.from(1, 2, 3, 4, 5), 6),
      null))
})

describe('2.3 delete node', () => {
  // Implement an algorithm to delete a node in the middle of a single linked list, 
  // given only access to that node.
  // EXAMPLE
  // Input: the node ‘c’ from the linked list a->b->c->d->e
  // Result: nothing is returned, but the new linked list looks like a->b->d->e

  // TODO is there a way to do it without the previous variable?
  const deleteNode = (head, nodeData) => {
    let current = head
    let previous = null
    while (current !== null) {
      if (current.data === nodeData) {
        if (previous === null) {
          return current.next
        }
        previous.next = current.next
      }
      previous = current
      current = current.next
    }
    return head
  }

  it('deletes the given node', () =>
    assert.deepEqual(
      deleteNode(LinkedListNode.from('a', 'b', 'c', 'd', 'e'), 'c'),
      LinkedListNode.from('a', 'b', 'd', 'e')))
  
  it('deletes the given node even if it is the first on the list', () =>
    assert.deepEqual(
      deleteNode(LinkedListNode.from('a', 'b', 'c', 'd', 'e'), 'a'),
      LinkedListNode.from('b', 'c', 'd', 'e')))
  
  it('list remains the same if the node does not exist', () =>
    assert.deepEqual(
      deleteNode(LinkedListNode.from('a', 'b', 'c', 'd', 'e'), 'f'),
      LinkedListNode.from('a', 'b', 'c', 'd', 'e')))
})

describe('2.4 list sum', () => {
  // You have two numbers represented by a linked list, where each node contains 
  // a sin- gle digit. The digits are stored in reverse order, such that the 1’s 
  // digit is at the head of the list. Write a function that adds the two numbers 
  // and returns the sum as a linked list.
  // EXAMPLE
  // Input: (3 -> 1 -> 5) + (5 -> 9 -> 2)
  // Output: 8 -> 0 -> 8

  const sumLists = (list1, list2) => {
    let current1 = list1
    let current2 = list2
    let sumHead = null
    let overflow = 0

    while (current1 !== null || 
           current2 !== null || 
           overflow !== 0) {
      const sum = data(current1) + data(current2) + overflow
      const cutdownSum = sum > 9 ? sum - 10 : sum 
      overflow = sum > 9 ? sum % 9 : 0
      if (sumHead) {
        sumHead.appendToTail(cutdownSum)
      } else {
        sumHead = new LinkedListNode(cutdownSum)
      }
      current1 = next(current1)
      current2 = next(current2)
    }
    return sumHead
  }
  const data = node => node ? node.data : 0
  const next = node => node ? node.next : null

  it('sums the given lists', () =>
    assert.deepEqual(
      sumLists(LinkedListNode.from(3, 1, 5), LinkedListNode.from(5, 9, 2)),
      LinkedListNode.from(8, 0, 8)))
  
  it('sums lists of different size (a < b)', () =>
    assert.deepEqual(
      sumLists(LinkedListNode.from(3, 1), LinkedListNode.from(5, 9, 2)),
      LinkedListNode.from(8, 0, 3)))
  
  it('sums lists of different size (a > b)', () =>
    assert.deepEqual(
      sumLists(LinkedListNode.from(3, 1, 5), LinkedListNode.from(5, 9)),
      LinkedListNode.from(8, 0, 6)))

  it('creates a new node if there is overflow left', () =>
    assert.deepEqual(
      sumLists(LinkedListNode.from(3, 1), LinkedListNode.from(5, 9)),
      LinkedListNode.from(8, 0, 1)))
})