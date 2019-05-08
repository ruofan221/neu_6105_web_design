/**
 * this is Palindrome.
 */
export class Palindrome {
/**
* @param {string} str - the string that is going to be checked.
* @return {boolean} if the string is palindrome return true, otherwise return false.
*/
isPalindrome(str){
    /**
    * @desc get the string to charArray.
    * @see https://stackoverflow.com/questions/8761627/string-tochararray-equivalent-on-javascript?lq=1
    */
    let charArray = [...str];
    let i = 0;
    let j = charArray.length - 1;
    var isPalindrom = true;
    while(i <= j){
        if(charArray[i] != charArray[j]) isPalindrom = false;
        i++;
        j--;
    }
    return isPalindrom;
};
}

/** @test {isPalindrome}*/
console.log();
/**
* @type {String}
*/
let string1 = "helloworld";
/**
* @type {String}
*/
let string2 = "abcdedcba";
/**
* @type {Object}
* @property {function} isPalindrom
*/
let p = new Palindrome();
/**
* @type {Boolean}
*/
let test1 = p.isPalindrome(string1);
/**
* @type {Boolean}
*/
let test2 = p.isPalindrome(string2);
console.log("-------Palindrome--------");
/**
* @desc test string "helloworld".
*/
if(test1)
console.log(`"`+ string1 + `"` + "is palindrome");
else console.log(`"`+ string1 + `"` + "is not palindrome");

console.log();
/**
* @desc test string "abcdedcba".
*/
if(test2)
console.log(`"`+ string2 + `"` + "is palindrome");
else console.log(`"`+ string2 + `"` + "is not palindrome");
console.log("");