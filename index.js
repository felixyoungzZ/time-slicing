// 接受一个 generator 函数
function timeSlicing(gen) {
  // 生成 generator
  gen = gen();
  // deadline 为 传进 requestIdleCallback 的回调自带的参数
  return function next(idleDeadline) {
    // 剩余的 generator 可迭代部分
    let res = null;
    // generator 的未迭代完，并且这一帧的空闲时间大于 0
    // 也就是说单帧的空闲时间为可以执行多个任务
    do {
      // 迭代一次
      // 可以理解为 执行一个任务
      res = gen.next();
    } while(
      !res.done &&
      idleDeadline.timeRemaining() > 0
    );
    
    // generator 已经迭代完了，所有分割的任务都完成了
    // 退出
    if (res.done) {
      return;
    }
    
    // 将剩余的任务放在下一次 idle 执行
    requestIdleCallback(next);
  }
}