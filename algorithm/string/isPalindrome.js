function isPalindromeByReverse(str) {
    return str === str.split('').reverse().join('')
}

function isPalindrome(str) {
    const len = str.length
    for (let i=0; i<len/2; i++) {
        if (str[i] !== str[len - i -1]) {
            return false
        }
    }
    return true
}

// console.log(isPalindrome('abcba'))
// console.log(isPalindrome('cd'))
export default isPalindrome