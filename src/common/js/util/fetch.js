export default function (url, op = {}) {
  let config = {
    method: 'get',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
  }
  if ((op.method === 'get' || !op.method) && (op.body)) {
    // 当发送请求为get时，将参数拼在url后面
    let key
    url += '?'
    for (key in op.body) {
      let value = encodeURIComponent((op.body[key] || '').toString())
      url += `${key}=${value}&`
    }
    url = url.substr(0, url.length - 1)
    delete (op.body)                                              // 去除多余的option
  } else if (op.method === 'post' || op.method === 'POST') {
    if (op.formData || op.file) {                                 // 如果后端需要formData
      let formData = new window.FormData()
      let key
      for (key in op.body) {
        const value = op.body[key]
        if (value) {
          formData.append(key, (typeof value === 'object' && !op.file) ? JSON.stringify(value) : value)
        }
      }
      op.headers = {}
      op.body = formData
      delete (op.formData)                                        // 去除多余的option
    } else {
      config.headers['Content-Type'] = 'application/json'         // post参数以json的方式传给后端
      op.body = JSON.stringify(op.body)                           // 正常的json传给后端
    }
  }
  return fetch(url, Object.assign({}, config, op))
    .then(res => {
      return res.json()
    })
    .then(data => {
      data.code = data.code || data.code===0 ?data.code : data.error_code
      data.msg = data.msg || data.msg===0 ?data.msg : data.error_msg

      if (data.error_code || data.error_code === 0) {
        if (data.code == '13') {                             // 未登陆
          window.location.href = data.data
          return false
        }
        if (data.status == 401) {                            // 未授权
          alert(data.message)
          setTimeout("window.location.href = '/logingout'",3000)
        }

        if (data.code == 100000 || (data.code == 0 && data.data)|| data.code == 1) {
          return data.data
        } else {
          if (data.msg || data.message) {
            alert(data.msg?data.msg:data.message)
          }
          if (data.data || data.code == 16) {
            return data.data
          } else {
            return false
          }
        }
      } else {
        if (data.code == '13') {                             // 未登陆
          window.location.href = data.data
          return false
        }
        if (data.status == 401) {                            // 未授权
          alert(data.message)
          setTimeout("window.location.href = '/logingout'",3000)
        }
        if (data.code == 100000 || data.code == 0 || data.code == 1) {
          if (data.data || (data.error_code == 0 )) {
            return data.data
          } else {
            alert(data.msg?data.msg:data.message)
            return false
          }
        } else {
          if (data.msg || data.message) {
            alert(data.msg?data.msg:data.message)
          }
          if (data.data || data.code == 16) {
            return data.data
          } else {
            return false
          }
        }
      }
    })
}
