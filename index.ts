//last(arr): 이 함수는 배열의 마지막 요소를 반환해야 합니다.
function last<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

//prepend(arr, item): 이 함수는 배열의 시작 부분에 item을 넣고 배열을 return해야 합니다.
function prepend<T>(arr: T[], item: T): T[] {
    return [item, ...arr];
}

//mix(arr,arr) : 두개의 배열을 매개변수로 받아, 매개변수로 받은 두 배열을 하나의 배열로 섞어서 하나의 배열로 반환합니다.
function mix<T>(arr1: T[], arr2: T[]): T[] {
    return [...arr1, ...arr2];
}

//count(arr) : 배열을 매개변수로 받아, 매개변수로 받아온 배열의 길이를 반환하면됩니다.
function count<T>(arr: T[]): number {
    return arr.length;
}

//findIndex(arr, item) : 첫번째 매개변수로 배열을, 두번째 매개변수로 받아온 item이 첫번째 매개변수 arr배열의 몇번째 index로 존재하는지 체크한후 존재한다면 몇번째 index인지 반환하고 존재하지않는다면 null을 반환합니다.
function findIndex<T>(arr: T[], item: T): number | null {
    const index = arr.indexOf(item);
    return index !== -1 ? index : null;
}

//slice(arr, startIndex, endIndex): 첫번째 매개변수로 배열 arr을 받고, 두번째 매개변수로 숫자 startIndex, 세번째 매개변수 숫자 endIndex를 받습니다. 첫번째 매개변수 arr을 두번째 매개변수로 받은 startIndex부터 세번째 매개변수로 받은 인덱스까지 자른 결과를 반환하면됩니다. 이때 세번째 매개변수는 필수 매개변수가 아닙니다.
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
