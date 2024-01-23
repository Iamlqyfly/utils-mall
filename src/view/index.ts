
/**
 * 获取字符串指定下标的 unicode
 *
 * @param str - 字符串
 * @param index - unicode 的下标
 * @returns data
 *
 * @example
 * ```ts
 * unicodeAt('ABC', 1) // -> '\\u0042'
 * ```
 *
 * @beta
 */
export function toUnicodeAt(str: string, index: number = 0) {
   let code = str.charCodeAt(index).toString(16).toUpperCase()
   while (code.length < 4) {
     code = `0${code}`
   }
   return `\\u${code}`
 }

 export function firstFunc(str: string) {
  return str;
 }

 export function testFunc(data) {
  return data;
 }