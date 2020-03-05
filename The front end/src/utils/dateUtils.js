/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function formateDate(time) {
  if (!time) return ''
  let date = new Date(time)
  let hours,minutes,seconds
  if(date.getHours()<10){
    hours="0"+date.getHours()
  }else{
    hours=date.getHours()
  }
  if(date.getMinutes()<10){
    minutes="0"+date.getMinutes()
  }else{
    minutes=date.getMinutes()
  }
  if(date.getSeconds()<10){
    seconds="0"+date.getSeconds()
  }else{
    seconds=date.getSeconds()
  }
 
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
    ' ' + hours + ':' + minutes + ':' + seconds
}