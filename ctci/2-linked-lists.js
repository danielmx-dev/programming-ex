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
  //Write code to remove duplicates from an unsorted linked list. FOLLOW UP
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