/**任务状态 */
export const taskStatus = {
  /**未发布 */
  1: '未发布',
  /**运行中 */
  2: '运行中',
  /**暂停 */
  3: '暂停'
};
/**任务类型 */
export const taskType = {
  1: 'java类',
  2: 'spring bean',
  3: 'Rest 调用',
  4: 'jar类型',
  9: '其他类型'
};
/**执行状态 */
export const executeStatus = {
  /**正常 */
  0: '正常',
  /**异常 */
  1: '异常'
};

/**错误执行策略 */
export const errorStrategy = {
  /**措施周期立即执行 */
  1: '措施周期立即执行',
  /**措施周期执行一次 */
  2: '措施周期执行一次',
  /**下周期执行 */
  3: '下周期执行'
};
