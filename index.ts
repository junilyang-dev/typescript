function last<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

function prepend<T>(arr: T[], item: T): T[] {
    return [item, ...arr];
}

function mix<T>(arr1: T[], arr2: T[]): T[] {
    return [...arr1, ...arr2];
}

function count<T>(arr: T[]): number {
    return arr.length;
}

function findIndex<T>(arr: T[], item: T): number | null {
    const index = arr.indexOf(item);
    return index !== -1 ? index : null;
}

function slice<T>(arr: T[], startIndex: number, endIndex?: number): T[] {
    return arr.slice(startIndex, endIndex);
}


// 테스트 배열들
const numbers = [1, 2, 3, 4, 5];
const strings = ["apple", "banana", "cherry"];
const mixed = [1, "apple", true];

// last 함수 테스트
console.log("Last element of numbers:", last(numbers)); // 5
console.log("Last element of strings:", last(strings)); // "cherry"

// prepend 함수 테스트
console.log("Prepend 0 to numbers:", prepend(numbers, 0)); // [0, 1, 2, 3, 4, 5]
console.log("Prepend 'orange' to strings:", prepend(strings, "orange")); // ["orange", "apple", "banana", "cherry"]

// mix 함수 테스트
console.log("Mix numbers and strings:", mix(numbers, strings)); // [1, 2, 3, 4, 5, "apple", "banana", "cherry"]

// count 함수 테스트
console.log("Count of numbers:", count(numbers)); // 5
console.log("Count of strings:", count(strings)); // 3

// findIndex 함수 테스트
console.log("Find index of 'banana' in strings:", findIndex(strings, "banana")); // 1
console.log("Find index of 6 in numbers:", findIndex(numbers, 6)); // null

// slice 함수 테스트
console.log("Slice numbers from 1 to 3:", slice(numbers, 1, 3)); // [2, 3]
console.log("Slice strings from 0 to 2:", slice(strings, 0, 2)); // ["apple", "banana"]
