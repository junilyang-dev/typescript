/* LocalStorage API */
interface SStorage<T> {
  [key:string]: T;
}

class LocalStorage<T> {
  private storage: SStorage<T> = {}
  set(key:string, value:T){
    this.storage[key] = value;
  }
  remove(key:string){
    delete this.storage[key]
  }
  get(key:string):T{
    return this.storage[key]
  }
  clear(){
    this.storage = {}
  }

}

const stringsStorage = new LocalStorage<string>()
console.log(stringsStorage.get('name'))//undefined
console.log(stringsStorage.set('name', 'John'))//undefined
console.log(stringsStorage.get('name'))//John

const booleansStorage = new LocalStorage<boolean>();
console.log(booleansStorage.get('isLoggedIn'))//undefined
console.log(booleansStorage.set('isLoggedIn', true))//undefined
console.log(booleansStorage.get('isLoggedIn'))//true

