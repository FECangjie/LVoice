export default function (url, op = {}) {
  let config = {
    method: 'get',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
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
      if (data.code == '13') {                             // 未登陆
        window.location.href = data.data
        return false
      }
      if (data.status == 401) {                            // 未授权
        alert(data.message || '401')
        setTimeout("window.location.href = '/logingout'",3000)
      }
      if (data.code == 1 || data.code == 0) {
        if (data.data) {
          return data.data
        } else {
          alert(data.msg || '服务器连接错误，请刷新重试。')
          return false
        }
      } else {
        if (data.msg) {
          alert(data.msg || '服务器连接错误，请刷新重试。')
        }
        return false
      }
    })
}

