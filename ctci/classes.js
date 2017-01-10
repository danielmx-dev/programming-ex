class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }

  inspect() {
    // TODO this will break with circular references
    return `N(${ this.data })${ this.next ? `->${this.next.inspect()}` : '' }`
  }
}

class LinkedListNode extends Node {
  constructor(data) {
    super(data)
  }
  appendToTail(d) {
    const tail = new LinkedListNode(d)
    let iterator = this
    while (iterator.next !== null) {
      iterator = iterator.next
    }
    iterator.next = tail
  }

  static from(...elements) {
    const head = new LinkedListNode(elements[0])
    elements.slice(1).forEach(element =>
      head.appendToTail(element))
    return head
  }
}

class Stack {
  constructor() {
    this.top = null
  }

  pop() {
    if (this.top !== null) {
      const data = this.top.data
      this.top = this.top.next
      return data
    }
    return null
  }  

  push(data) {
    const node = new Node(data)
    node.next = this.top
    this.top = node
  }

  inspect() {
    if (this.top === null) {
      return 'EMPTY_STACK';
    }
    let current = this.top;
    let representation = ''
    while (current) {
      representation += `
        ${current.data}
        ========
      `
      current = current.next
    }    
    return representation + `
      STACK_BOTTOM
    `
  }
}

module.exports = {Node, LinkedListNode, Stack}