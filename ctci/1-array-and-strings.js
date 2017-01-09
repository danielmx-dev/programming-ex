const assert = require('assert')

describe('1.1 all unique', () => {
  // 1.1 Implement an algorithm to determine if a string has all
  // unique characters. What if you can not use additional 
  // data structures?

  const allUnique = str => {
    const charMap = {}

    for (c of str) {
      if (charMap[c] === 1) {
        return false
      }
      charMap[c] = 1
    }
    return true    
  }

  it('returns true if all characters are unique', () => 
    assert(allUnique('abcdef ghi')))

  it('returns false if there is a repeated character', () => 
    assert.equal(allUnique('abcdef ghidjklmn'), false))
})

xdescribe('1.1 all unique (no additional data structure)', () => {
  // 1.1 Implement an algorithm to determine if a string has all
  // unique characters. What if you can not use additional 
  // data structures?

  const allUnique = str => {
    // Implement with no additional data structures
  }

  it('returns true if all characters are unique', () => 
    assert(allUnique('abcdef ghi')))

  it('returns false if there is a repeated character', () => 
    assert.equal(allUnique('abcdef ghidjklmn'), false))
})

describe('1.2 reverse string', () => {
  // Write code to reverse a C-Style String. (C-String means 
  // that “abcd” is represented as  ve characters, 
  // including the null character.)

  const reverse = _str => {
    const str = Array.from(_str)
    const l = str.length
    for (let i = 0; i < l / 2; i++) {
      let temp = str[i]
      str[i] = str[l - i - 1]
      str[l - i - 1] =  temp
    }
    return str.join('')
  }

  it('returns string reversed', () => {
    assert.equal(reverse('abcd'), 'dcba')
    assert.equal(reverse('abcde'), 'edcba')
  })
})

describe('1.3 remove duplicates', () => {
  // Design an algorithm and write code to remove the duplicate 
  // characters in a string without using any additional buffer. 
  // NOTE: One or two additional variables are  ne. An extra copy of the array is not.

  const removeDuplicates = _str => {
    const str = Array.from(_str)
    const l = str.length
    for (let i =  l - 2; i >= 0; i--) {
      for (let j = l - 1; j > i; j--) {
        if (str[j] === str[i]) {
          str[j] = ''
          continue
        }
      }
    }
    return str.join('')
  }

  it('returns string without duplicates', () =>
    assert.equal(removeDuplicates('abcdeabfcgdhef'), 'abcdefgh'))
})

describe('1.4 anagrams', () => {
  // Write a method to decide if two strings are anagrams or not.

  const isAnagramOf = (str1, str2) =>
    Array.from(str1).sort().join('') ===
    Array.from(str2).sort().join('')

  it('checks for anagrams', () =>
    assert.equal(isAnagramOf('ridescout', 'truedisco'), true))

  it('checks for non anagrams', () =>
    assert.equal(isAnagramOf('ridescout', 'truediscos'), false))
})

describe('1.4 anagrams (manual check)', () => {
  // Write a method to decide if two strings are anagrams or not.

  const isAnagramOf = (str1, str2) => {
    const str1Map = {}
    for (c of str1) {
      str1Map[c] = str1Map[c] ? str1Map[c] + 1 : 1
    }

    let l1 = str1.length
    for (c of str2) {
      if (l1 === 0) {
        return false
      }
      if (!str1Map[c]) {
        return false
      }
      str1Map[c]--
      l1--
    }
    return true
  }

  it('checks for anagrams', () =>
    assert.equal(isAnagramOf('ride scout', 'true disco'), true))

  it('checks for non anagrams', () =>
    assert.equal(isAnagramOf('ride scout', 'true discos'), false))
})

describe('1.5 replace spaces', () => {
  // Write a method to replace all spaces in a string with ‘%20’.

  const replaceSpaces = str =>
    Array.from(str).reduce(
      (str, c) => str + (c === ' ' ? '%20' : c)
      , '')

  it('replaces spaces with %20', () =>
    assert.equal(replaceSpaces('hola mundo cruel'), 'hola%20mundo%20cruel'))
})

describe('1.6 matrix rotation', () => {
  // Given an image represented by an NxN matrix, where each pixel 
  // in the image is 4 bytes, write a method to rotate the image by 90 degrees. 
  // Can you do this in place?

  const rotate = matrix => {    
    const n = matrix.length
    const rotated = Array(n)

    for(let i = 0 ; i < n ; i++) {
      rotated[i] = Array(n)
      for(let j = 0; j < n; j++) {
        rotated[i][j] = matrix[j][n - i - 1]
      }
    }
    return rotated
  }    

  it('rotates the given NxN matrix', () => {
    const input = [
      ['top-left', 'top-middle', 'top-right'],
      ['middle-left', 'center', 'middle-right'],
      ['bottom-left', 'bottom-middle', 'bottom-right']
    ]
    const expected = [
      ['top-right', 'middle-right', 'bottom-right'],
      ['top-middle', 'center', 'bottom-middle'],
      ['top-left', 'middle-left', 'bottom-left']
    ]
    assert.deepEqual(rotate(input), expected)
  })
})

xdescribe('1.6 matrix rotation (in place)', () => {
  // Given an image represented by an NxN matrix, where each pixel 
  // in the image is 4 bytes, write a method to rotate the image by 90 degrees. 
  // Can you do this in place?

  const rotate = matrix => {        
    return matrix
  }    

  it('rotates the given NxN matrix', () => {
    const input = [
      ['top-left', 'top-middle', 'top-right'],
      ['middle-left', 'center', 'middle-right'],
      ['bottom-left', 'bottom-middle', 'bottom-right']
    ]
    const expected = [
      ['top-right', 'middle-right', 'bottom-right'],
      ['top-middle', 'center', 'bottom-middle'],
      ['top-left', 'middle-left', 'bottom-left']
    ]
    assert.deepEqual(rotate(input), expected)
  })
})

describe('1.7 set zeroes', () => {
  // Write an algorithm such that if an element in an
  // MxN matrix is 0, its entire row and column is set to 0.

  const setZeroes = matrix => {
    const rows = new Set()
    const columns = new Set()
    const n = matrix.length

    for(let i = 0 ; i < n ; i++) {
      for(let j = 0; j < n; j++) {
        if (matrix[i][j] === 0) {
          rows.add(i)
          columns.add(j)
        }
      }
    }

    for(let i = 0 ; i < n ; i++) {
      for(let j = 0; j < n; j++) {
      if (rows.has(i) || columns.has(j)) {
          matrix[i][j] = 0
        }
      }
    }

    return matrix
  }    

  it('set matrix columns and rows to zero', () => {
    const input = [
      [1, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 0, 1, 0],
      [1, 1, 1, 1]
    ]
    const expected = [
      [0, 0, 0, 0],
      [1, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 1, 0]
    ]
    assert.deepEqual(setZeroes(input), expected)
  })
})

describe('1.8 substring', () => {
  // Assume you have a method isSubstring which checks if one word is 
  // a substring of another. Given two strings, s1 and s2, write code 
  // to check if s2 is a rotation of s1 using only one call to isSubstring 
  // (i.e., “waterbottle” is a rotation of “erbottlewat”).

  const isRotationOf = (str1, str2) =>
    (str1 + str1).includes(str2)

  it('check strings rotation', () =>
    assert.equal(isRotationOf('waterbottle', 'erbottlewat'), true))
})