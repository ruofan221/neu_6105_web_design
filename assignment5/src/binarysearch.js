/**
 * this is BinarysearchClass.
 */
export class Binarysearch {
/**
 * @todo chop the arr, move the mid to middle of the arr. 
 * @todo using Math.floor to calculate the mid.
 * @des if arr[mid] > target, move the hi to mid down one
 * @des if arr[mid] < target, move the lo to mid up one
 * @des if arr[mid] equals to target, return mid;
 * @see https://www.w3schools.com/jsref/jsref_floor.asp
 * @param {number[]} arr - this is the sorted array.
 * @param {number} target - this is the target number.
 * @return {number} if the target number exits in the array, then return it's index, otherwise return -1.
*/

binarysearch(arr, target){
    let hi = arr.length - 1;
    let lo = 0;
    let mid = 0;
    while(lo <= hi){
        mid = Math.floor((hi + lo) / 2);
        if(arr[mid] > target) hi = mid - 1;
        else if(arr[mid] < target) lo = mid + 1;
        else return mid;
    };
    return -1;
}

}
/** @test {binarysearch} */
console.log("-------Binarysearch test--------");
/**
* @type {Array}
*/
let sortedArray = [0, 1, 2, 13, 54, 78, 89, 90, 100, 105, 204, 304, 1000];
console.log("the array is: " + sortedArray);
/**
* @type {Number}
*/
let targetnum = 90;
/**
* @type {Object}
* @property {function} binarysearch
*/
let bs = new Binarysearch();
console.log("the target number is: " + targetnum);
/**
* @type {Boolean}
*/
let isFounded = bs.binarysearch(sortedArray, targetnum);;
if(isFounded === -1) console.log("target number is not in the array " );
else console.log("the index of the target number is: " + isFounded );