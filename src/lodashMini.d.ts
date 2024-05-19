declare module "lodashMini" {
  function head(array: any[]): any;
  function hasIn(object: object, key: string): boolean;
  function isBoolean(value: any): boolean;
  function toString(value: any): string;
  function split(value: string, separator: RegExp | string, limit: number): string[];
  function hasPath(object: object, path: string[] | string): boolean;
  function filter(array: any[], predicate: Function): any[];
  function every(array: any[], predicate: Function): boolean;
  function map(array: any[], iteratee: Function): any[];
}