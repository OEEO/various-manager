const cookie = {}

cookie.set = function (name, value) {
  let Days = 30
  let exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toGMTString()
}

cookie.get = function (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return decodeURI(arr[2])
  } else {
    return null
  }
}

cookie.clear = function (name) {
  this.set(name, '', -1)
}

export default cookie
