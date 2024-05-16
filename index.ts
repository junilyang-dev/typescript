/**
 * TA's 정답 해설
개요
이번 챌린지는 그간 배웠던 제네릭과 타입의 다양한 선언 방법 그리고 추상화 클래스를 복합적으로 다뤄볼 수 있는 챌린지였습니다. 이번 챌린지를 통해 여러분들은
추상화 클래스와 제네릭을 함께 가공하여 새로운 API를 만들 수 있습니다.
overloading을 이용하여 다양한 타입으로 이루어진 API를 만들 수 있습니다.
해설
LocalStorage API
먼저 로컬 스토리지에 들어갈 아이템들의 타입을 설정해주어야 합니다. 이번에는 interface를 사용해보도록 하겠습니다. interface의 경우 상속이 굉장히 용이한 타입 식별자입니다.
로컬 스토리지 내부에 저장되는 데이터는 key: value쌍의 값으로 저장이 됩니다. 또한, 인풋의 타입이 어떻게 되느냐에 따라 아웃풋의 타입도 유동적으로 변할 수 있도록 제네릭을 함께 설정해주어 Items라는 타입을 만들었습니다.
다음으로 추상화 클래스를 만들어 볼 차례입니다. 추상화를 시킬 땐 abstract라는 키워드를 사용합니다. 앞서 만들었던 Items라는 타입을 protected 키워드를 이용해 오직 하위 클래스에서만 접근 가능하도록 items라는 객체 필드에 타입을 지정해주었습니다. 그리고 나머지 메소드들 또한 전부 abstract로 연결시켜주었으며, 제네릭을 활용하였습니다.
마지막으로 실제 API로 사용될 SuperStorage라는 임의의 이름을 가진 새로운 클래스를 만들고 extends라는 키워드를 이용해 앞서 만든 추상화 클래스를 상속시켜 주었습니다. 모범 답안에서는 모든 메소드에 대해 접근이 가능하도록 public 키워드를 사용해주었습니다.
GeoLocation API
overloading을 활용하는 챌린지였습니다. overloading은 글자 그대로 이름은 동일하되 서로 다른 타입들을 덧붙이는 것이라고 이해하면 쉽습니다.
먼저 GeolocationCoordinates의 타입을 설정해주겠습니다. GeoLocation은 사용자의 로컬 컴퓨터의 위치를 좌표 형식으로 나타내줍니다. 사용법에 있는 메소드로 전달된 파라미터들 중에 각각 optionsObj, errors, option 등은 전부 객체 형태인 것을 유추할 수 있습니다. 그렇기 때문에 각각 GeoOptions, GeoError, GeolocationCoords 그리고 Position이라는 타입을 각각 만들어서 필요한 필드들이 담긴 타입을 만들었습니다.
다음으로 successFn, errorFn의 콜백 함수에 대한 타입을 설정할 차례입니다. 앞서 만든 GeoOptions, GeoError, GeolocationCoords 그리고 Position을 successFn과 errorFn의 파라미터에 적용시킬 타입으로 사용합니다. 그렇게 SuccessFunction과 ErrorFunction이라는 타입을 만들었습니다.
이후, 사용법에 제시된 getCurrentPosition()과 watchPosition() 메소드의 전체 타입을 지정하도록 하겠습니다. 앞서 만든 SuccessFunction 타입과 ErrorFunction을 연결 지을 수 있도록 GetCurrentPosition과 WatchCurrentPosition 타입을 만든 후, return되는 타입을 설정해주고, 이를 하나로 묶은 GeolocationAPI라는 interface를 만들었습니다. 추후에 상속을 해야하니까요.
마지막으로 Geolocator라는 클래스를 만들었습니다. 이것이 실제로 API로 사용될 클래스이며 GeolocationAPI 타입을 연결합니다. getCurrentPosition()과 watchPosition() 메소드에서 전달되는 error와 options는 없을 수도 있기 때문에 ? 연산자를 통해 필수가 아닌 선택적인 요소로 바꾸었습니다.
 */

/* LocalStorage API */
interface SStorage<T> {
  [key:string]: T;
}

class LocalStorage<T> {
  private storage: SStorage<T> = {}
  setItem(key:string, value:T){
    this.storage[key] = value;
  }
  getItem(key:string):T{
    return this.storage[key]
  }
  clearItem(key:string){
    delete this.storage[key]
  }
  clear(){
    this.storage = {}
  }

}

const stringsStorage = new LocalStorage<string>()
console.log(stringsStorage.getItem('name'))//undefined
console.log(stringsStorage.setItem('name', 'John'))//undefined
console.log(stringsStorage.getItem('name'))//John

const booleansStorage = new LocalStorage<boolean>();
console.log(booleansStorage.getItem('isLoggedIn'))//undefined
console.log(booleansStorage.setItem('isLoggedIn', true))//undefined
console.log(booleansStorage.getItem('isLoggedIn'))//true

// Position 인터페이스: 위치 정보에 대한 구조를 정의합니다.
interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

// PositionError 인터페이스: 위치 정보를 가져오는 동안 발생할 수 있는 오류를 정의합니다.
interface PositionError {
  code: number;
  message: string;
}

// 위치 정보를 가져왔을 때 호출될 콜백 타입
type PositionCallback = (position: Position) => void;
// 위치 정보를 가져오는 동안 오류가 발생했을 때 호출될 콜백 타입
type PositionErrorCallback = (error: PositionError) => void;

// 위치 정보를 가져올 때 사용할 수 있는 옵션을 정의하는 인터페이스
interface PositionOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

// Geolocation API의 인터페이스: 메서드 시그니처를 정의합니다.
interface IGeolocation {
  getCurrentPosition(success: PositionCallback): void;
  getCurrentPosition(success: PositionCallback, error: PositionErrorCallback): void;
  getCurrentPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): void;

  watchPosition(success: PositionCallback): number;
  watchPosition(success: PositionCallback, error: PositionErrorCallback): number;
  watchPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): number;

  clearWatch(id: number): void;
}

// Geolocation 클래스: IGeolocation 인터페이스를 구현합니다.
class Geolocation implements IGeolocation {
  // getCurrentPosition 메서드: 성공 콜백만 받는 경우
  getCurrentPosition(success: PositionCallback): void;
  // getCurrentPosition 메서드: 성공 콜백과 오류 콜백을 받는 경우
  getCurrentPosition(success: PositionCallback, error: PositionErrorCallback): void;
  // getCurrentPosition 메서드: 성공 콜백, 오류 콜백, 옵션 객체를 받는 경우
  getCurrentPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): void;
  // getCurrentPosition 메서드 구현
  getCurrentPosition(success: PositionCallback, error?: PositionErrorCallback, options?: PositionOptions): void {
      // 성공적으로 위치를 가져오는 것을 시뮬레이션
      setTimeout(() => {
          const position: Position = {
              coords: {
                  latitude: 37.7749,
                  longitude: -122.4194
              },
              timestamp: Date.now()
          };
          success(position); // 성공 콜백 호출
      }, 1000); // 1초 후에 위치를 반환
  }

  // watchPosition 메서드: 성공 콜백만 받는 경우
  watchPosition(success: PositionCallback): number;
  // watchPosition 메서드: 성공 콜백과 오류 콜백을 받는 경우
  watchPosition(success: PositionCallback, error: PositionErrorCallback): number;
  // watchPosition 메서드: 성공 콜백, 오류 콜백, 옵션 객체를 받는 경우
  watchPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): number;
  // watchPosition 메서드 구현
  watchPosition(success: PositionCallback, error?: PositionErrorCallback, options?: PositionOptions): number {
      const id = Math.floor(Math.random() * 1000); // 무작위 ID 생성
      // 위치 업데이트를 시뮬레이션
      setTimeout(() => {
          const position: Position = {
              coords: {
                  latitude: 37.7749 + Math.random() * 0.01, // 무작위로 약간 변경된 위도
                  longitude: -122.4194 + Math.random() * 0.01 // 무작위로 약간 변경된 경도
              },
              timestamp: Date.now()
          };
          success(position); // 성공 콜백 호출
      }, 5000); // 5초 후에 위치를 반환
      return id; // 생성된 ID 반환
  }

  // clearWatch 메서드: 위치 감시를 중지합니다.
  clearWatch(id: number): void {
      // 실제로는 구현되지 않았지만, ID를 사용하여 감시를 중지하는 것을 시뮬레이션
      console.log(`Watch with id ${id} cleared.`);
  }
}

// 사용 예제
const geolocation = new Geolocation();

// 성공 콜백 함수
const successCallback: PositionCallback = (position) => {
  console.log('Latitude:', position.coords.latitude);
  console.log('Longitude:', position.coords.longitude);
};

// 오류 콜백 함수
const errorCallback: PositionErrorCallback = (error) => {
  console.error('Error occurred. Error code:', error.code);
  console.error('Error message:', error.message);
};

// 현재 위치를 가져옵니다 (성공 콜백만)
geolocation.getCurrentPosition(successCallback);

// 현재 위치를 가져옵니다 (성공 콜백과 오류 콜백)
geolocation.getCurrentPosition(successCallback, errorCallback);

// 현재 위치를 가져옵니다 (성공 콜백, 오류 콜백, 옵션)
geolocation.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true });

// 위치 변화를 감시합니다 (성공 콜백만)
const watchId = geolocation.watchPosition(successCallback);

// 위치 변화를 감시합니다 (성공 콜백과 오류 콜백)
const watchIdWithError = geolocation.watchPosition(successCallback, errorCallback);

// 위치 변화를 감시합니다 (성공 콜백, 오류 콜백, 옵션)
const watchIdWithOptions = geolocation.watchPosition(successCallback, errorCallback, { enableHighAccuracy: true });

// 위치 감시를 중지합니다
geolocation.clearWatch(watchId);
geolocation.clearWatch(watchIdWithError);
geolocation.clearWatch(watchIdWithOptions);
