//day 1 


/*/Question 88: Merge Sorted Array
You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
Merge nums1 and nums2 into a single array sorted in non-decreasing order.
The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

Something that the question does not illustrate clearly enough, (a common occurrence on leetcode questions) is that the nums1 array will always have a length of m + n. In the case of the first question, that would be
3 + 3 = 6, as m and n both have a value of 3. The second thing that isn't very clear is that we are NOT appending nums2's values onto the end of nums1, we are merging; or in a more frank manner, OVERWRITING the 0 values at the end of nums1 and then sorting them into an ascending order. This means that nums1's length will NEVER CHANGE and it's length must always be the total value of m + n.
/*/
let nums1 = [1, 2, 3, 0, 0, 0]
let nums2 = [2, 5, 6]
let m = 3
let n = 3
var merge = function (nums1, m, nums2, n) {
    for (let i = m, j = 0; j < n; i++, j++) {
        // i is told to begin iteration of nums1 at the index of whatever m's value is.
        // as long as j is less than the value of n, the loop will continue. If n is 0, the loop never runs.
        // j is going to always begin at 0 since we want to iterate through the entirety nums2 ALWAYS
        nums1[i] = nums2[j];
        //Here we're going set nums1 index of i, which is 3 to be the same value as nums2 index of j, which is 2. This will overwrite the 0 values at the end of nums1.
    }
    nums1.sort();
    //at the end, we are sorting nums1 in an ascending order by subtracting our local variable a from b.
    //Note: Originally the solution had this function inside of the sort method:  nums1.sort((a, b) => a - b); I did some experimenting and found that it only reduced compute time 
    // by about 7ms. It works with the above version as well, but the original is slightly faster for a reason I don't understand. 
};

//day 2

/* Question 27: Remove Element
Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.
Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:
Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
Return k.*/
let nums = [3, 2, 2, 3];
let val = 3

var removeElement = function (nums, val) {
    for (let i = 0; i <= nums.length; i++) { //We define a loop to iterate through every index of an array
        if (nums[i] === val) { // If the index matches the value of our val variable, we do something
            nums.splice(i, 1); //In this problem, we use splice to remove the values that match the val variable
            i--; //Here's where I got stuck. When an item is spliced, it moves the values to the right backwards one index, meaning that your next iteration will skip an index. To prevent that, we decrement i by one to make sure we don't skip anything.
        } else if (nums[i] !== val) { //Here I just tell the function that if the index isn't the same, to skip that iteration and check the next index.
            continue;
        }
    }

};
//Final note: this function beats 99.2% of user runtimes on leetcode, with an average runtime of just 44ms and beats 79.1% of user memory usage, with a usage of 41.8mb of memory used.
removeElement(nums, val)

//day 3
// 26. Remove Duplicates From Sorted Array I

// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.
// Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:
// Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
// Return k.

var removeDuplicates = function (nums) {
    for (let i = 0, j = 1; i < nums.length; i++, j++) { //Defined two vars i and j to iterate through arrays at two different positons for comparison
        if (nums[i] === nums[j]) { //simple comparison to check if the two indeces match
            nums.splice(j, 1)//If they do, I use splice to remove j's duplicate value
            j--  //Here was my hang-up with this algo. I made sure to decrement j so that after the splice, it wouldn't skip an index in the array.
            i-- //I failed to notice that without also decrementing i, that the indexes would then match, possibly splicing out a value that was unique, or disrupting the order of comparison, skipping over other duplicates.
        }
        else if (nums[i] !== nums[j]) { //simple logic to tell the loop to continue the next iteration if no match is found.
            continue
        }
    }

};
//Note: my solution here is very memory efficient, beating 97% of solutions on leetcode with a memory usage of just 44mb. However it is very slow, only beating 15% of runtimes with a total runtime of 135ms.


// 80. Remove Duplicates from Sorted Array II

// Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.
// Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.
// Return k after placing the final result in the first k slots of nums.
// Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.


var removeDuplicates2 = function (nums) {
    // Special case...
    if (nums.length <= 2) {
        return nums.length;
    }
    // Initialize an integer k that updates the kth index of the array...
    // only when the current element does not match either of the two previous indexes...
    let k = 2;
    // Traverse elements through loop...
    for (let i = 2; i < nums.length; i++) {
        // If the index does not match the (k-1)th and (k-2)th elements, count that element...
        if (nums[i] !== nums[k - 2] || nums[i] !== nums[k - 1]) {
            nums[k] = nums[i];
            k++;
            // If the index matches the (k-1)th and (k-2)th elements, we skip it...
        }
    }
    return k;       //Return k after placing the final result in the first k slots of nums...
};

//day 4

//169. Majority Element 


var majorityElement = function (nums) {
    let count = {}; //initializing an object to store our dupe values
    for (let i = 0; i < nums.length; i++) {
        if (count[nums[i]]) { //I think we're saying "if this index exists in nums, increase that index by 1"
            count[nums[i]]++
        } else {
            count[nums[i]] = 1 //else we are setting the index to 1
        }
    }
    for (let key in count) {
        if (count[key] > nums.length / 2) //With another for loop, we check if each index is greater than the length of the array divided by two. If it is, we return that key.
            return key
    }
};


//33. Search in Rotated Sorted Array

// There is an integer array nums sorted in ascending order (with distinct values).

// Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

// You must write an algorithm with O(log n) runtime complexity.





var search = function (nums, target) {
    let start = 0, end = nums.length - 1;
    let mid = Math.floor((start + end) / 2);
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        if (target === nums[mid]) {
            return mid;
        }
        if (nums[start] <= nums[mid]) {
            if (nums[start] <= target && nums[mid] >= target) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else {
            if (nums[end] >= target && nums[mid] <= target) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }
    return -1;
}

search([4, 5, 6, 7, 0, 1, 2], 0)


//day 5 

//189. Rotate Array
//Given an integer array (nums), rotate the array to the right by (k) steps, where (k) is non-negative.

var rotate = function (nums, k) {
    for (let i = 0; i < k; i++) { //Here we use a for loop to iterate through our array (k) number of times.
        nums.unshift(nums.pop()); //In each iteration, we use nums.pop() as an argument to give to nums.unshift()
        //This removes the last value in the array and passes it to unshift to be placed at the start of the array.
    }

};
//Note: This is a brute force solution to this algorithm, there are several other ways to approach this that are more efficient, but quite a bit more complex. This exceeded time constraints but does work.


//121. Best Time to Buy and Sell Stock
// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction.If you cannot achieve any profit, return 0.


var maxProfit = function (prices) {
    let buy = 0; //Here we are going to set buy and sell to 0 and 1, representing the indeces we want them to start at.
    let sell = 1;
    let max = 0; //max will be 0, so that it can be updated with the maximum value later.
    while (sell < prices.length) { //Begin a while loop that runs as long as sell's value is less than the total length of our array.
        if (prices[buy] < prices[sell]) { //IF the index value of buy (which starts at index 0) is LESS THAN the index value of sell (which starts at index 1)
            let profit = prices[sell] - prices[buy]; //We create a var called profit which will be the value of sell's current index subtracted by the value of buy's current index
            max = Math.max(max, profit);// Then we update the max variable to run a Math.max method that will override the value of max with whatever value is the highest.
        } else { buy = sell } //In the case the above loop ends without our condition being true, we move buy and sell up one index, and run the loop over again until we find the maximum value of profit.
        sell++
    }
    return max;
};


//day 6
//122. Best Time to Buy and Sell Stock II

//You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

//On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

//Find and return the maximum profit you can achieve.

var maxProfit = function (prices) {
    let profit = 0
    let min = Infinity
    for (let i = 0; i < prices.length; i++) {
        min = Math.min(min, prices[i]) //Here we assign min the minimum value between the current index and Infinity.
        if (prices[i] - min > 0) { //Then we check if that index subtracted from min's new value is greater than 0.
            profit += prices[i] - min;//IF our check is true, then we update profit with whatever the current index subtracted from min is.
            min = prices[i]; //min will then become the value of the current index, and the loop will iterate until we achieve the highest profit.
        }
    }
    return profit;
} //Note: This is a slow-ish solution, but overall is fairly clean and simple. I wonder if replacing min's default of Infinity to Null or 0 would help with runtime. Unsure if Infinity is a complex number to work with or not.

//55. Jump Game
//You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

//Return true if you can reach the last index, or false otherwise.

var arr = [3, 2, 5, 2, 1]

var canJump = function (nums) {
    let lastIndex = nums.length - 1; //We define our var lastIndex as one value shorter than the total length. This is because we start at index 0, which means our firstr index is not counted in the total spaces we need to jump.

    for (let i = nums.length; i >= 0; i--) { //Create a for loop to iterate through the whole array
        console.log(i)
        if (i + nums[i] >= lastIndex) //Here I state that if i's current value, which would be 0, added to the value of nums[i] is greater than or equal to the length of the array;
            console.log(nums.length)
        lastIndex = i; //Then lastIndex will be set to the value of i.
        console.log('nums is:', nums[i])
        console.log('i has a value of:', i)
        console.log('last index is:', lastIndex)
    }

    return lastIndex == 0;
};

canJump(arr)


//day 7
//45. Jump Game II (?)
//You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
//Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:
//0 <= j <= nums[i] and
//i + j < n
//Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].
nums = [2, 3, 1, 1, 4]
var jump = function (nums) {
    let lastIndex = nums.length - 1,
        currentIndex = -1,
        nextIndex = 0,
        jumps = 0;
    for (let i = 0; nextIndex < lastIndex; i++) {
        if (i > currentIndex) {
            jumps++;
            currentIndex = nextIndex;
        }
        nextIndex = Math.max(nextIndex, nums[i] + i);
    }
    console.log(jumps)
    return jumps;
}

jump(nums)


//day 8
//274. H-Index

//Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper, return the researcher's h-index.
//According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of h such that the given researcher has published at least h papers that have each been cited at least h times.
let citations = [3, 0, 6, 1, 5]
var hIndex = function (citations) {
    console.log("Unsorted arrray:", citations)
    citations.sort((a, b) => b - a) //the sort method works in a way I don't totally understand. What's important to note is that using a - b will put the array in ascending order, starting from the lowest value. b-a will put the array in decreasing order, with the highest value first.
    i = 0
    console.log("Sorted array:", citations)
    while (citations[i] > i) {
        i++
    }
    return i
};

hIndex(citations)

//380. Insert Delete GetRandom O(1)
//Implement the RandomizedSet class:

//RandomizedSet() Initializes the RandomizedSet object.
//bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
//bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
//int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
//You must implement the functions of the class such that each function works in average O(1) time complexity.

var RandomizedSet = function() {
    this.set = [];
    this.valueIndexMap = new Map();
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.valueIndexMap.has(val)) {
        return false;
    }
    this.set.push(val);
    this.valueIndexMap.set(val, this.set.length -1);
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.valueIndexMap.has(val)) {
        return false;
    }
    const indexToRemove = this.valueIndexMap.get(val);
    this.valueIndexMap.set(this.set[this.set.length - 1], indexToRemove);
    this.valueIndexMap.delete(val);
    this.set[indexToRemove] = this.set[this.set.length - 1];
    this.set[this.set.length - 1] = val;
    this.set.pop();
    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    return this.set[Math.floor(Math.random()*this.set.length)];
}
/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */


//day 9
//238. Product of Array Except Self
//Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

//The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

//You must write an algorithm that runs in O(n) time and without using the division operation.

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const result = new Array(nums.length).fill(1);

    let prevProduct = 1;
    for(let i = 0; i < nums.length; i++){
        result[i] *= prevProduct;
        prevProduct *= nums[i];
    }
    let nextProduct = 1;
    for( let i = nums.length - 1; i >= 0; i--){
        result[i] *= nextProduct;
        nextProduct *= nums[i];
    }
    return result;
};