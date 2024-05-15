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
