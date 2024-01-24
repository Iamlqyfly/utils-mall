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
  let code = str.charCodeAt(index).toString(16).toUpperCase();
  while (code.length < 4) {
    code = `0${code}`;
  }
  return `\\u${code}`;
}

export function firstFunc(str: string) {
  return str;
}

export function sayHello(str: string) {
  return `hello ${str}`;
}

/**
 * 去除两边空格
 *
 * @version 1.1.0
 * @category Public
 * @param s 去除空格的字符串
 * @example
 *
 * ``` typescript
 * trim('  123  ')
 * ```
 */
export const trim = (s: string): string => {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export const trimCamel = (s: string): string => {
  return s;
}