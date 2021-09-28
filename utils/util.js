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

// 获取当日日期
const getTodayDate = function() {
  let today = []
  let date = new Date().getDate()
  today.push(date < 10 ? "0" + date : date)
  let month = new Date().getMonth() + 1
  today.push(month < 10 ? "0" + month : month)
  return today
}


export { debounce, unique, getTodayDate }