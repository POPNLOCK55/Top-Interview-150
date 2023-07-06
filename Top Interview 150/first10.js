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





var search = function(nums, target) {
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

search([4,5,6,7,0,1,2], 0 )