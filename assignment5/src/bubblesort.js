/**
 * this is BinarysearchClass.
 */
export class Bubblesort {
/**
* @param {number[]} arr - this is the array which is going to be sorted.
* @return {number[]} return sorted array.
*/
bubblesort(arr){
    let N = arr.length - 1;
    for(let i = 0; i <= N; i++){
        for(let j = 0; j <= N - i; j++){
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            };
        };
    };
    return arr;
}
}
/** @test {bubblesort}*/
/**
 * @see https://blog.csdn.net/qq_39634880/article/details/80357513
 */
    /**
     * @type {Array}
     */
    let array = [];
    for(let i = 0; i < 15; i++){
        let num = parseInt(Math.random()*100)+1;
        array.push(num);
    }
    console.log();
    console.log("-------Bubblesort test--------");
    console.log("the random array is: " + array);
    /**
     * @type {Object}
     * @property {function} bubblesort
     */
    let bbs = new Bubblesort();
    /**
     * @type {Array}
     */
    let sortedArray = bbs.bubblesort(array);
    console.log();
    console.log("after sorted: " + sortedArray);