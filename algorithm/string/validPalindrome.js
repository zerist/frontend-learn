import isPalindrome from "./isPalindrome.js";

function validPalindrome(str) {
    const len = str.length
    let left = 0
    let right = len - 1

    for (; left < right; left++, right--) {
        if (str[left] !== str[right]) {
            return isPalindrome(str.slice(left, right)) || isPalindrome(str.slice(left + 1, right + 1))
        }
    }
    return true
}

console.log(validPalindrome('abcdeba'))