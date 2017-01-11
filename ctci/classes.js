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
      return 'EMPTY_STACK'
    }
    let current = this.top
    let representation = ''
    while (current) {
      representation += `${current.data} // `
      current = current.next
    }    
    return `${representation}BOTTOM`
  }
}

class Queue {
  constructor () {
    this.first = null
    this.last = null
  }

  enqueue(element) {
    var node = new Node(element)
    if (this.first === null) {
      this.first = node
      this.last = node
    } else {
      this.last.next = node
      this.last = node
    }
  }

  dequeue() {
    var element = this.first
    this.first = this.first.next
    if (this.first === null) {
      this.last = null
    }
    return element
  }

  inspect () {
    if (this.first === null) {
      return 'EMPTY_QUEUE'
    }
    let current = this.first
    let representation = ''
    while (current) {
      representation += `${current.data} => `
      current = current.next
    }    
    return `${representation}END`
  }
}

module.exports = {Node, LinkedListNode, Stack, Queue}