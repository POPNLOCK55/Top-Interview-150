//day 1 of my algo challenges from leetcode.


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
        // as long as i or j are less than the value of n, the loop will continue. If n is 0, the loop never runs.
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
