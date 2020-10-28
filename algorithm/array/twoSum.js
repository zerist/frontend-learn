const twoSum = function (nums, target) {
    const diffs = {}
    const len = nums.length

    for (let i=0; i<len; i++) {
        if (diffs[target - nums[i]] !== undefined) {
            return [diffs[target - nums[i]], i]
        }

        diffs[nums[i]] = i
    }
}

let nums = [2,7,9,11]
console.log(twoSum(nums, 16))