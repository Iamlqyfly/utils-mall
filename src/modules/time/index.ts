/**
 * 获取当前时间戳
 * @example
 * ``` typescript
 * timestamp()
 * ```
 */
export const timestamp = () => +Date.now()

/**
 * 等待指定时间
 * @param time 等待时间
 * @example
 * ``` typescript
 * await sleep(1000)
 * ```
 */
export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))
