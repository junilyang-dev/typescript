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

interface Position {
  coords: {
      latitude: number;
      longitude: number;
  };
  timestamp: number;
}

interface PositionError {
  code: number;
  message: string;
}

type PositionCallback = (position: Position) => void;
type PositionErrorCallback = (error: PositionError) => void;

interface PositionOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface IGeolocation {
  getCurrentPosition(success: PositionCallback): void;
  getCurrentPosition(success: PositionCallback, error: PositionErrorCallback): void;
  getCurrentPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): void;

  watchPosition(success: PositionCallback): number;
  watchPosition(success: PositionCallback, error: PositionErrorCallback): number;
  watchPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): number;

  clearWatch(id: number): void;
}

// Mock Geolocation class implementing the IGeolocation interface
class Geolocation implements IGeolocation {
  getCurrentPosition(success: PositionCallback): void;
  getCurrentPosition(success: PositionCallback, error: PositionErrorCallback): void;
  getCurrentPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): void;
  getCurrentPosition(success: PositionCallback, error?: PositionErrorCallback, options?: PositionOptions): void {
      // Simulate a successful position retrieval
      setTimeout(() => {
          const position: Position = {
              coords: {
                  latitude: 37.7749,
                  longitude: -122.4194
              },
              timestamp: Date.now()
          };
          success(position);
      }, 1000);
  }

  watchPosition(success: PositionCallback): number;
  watchPosition(success: PositionCallback, error: PositionErrorCallback): number;
  watchPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): number;
  watchPosition(success: PositionCallback, error?: PositionErrorCallback, options?: PositionOptions): number {
      const id = Math.floor(Math.random() * 1000);
      // Simulate position updates
        setTimeout(() => {
          const position: Position = {
              coords: {
                  latitude: 37.7749 + Math.random() * 0.01,
                  longitude: -122.4194 + Math.random() * 0.01
              },
              timestamp: Date.now()
          };
          success(position);
      }, 5000);
      return id;
  }

  clearWatch(id: number): void {
      // Clear interval simulation (not implemented for simplicity)
      console.log(`Watch with id ${id} cleared.`);
  }
}

// Usage example
const geolocation = new Geolocation();

const successCallback: PositionCallback = (position) => {
  console.log('Latitude:', position.coords.latitude);
  console.log('Longitude:', position.coords.longitude);
};

const errorCallback: PositionErrorCallback = (error) => {
  console.error('Error occurred. Error code:', error.code);
  console.error('Error message:', error.message);
};

// Get current position
geolocation.getCurrentPosition(successCallback);

// Get current position with error callback
geolocation.getCurrentPosition(successCallback, errorCallback);

// Get current position with error callback and options
geolocation.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true });

// Watch position
const watchId = geolocation.watchPosition(successCallback);

// Watch position with error callback
const watchIdWithError = geolocation.watchPosition(successCallback, errorCallback);

// Watch position with error callback and options
const watchIdWithOptions = geolocation.watchPosition(successCallback, errorCallback, { enableHighAccuracy: true });

// Clear watch
geolocation.clearWatch(watchId);
geolocation.clearWatch(watchIdWithError);
geolocation.clearWatch(watchIdWithOptions);
