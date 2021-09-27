/**
 * 封装一些功能函数
 */

const debounce = function(func, delay) {
  let timer;
  return function() {
    let context = this   //  注意this指向问题
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  } 
}

// 数组去重
const unique = function(arr) {
  return Array.from(new Set(arr))
}

export { debounce, unique }