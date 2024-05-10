/*
현재까지 배운 것을 토대로, 아래 함수들에 대한 구현과 함께 호출 시그니처(call signatures) 를 작성해주세요
*/
// last(arr): 이 함수는 배열의 마지막 요소를 반환해야 합니다.
function last<T>(arr: T[]): T | undefined {
    if (!Array.isArray(arr) || arr.length === 0) {
        return undefined;
    }
    return arr[arr.length - 1];
}
// prepend(arr, item): 이 함수는 배열의 시작 부분에 item을 넣고 배열을 return해야 합니다.
function prepend<T>(arr: T[], item: T): T[] {
    if (!Array.isArray(arr)) {
        return [item];
    }
    return [item, ...arr];
}
// mix(arr,arr) : 두개의 배열을 매개변수로 받아, 매개변수로 받은 두 배열을 하나의 배열로 섞어서 하나의 배열로 반환합니다.
function mix<T>(arr1: T[], arr2: T[]): T[] {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return [];
    }
    return [...arr1, ...arr2];
}
// count(arr) : 배열을 매개변수로 받아, 매개변수로 받아온 배열의 길이를 반환하면됩니다.
function count<T>(arr: T[]): number {
    if (!Array.isArray(arr)) {
        return 0;
    }
    return arr.length;
}
// findIndex(arr, item) : 첫번째 매개변수로 배열을, 두번째 매개변수로 받아온 item이 첫번째 매개변수 arr배열의 몇번째 index로 존재하는지 체크한후 존재한다면 몇번째 index인지 반환하고 존재하지않는다면 null을 반환합니다.
function findIndex<T>(arr: T[], item: T): number | null {
    if (!Array.isArray(arr)) {
        return null;
    }
    const index = arr.indexOf(item);
    return index !== -1 ? index : null;
}
// slice(arr, startIndex, endIndex): 첫번째 매개변수로 배열 arr을 받고, 두번째 매개변수로 숫자 startIndex, 세번째 매개변수 숫자 endIndex를 받습니다. 첫번째 매개변수 arr을 두번째 매개변수로 받은 startIndex부터 세번째 매개변수로 받은 인덱스까지 자른 결과를 반환하면됩니다. 이때 세번째 매개변수는 필수 매개변수가 아닙니다.
function slice<T>(arr: T[], startIndex: number, endIndex?: number): T[] {
    if (!Array.isArray(arr)) {
        return [];
    }
    return arr.slice(startIndex, endIndex);
}

// 테스트 배열들
const numbersArr = [1, 2, 3, 4, 5];
const stringsArr = ["apple", "banana", "cherry"];
const mixedArr = [1, "apple", true];

// last 함수 테스트
console.log("Last element of numbers:", last(numbersArr)); // 5
console.log("Last element of strings:", last(stringsArr)); // "cherry"
console.log("Last element of mixed:", last(mixedArr)); // true

// prepend 함수 테스트
console.log("Prepend 0 to numbers:", prepend(numbersArr, 0)); // [0, 1, 2, 3, 4, 5]
console.log("Prepend 'orange' to strings:", prepend(stringsArr, "orange")); // ["orange", "apple", "banana", "cherry"]
console.log("Prepend false to mixed:", prepend(mixedArr,false)); // [ false, 1, 'apple', true ]

// mix 함수 테스트
console.log("Mix numbers and strings:", mix(numbersArr, stringsArr)); // [1, 2, 3, 4, 5, "apple", "banana", "cherry"]

// count 함수 테스트
console.log("Count of numbers:", count(numbersArr)); // 5
console.log("Count of strings:", count(stringsArr)); // 3

// findIndex 함수 테스트
console.log("Find index of 'banana' in strings:", findIndex(stringsArr, "banana")); // 1
console.log("Find index of 6 in numbers:", findIndex(numbersArr, 6)); // null
console.log("Find index of false in mixed:", findIndex(mixedArr,false));// null

// slice 함수 테스트
console.log("Slice numbers from 1 to 3:", slice(numbersArr, 1, 3)); // [2, 3]
console.log("Slice strings from 0 to 2:", slice(stringsArr, 0, 2)); // ["apple", "banana"]

// 테스트 데이터
const emptyArray: any[] = [];
const nullArray = null; // 타입스크립트에서는 이렇게 직접 사용할 수 없으므로 주석 처리를 해제하면 오류가 발생합니다.
const undefinedArray = undefined; // 마찬가지로 직접 사용시 오류가 발생합니다.

// 테스트 케이스 실행
console.log("Last element of empty array:", last(emptyArray)); // undefined
console.log("Prepend 'test' to empty array:", prepend(emptyArray, 'test')); // ['test']
console.log("Mix empty array with ['hello']:", mix(emptyArray, ['hello'])); // ['hello']
console.log("Count of empty array:", count(emptyArray)); // 0
console.log("Find index of 'test' in empty array:", findIndex(emptyArray, 'test')); // null
console.log("Slice empty array from 0 to 1:", slice(emptyArray, 0, 1)); // []

// null과 undefined 배열을 함수 인자로 사용하는 것은 타입스크립트에서 타입 오류를 발생시키므로, 주석 처리된 테스트 케이스는 실제 환경에서는 주의하여 사용하세요.
 console.log("Count of null array:", count(nullArray)); // TypeError 0 
 console.log("Count of undefined array:", count(undefinedArray)); // TypeError 0 

// 테스트 케이스 실행
console.log("Last element of null:", last(null as any)); // undefined
console.log("Prepend 'test' to undefined:", prepend(undefined as any, 'test')); // ['test']
console.log("Mix null with ['hello']:", mix(null as any, ['hello'])); // ['hello']
console.log("Count of null:", count(null as any)); // 0
console.log("Find index of 'test' in null:", findIndex(null as any, 'test')); // null
console.log("Slice null from 0 to 1:", slice(null as any, 0, 1)); // []